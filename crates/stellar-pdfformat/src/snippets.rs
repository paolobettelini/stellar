use import::ClientHandler;
use crate::Cmd::*;
use crate::DocumentCmd;
use crate::pdf_extract;
use std::process::{Command, Stdio};
use std::{
    fs,
    path::{Path, PathBuf},
};
use std::io::Write;
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
    global_id: String,
    gen_page: bool,
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
    client: Option<&ClientHandler>,
    top_offset: f64,
    bottom_offset: f64,
    left_margin: Option<f64>,
    right_margin: Option<f64>,
) -> anyhow::Result<(bool, u32)> { // (Page was imported, number of imported snippets)
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

    let mut imported_snippets = vec![];
    for cmd in commands {
        let snippet = process_cmd(input, &mut processor, &cmd, &snippets_dir, &dim, tx.clone()).await;

        if let Some(snippet) = snippet {
            imported_snippets.push(snippet);
        }
    }

    drop(tx);

    // Wait until all jobs are done
    for handle in handles {
        handle.join().expect("Failed to join worker thread");
    }

    // Import all the snippets since now the PDFs are available
    // and their contents can be parsed.
    let mut imported_snippets_count = 0;
    if let Some(ref client) = client {
        for snippet in imported_snippets {
            let path = snippets_dir.join(&snippet);
            let res = import::import_snippet_with_client(client, &path).await;
            
            if res.is_ok() {
                imported_snippets_count += 1;
            }
        }
    }

    let page_imported = finalize(&mut processor, &pages_dir, &courses_dir, &client).await;

    Ok((page_imported, imported_snippets_count))
}

async fn process_cmd(
    input: &PathBuf,
    processor: &mut DocProcessor,
    cmd: &DocumentCmd,
    snippets_dir: &Path,
    dim: &CropDimension,
    tx: Sender<CropPdfData>,
) -> Option<String> { // true if a snippet has been imported
    match &cmd.cmd {
        SetGlobalID(id) => {
            processor.global_id = id.to_string();
        }
        SetGenPage(gen_page) => processor.gen_page = *gen_page,
        StartSnippet(id) => {
            processor.current_coords = Some(cmd.coords);
            processor.current_page = Some(cmd.page);
            processor.current_id = Some(id.to_string());
        }
        EndSnippet(meta) => {
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

            // Note: the snippet is not imported here as the PDF might not be cropped yet.
            // yet will all be imported at the end.

            // Add generated snippet to HTML page
            if let Some(id) = &processor.current_id {
                let snippet = format!("<stellar-snippet>{id}</stellar-snippet>\n");
                processor.html_page.push_str(&snippet);
            }

            // Generate meta.json
            if let Some(meta) = meta {
                let mut output = snippets_dir.join(&snippet_id);
                output.push("meta.json");
                let mut file = fs::File::create(output).expect("Failed to save meta file");
                file.write_all(meta.as_bytes()).expect("Failed to save meta file");
            }

            processor.current_coords = None;
            processor.current_page = None;
            processor.current_id = None;

            return Some(snippet_id);
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

    None
}

async fn finalize(processor: &mut DocProcessor, pages_dir: &Path, courses_dir: &Path, client: &Option<&ClientHandler>) -> bool {
    // Generate page
    let file_id = &processor.global_id;

    if processor.gen_page {
        let filename = format!("{file_id}.html");
        let file_path = pages_dir.join(&filename);

        log::info!("Writing file: {filename}");
        let res = fs::write(&file_path, &processor.html_page);

        return if res.is_err() {
            log::error!("Couldn't write file {}", &filename);
            false
        } else if let Some(ref client) = client {
            let res = import::import_page_with_client(client, &file_path).await;
            res.is_ok()
        } else {
            false
        };
    }

    false
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
