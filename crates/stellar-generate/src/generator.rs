use crate::parser::*;
use crate::parser::{TeXElement::*, *};
use import::ClientHandler;
use std::{
    fs,
    io::Write,
    path::{Path, PathBuf},
};
use stellar_import as import;

use serde_json::{json, Value};

//TODO  It seems to always write a file that shouldn't be written
// but doesn't actually write it in the file system (page)

pub async fn generate_from_latex(
    input: &PathBuf,
    output: &PathBuf,
    gen_page: bool,
    gen_course: bool,
    client: Option<ClientHandler>,
    compile: Option<&PathBuf>,
) {
    let content = fs::read_to_string(input).unwrap();
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
                saved_snippets_count += 1;
                save_snippet(&id, &tex, &snippets_dir, &client, &compile).await;

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
}

async fn save_course(
    title: &str,
    page_id: &str,
    courses_dir: &Path,
    client: &Option<ClientHandler>,
) {
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
}

async fn save_page(page_id: &str, pages_dir: &Path, content: &str, client: &Option<ClientHandler>) {
    let filename = format!("{}.html", &page_id);
    let path = pages_dir.join(&filename);

    let saved = save_file(&path, &filename, &content);

    // Import page
    if saved {
        if let Some(ref client) = client {
            let _ = import::import_page_with_client(&client, &path).await;
        }
    }
}

async fn save_snippet(
    snippet_id: &str,
    tex: &str,
    snippets_dir: &Path,
    client: &Option<ClientHandler>,
    compile: &Option<&PathBuf>,
) {
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
            stellar_compile::compile_snippet(&dir, &search_path);
        }
    }
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

fn create_if_necessary(path: &Path) {
    if !path.exists() {
        fs::create_dir_all(path).unwrap();
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
