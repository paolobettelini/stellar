use crate::parser::{*, Cmd::*};
use import::ClientHandler;
use std::{
    fs,
    io::Write,
    path::{Path, PathBuf},
};
use stellar_import as import;
use std::borrow::Cow;
use std::process::Command;

use serde_json::{json, Value};

pub fn generate_pdf(
    input: &PathBuf,
    output: &PathBuf,
    data: &PathBuf,
) -> anyhow::Result<()> {
    let content = fs::read_to_string(input)?;
    let filename = String::from(input.file_stem().unwrap().to_string_lossy());
    
    unimplemented!();
}

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
            let x1 = processor.current_coords.unwrap().0;
            let y1 = processor.current_coords.unwrap().1 - 17.45;
            let x2 = x1 + 451.5;
            let y2 = cmd.coords.1 + 9.9;
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
        SetSnippetTitle(title) => {
            // Add title to HTML page
            let snippet = format!("<h1>{title}</h1>\n");
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

/// Example:
/// 245.00 234.00 1 [Some text]
/// 477.00 11.00 2 [Some other text]
fn pdf_extract(path: &Path) -> anyhow::Result<Vec<DocumentCmd>> {
    let mut raw = &pdf_extract_raw(&path)?[..];
    let mut result = vec![];

    while let Some(text_index) = raw.find('[') {
        let coords_raw = &raw[0..text_index];

        let text = extract_square_parenthesis(&raw[text_index..]).to_string();
        let mut coords_parts = coords_raw.trim().split_whitespace();

        let x: f64 = coords_parts.next().unwrap().parse()?;
        let y: f64 = coords_parts.next().unwrap().parse()?;
        let page: u16 = coords_parts.next().unwrap().parse()?;

        let text_len = &text.len();
        
        let lines = text.split("\n");
        for line in lines {
            let cmd = parse_cmd(&line).unwrap();
            let coords = (x, y);
            result.push(DocumentCmd { coords, page, cmd });
        }

        let index = text_index + text_len + 2;
        raw = &raw[index..];
    }

    Ok(result)
}

fn pdf_extract_raw(path: &Path) -> anyhow::Result<String> {
    let output = Command::new("pdfextract.py")
        .arg(path)
        .output()?;

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    Ok(stdout)
}

/*async fn save_course(
    title: &str,
    page_id: &str,
    courses_dir: &Path,
    client: &Option<ClientHandler>,
) -> bool {
    let json_course = json!({
        "title": title,
        "pages": [
            [1, title, page_id]
        ],
    });
    let json_course = serde_json::to_string_pretty(&json_course).unwrap();
    let filename = format!("{}.json", page_id);
    let path = courses_dir.join(&filename);

    let saved = save_file(&path, &filename, &json_course);

    // Import page
    if saved {
        if let Some(ref client) = client {
            let _ = import::import_course_with_client(&client, &path).await;
        }
    }

    saved
}

async fn save_page(
    page_id: &str,
    pages_dir: &Path,
    content: &str,
    client: &Option<ClientHandler>,
) -> bool {
    let filename = format!("{}.html", &page_id);
    let path = pages_dir.join(&filename);

    let saved = save_file(&path, &filename, &content);

    // Import page
    if saved {
        if let Some(ref client) = client {
            let _ = import::import_page_with_client(&client, &path).await;
        }
    }

    saved
}

async fn save_snippet(
    snippet_id: &str,
    tex: &str,
    snippets_dir: &Path,
    client: &Option<ClientHandler>,
    compile: &Option<&PathBuf>,
) -> bool {
    let filename = format!("{}.tex", &snippet_id);
    let dir = snippets_dir.join(&snippet_id);
    let file_path = dir.join(&filename);

    create_if_necessary(&dir);

    let saved = save_file(&file_path, &filename, &tex);

    if saved {
        // Import snippet
        if let Some(ref client) = client {
            let _ = import::import_snippet_with_client(&client, &file_path).await;
        }

        if let Some(ref search_path) = compile {
            stellar_compile::compile_snippet(&dir, &search_path, true);
        }
    }

    saved
}

fn save_file(file_path: &Path, filename: &str, content: &str) -> bool {
    let existing_content = fs::read_to_string(&file_path).ok();

    // Write only if there are changes
    if existing_content != Some(content.into()) {
        log::debug!("Writing file {}", &filename);
        let res = fs::write(&file_path, content);

        if res.is_err() {
            log::error!("Couldn't write file {}", &filename);
            false
        } else {
            true
        }
    } else {
        //log::debug!("Skipping file {}", &filename);
        false
    }
}
*/

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