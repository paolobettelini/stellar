use crate::parser::{*, Cmd::*};
use import::ClientHandler;
use std::{
    fs,
    path::{Path, PathBuf},
};
use stellar_import as import;
use std::process::Command;

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

pub async fn generate_snippets(
    input: &PathBuf,
    output: &PathBuf,
    client: Option<ClientHandler>,
) -> anyhow::Result<()> {
    let out_folder = Path::new(output);
    let snippets_dir = out_folder.join("snippets");
    let pages_dir = out_folder.join("pages");
    let courses_dir = out_folder.join("courses");
    
    create_if_necessary(out_folder);
    create_if_necessary(&snippets_dir);
    create_if_necessary(&pages_dir);
    create_if_necessary(&courses_dir);
    
    let commands = pdf_extract(&input).unwrap();
    let mut processor = DocProcessor::default();

    // Set default global ID using the file name
    let filename = String::from(input.file_stem().unwrap().to_string_lossy());
    let filename = strip_filename(&filename);
    let file_id = title_to_id(&filename);
    processor.global_id = file_id;
    
    // Set default global title using the file name
    processor.global_title = filename;

    for cmd in commands {
        process_cmd(&input, &mut processor, &cmd, &snippets_dir, &client).await;
    }

    finalize(&mut processor, &pages_dir, &courses_dir);
    
    Ok(())
}

async fn process_cmd(
    input: &PathBuf,
    processor: &mut DocProcessor,
    cmd: &DocumentCmd,
    snippets_dir: &Path,
    client: &Option<ClientHandler>) {
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
            let top_spacing = -10.8;
            let width = 451.5;
            let bottom_spacing = 3.8;

            let x1 = processor.current_coords.unwrap().0;
            let y1 = processor.current_coords.unwrap().1 + top_spacing;
            let x2 = x1 + width;
            let y2 = cmd.coords.1 + bottom_spacing;
            let page = cmd.page - 1;
            crop_pdf(&input, &output, page, x1, y1, x2, y2);
            
            log::info!("Saving snippet: {snippet_id}");

            if let Some(ref client) = client {
                let _ = import::import_snippet_with_client(&client, &output).await;
            }

            // Add generated snippet to HTML page
            if let Some(id) = & processor.current_id {
                let snippet = format!("<snippet>{id}</snippet>\n");
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
        Include(id) => {
            // Add snippet id to HTML page
            let snippet = format!("<snippet>{id}</snippet>\n");
            processor.html_page.push_str(&snippet);
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
        let res = fs::write(&file_path, &processor.html_page);

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
        let res = fs::write(&file_path, &json_course);

        if res.is_err() {
            log::error!("Couldn't write file {}", &filename);
        }
    }
}

fn crop_pdf(input: &Path, output: &Path, page_num: u16, x1: f64, y1: f64, x2: f64, y2: f64) {
    let input = &input.to_str().map(|s| s.to_string()).unwrap_or_default();
    let output = &output.to_str().map(|s| s.to_string()).unwrap_or_default();
    
    let _ = Command::new("pdfcrop.py")
        .arg(input)
        .arg(page_num.to_string())
        .arg(x1.to_string())
        .arg(y1.to_string())
        .arg(x2.to_string())
        .arg(y2.to_string())
        .arg(output)
        .status();
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