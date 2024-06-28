use stellar_parser::pdf_parser::*;
use stellar_parser::{Cmd::*, *};
use import::ClientHandler;
use std::process::{Command, Stdio};
use std::{
    fs,
    path::{Path, PathBuf},
};
use crate::crop_pdf;
use crate::CropPdfData;
use stellar_import as import;

use std::sync::{Arc, Mutex};
use std::thread;
use std::thread::JoinHandle;
use std::time::Duration;
use std::sync::mpsc::{self, Sender, Receiver};

use serde_json::json;

#[derive(Debug, Default)]
struct DocProcessor {
    html_page: String,
    global_title: String,
    global_id: String,
    gen_page: bool,
    gen_course: bool,
    current_coords: Option<(f64, f64)>,
    current_id: Option<String>,
    current_page: Option<u16>,
}

#[derive(Debug)]
struct CropDimension {
    top_offset: f64,
    bottom_offset: f64,
    left_margin: Option<f64>,
    right_margin: Option<f64>,
}

pub async fn generate_snippets(
    input: &PathBuf,
    output: &Path,
    client: Option<ClientHandler>,
    top_offset: f64,
    bottom_offset: f64,
    left_margin: Option<f64>,
    right_margin: Option<f64>,
) -> anyhow::Result<()> {
    let out_folder = Path::new(output);
    let snippets_dir = out_folder.join("snippets");
    let pages_dir = out_folder.join("pages");
    let courses_dir = out_folder.join("courses");

    create_if_necessary(out_folder);
    create_if_necessary(&snippets_dir);
    create_if_necessary(&pages_dir);
    create_if_necessary(&courses_dir);

    let commands = pdf_extract(input).unwrap();
    let mut processor = DocProcessor::default();

    // Set default global ID using the file name
    let filename = String::from(input.file_stem().unwrap().to_string_lossy());
    let filename = strip_filename(&filename);
    let file_id = title_to_id(&filename);
    processor.global_id = file_id;

    // Set default global title using the file name
    processor.global_title = filename;

    let dim = CropDimension {
        top_offset,
        bottom_offset,
        left_margin,
        right_margin,
    };

    // Channel to send the crop PDFs jobs
    let (tx, rx) = mpsc::channel();
    let rx = Arc::new(Mutex::new(rx));

    // Spawn worker threads to crop the PDFs
    let mut handles: Vec<JoinHandle<()>> = Vec::new();
    let num_threads = num_cpus::get();
    for _ in 0..num_threads {
        let rx = Arc::clone(&rx);
        let handle = thread::spawn(move || crate::crop_worker(rx));
        handles.push(handle);
    }

    for cmd in commands {
        process_cmd(input, &mut processor, &cmd, &snippets_dir, &client, &dim, tx.clone()).await;
    }

    drop(tx);

    // Wait until all jobs are done
    for handle in handles {
        handle.join().expect("Failed to join worker thread");
    }

    finalize(&mut processor, &pages_dir, &courses_dir);

    Ok(())
}

async fn process_cmd(
    input: &PathBuf,
    processor: &mut DocProcessor,
    cmd: &DocumentCmd,
    snippets_dir: &Path,
    client: &Option<ClientHandler>,
    dim: &CropDimension,
    tx: Sender<CropPdfData>,
) {
    match &cmd.cmd {
        SetGlobalTitle(title) => {
            processor.global_title = title.to_string();
        }
        SetGlobalID(id) => {
            processor.global_id = id.to_string();
        }
        SetGenPage(gen_page) => processor.gen_page = *gen_page,
        SetGenCourse(gen_course) => processor.gen_course = *gen_course,
        StartSnippet(id) => {
            processor.current_coords = Some(cmd.coords);
            processor.current_page = Some(cmd.page);
            processor.current_id = Some(id.to_string());
        }
        EndSnippet => {
            let snippet_id = processor.current_id.clone().unwrap();

            let output = snippets_dir.join(&snippet_id);
            create_if_necessary(&output);
            let output = output.join(format!("{snippet_id}.pdf"));

            // Crop snippet using old "current_coords"
            let page = cmd.page - 1;
            let y1 = processor.current_coords.unwrap().1 + dim.top_offset;
            let y2 = cmd.coords.1 + dim.bottom_offset;

            let data = CropPdfData {
                input: input.to_path_buf(),
                output: output.to_path_buf(),
                page_num: page,
                y1,
                y2,
                left_margin: dim.left_margin,
                right_margin: dim.right_margin,
                snippet_id: snippet_id.to_string(),
            };

            // Send Data so that the cropping is executed in parallel.
            tx.send(data).expect("Failed to send data");

            if let Some(ref client) = client {
                let _ = import::import_snippet_with_client(client, &output).await;
            }

            // Add generated snippet to HTML page
            if let Some(id) = &processor.current_id {
                let snippet = format!("<stellar-snippet>{id}</stellar-snippet>\n");
                processor.html_page.push_str(&snippet);
            }

            processor.current_coords = None;
            processor.current_page = None;
            processor.current_id = None;
        }
        AddSection(title) => {
            // Add title to HTML page
            let snippet = format!("<h1>{title}</h1>\n");
            processor.html_page.push_str(&snippet);
        }
        AddSubSection(title) => {
            // Add title to HTML page
            let snippet = format!("<h2>{title}</h2>\n");
            processor.html_page.push_str(&snippet);
        }
        AddSubSubSection(title) => {
            // Add title to HTML page
            let snippet = format!("<h3>{title}</h3>\n");
            processor.html_page.push_str(&snippet);
        }
        Include((id, params)) => {
            // Add snippet id to HTML page
            
            let snippet = if let Some(params) = params {
                format!("<stellar-snippet params=\"{params}\">{id}</stellar-snippet>\n")
            } else {
                format!("<stellar-snippet>{id}</stellar-snippet>\n")
            };
            
            processor.html_page.push_str(&snippet);
        }
        Plain(text) => {
            // Add snippet id to HTML page
            processor.html_page.push_str("<p>");
            processor.html_page.push_str(&text);
            processor.html_page.push_str("</p>");
        }
    }
}

fn finalize(processor: &mut DocProcessor, pages_dir: &Path, courses_dir: &Path) {
    // Generate page
    let file_id = &processor.global_id;

    if processor.gen_page {
        let filename = format!("{file_id}.html");
        let file_path = pages_dir.join(&filename);

        log::info!("Writing file: {filename}");
        let res = fs::write(file_path, &processor.html_page);

        if res.is_err() {
            log::error!("Couldn't write file {}", &filename);
        }
    }

    if processor.gen_course {
        let filename = format!("{file_id}.json");
        let file_path = courses_dir.join(&filename);

        let json_course = json!({
            "title": "Course title",
            "pages": [
                [1, processor.global_title, file_id]
            ],
        });
        let json_course = serde_json::to_string_pretty(&json_course).unwrap();

        log::info!("Writing file: {filename}");
        let res = fs::write(file_path, json_course);

        if res.is_err() {
            log::error!("Couldn't write file {}", &filename);
        }
    }
}

fn create_if_necessary(path: &Path) {
    if !path.exists() {
        fs::create_dir_all(path).unwrap();
    }
}

// "/path/to/Document.tex" -> "Document"
fn strip_filename(path: &str) -> String {
    let mut components: Vec<&str> = path.split('/').collect();
    if let Some(last_component) = components.pop() {
        let mut filename = last_component.to_string();
        if let Some(dot_idx) = filename.rfind('.') {
            filename.truncate(dot_idx);
        }
        return filename;
    }
    panic!("File name could not be retrieved")
}

fn title_to_id(value: &str) -> String {
    value
        .replace("\'s", "")
        .replace('\'', "")
        .replace(' ', "-")
        .to_lowercase()
}
