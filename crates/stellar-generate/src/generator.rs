use crate::parser::*;
use crate::parser::{TeXElement::*, *};
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
    
    let text_pieces = pdf_extract(&input).unwrap();
    let mut processor = DocProcessor::default();
    
    for text_piece in text_pieces {
        let lines = text_piece.text.split("\n");
        
        for line in lines {
            process_line(&input, &mut processor, &text_piece, &line, &snippets_dir);
        }
    }
    
    Ok(())
}

fn process_line(input: &PathBuf, processor: &mut DocProcessor, text_piece: &TextPiece, line: &str, snippets_dir: &Path) {
    if line.starts_with("!snippet") {
        processor.current_coords = Some(text_piece.coords);
        processor.current_page = Some(text_piece.page);
        // processor.current_title = Some("Hello title".to_string());
        processor.current_id = Some("Hello ID".to_string());

        // non ha senso tenere il current_title perché lo aggiungi subito ai titoli della pagina.
        // a meno che non metti una proprietà anche per l'indentazione della section
    }

    if line.starts_with("!gen-page") {

    }

    if line.starts_with("!gen-course") {

    }

    // Generate snippet
    if line.starts_with("!endsnippet") {
        println!("LINE: {line}");

        let snippet_id = processor.current_id.clone().unwrap();

        let output = snippets_dir.join(&snippet_id);
        create_if_necessary(&output);
        let output = output.join(format!("{snippet_id}.pdf"));

        // Crop snippet
        let x1 = processor.current_coords.unwrap().0;
        let y1 = processor.current_coords.unwrap().1 - 17.45;
        let x2 = x1 + 451.5;
        let y2 = text_piece.coords.1 + 9.9;
        let page = text_piece.page - 1;
        crop_pdf(&input, &output, page, x1, y1, x2, y2);

        processor.current_coords = None;
        processor.current_page = None;
        processor.current_id = None;
    }
}

fn finalize(processor: &mut DocProcessor, pages_dir: &Path, courses_dir: &Path) {

}

#[derive(Debug, Clone)]
struct TextPiece {
    pub text: String,
    pub coords: (f64, f64),
    pub page: u16,
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

// why didn't I do a JSON??
/// Example:
/// 245.00 234.00 1 [Some text]
/// 477.00 11.00 2 [Some other text]
fn pdf_extract(path: &Path) -> anyhow::Result<Vec<TextPiece>> {
    let mut raw = &pdf_extract_raw(&path)?[..];
    let mut result = vec![];
    let mut curr_index = 0;

    while let Some(text_index) = raw.find('[') {
        let coords_raw = &raw[curr_index..text_index];

        let text = extract_square_parenthesis(&raw[text_index..]).to_string();
        let mut coords_parts = coords_raw.trim().split_whitespace();

        let x: f64 = coords_parts.next().unwrap().parse()?;
        let y: f64 = coords_parts.next().unwrap().parse()?;
        let page: u16 = coords_parts.next().unwrap().parse()?;

        let text_len = &text.len();
        result.push(TextPiece {
            text,
            coords: (x, y),
            page
        });

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

fn extract_square_parenthesis<'a>(text: &'a str) -> &'a str {
    extract_parenthesis(&text, '[', ']') 
}

fn extract_parenthesis<'a>(text: &'a str, open: char, end: char) -> &'a str {
    let mut depth = 0;
    let mut length = 0;

    let chars = text.chars();
    for c in chars {
        if c == open {
            depth += 1;
        } else if c == end {
            depth -= 1;
        }
        
        if depth == 0 {
            break;
        }

        length += 1;
    }

    &text[1..length]
}

/*
pub async fn generate_latex_snippets(
    input: &PathBuf,
    output: &PathBuf,
    gen_page: bool,
    gen_course: bool,
    client: Option<ClientHandler>,
    compile: Option<&PathBuf>,
) -> anyhow::Result<()> {
    let content = fs::read_to_string(input)?;
    let filename = String::from(input.file_stem().unwrap().to_string_lossy());
    let file_id = title_to_id(&filename);

    let out_folder = Path::new(output);
    create_if_necessary(out_folder);

    let snippets_dir = out_folder.join("snippets");
    let pages_dir = out_folder.join("pages");
    let courses_dir = out_folder.join("courses");

    create_if_necessary(&snippets_dir);
    create_if_necessary(&pages_dir);
    create_if_necessary(&courses_dir);

    let tex_page = parse_latex(&content, &filename);

    let mut last_section_id = String::from("");
    let mut last_subsection_id = String::from("");
    let mut current_snippet_id = String::from("");

    let mut saved_snippets_count = 0;

    // If you have some content, an include, some content
    // then two snippets will be saved with the same id
    let mut same_id_counter = 0;

    let mut html_page = String::from("");

    for element in &tex_page.elements {
        match element {
            Section(section) => {
                let section_type = &section.section_type;
                let id = &section.id;

                current_snippet_id = format!(
                    "{file_id}-{}{}{}",
                    if section_type > &SectionType::Section && !last_section_id.is_empty() {
                        format!("{last_section_id}-")
                    } else {
                        "".to_string()
                    },
                    if section_type > &SectionType::Subsection && !last_section_id.is_empty() {
                        format!("{last_subsection_id}-")
                    } else {
                        "".to_string()
                    },
                    id
                );
                same_id_counter = 0;

                // maybe use a match
                if let &SectionType::Section = section_type {
                    last_section_id = id.clone();
                    last_subsection_id = String::from("");
                } else if let &SectionType::Subsection = section_type {
                    last_subsection_id = id.clone();
                }

                // Add heading to html file
                let title = format!(
                    "<h{0}>{1}</h{0}>",
                    section.section_type as u8, section.title
                );
                html_page += &(title + "\n");
            }
            TeXContent(content) => {
                if is_empty_tex(&content) || current_snippet_id.is_empty() {
                    continue;
                }

                let tex = make_full_document(&tex_page.preamble, &content);

                let id = if same_id_counter > 0 {
                    format!("{current_snippet_id}-{same_id_counter}")
                } else {
                    current_snippet_id.clone()
                };

                same_id_counter += 1;
                let saved = save_snippet(&id, &tex, &snippets_dir, &client, &compile).await;

                if saved {
                    saved_snippets_count += 1;
                }

                // Add entry to html page
                let snippet = format!("<snippet>{}</snippet>", &id);
                html_page += &(snippet + "\n");
            }
            IncludeCmd(id) => {
                // Add entry to html page
                let snippet = format!("<snippet>{}</snippet>", &id);
                html_page += &(snippet + "\n");
            }
        }
    }

    // Generate HTML page
    if gen_page {
        save_page(&tex_page.id, &pages_dir, &html_page, &client).await;
    }

    // Generate JSON course
    if gen_course {
        save_course(&tex_page.title, &tex_page.id, &courses_dir, &client).await;
    }

    log::info!("Saved {saved_snippets_count} snippets");

    if saved_snippets_count > 0 {
        let s = if saved_snippets_count == 1 { "" } else { "s" };
        log::info!("Remember to compile the snippet{s}");
    }

    Ok(())
}

async fn save_course(
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
            let _ = import::import_page_with_client(&client, &path).await;
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

fn make_full_document(preamble: &str, tex: &str) -> String {
    format!(
        r"{preamble}
\begin{{document}}
{tex}
\end{{document}}"
    )
}

fn is_empty_tex(content: &str) -> bool {
    for line in content.lines() {
        let trimmed_line = line.trim();
        if !trimmed_line.is_empty() && !trimmed_line.starts_with('%') {
            return false;
        }
    }
    true
}

// TODO: un-duplicate function
fn title_to_id(value: &str) -> String {
    value
        .replace("\'s", "")
        .replace('\'', "")
        .replace(' ', "-")
        .replace('ô', "o") // maybe remove this
        .to_lowercase()
}
*/

fn create_if_necessary(path: &Path) {
    if !path.exists() {
        fs::create_dir_all(path).unwrap();
    }
}
