use crate::parser::*;
use std::path::PathBuf;
use std::{fs, path::Path, io::Write};

use serde_json::{json, Value};

pub fn generate_from_latex(input: &PathBuf, output: &PathBuf, generate_course: bool) {
    let content = fs::read_to_string(input).unwrap();
    let filename = String::from(input.to_string_lossy());

    let out_folder = Path::new(output);
    create_if_necessary(out_folder);

    let snippets_dir = out_folder.join("snippets");
    let pages_dir = out_folder.join("pages");
    let courses_dir = out_folder.join("courses");

    let texdoc = parse_latex(&content, &filename);

    create_if_necessary(&snippets_dir);
    create_if_necessary(&pages_dir);

    if generate_course {
        // Generate a course with multiple pages
        create_if_necessary(&courses_dir);

        let json_course = tex_page_to_json_course(&texdoc);
        let json_course = serde_json::to_string_pretty(&json_course).unwrap();

        let filename = format!("{}.json", texdoc.title);
        log::debug!("Writing file {}", &filename);
        fs::write(courses_dir.join(&filename), json_course).expect("Couldn't write to file");

        // Generate HTML pages
        for snippet in &texdoc.snippets {
            let html_page = tex_snippet_to_html_entry(&snippet);
            let filename = format!("{}.html", snippet.id);

            log::debug!("Writing file {}", &filename);
            fs::write(pages_dir.join(&filename), html_page).expect("Couldn't write to file");
        }
    } else {
        // Generate only one page

        let filename = format!("{}.html", texdoc.title);
        let file_path = pages_dir.join(&filename);

        // Delete file
        if fs::metadata(&file_path).is_ok() {
            let _ = fs::remove_file(&file_path);
        }

        let mut file = fs::OpenOptions::new()
            .write(true)
            .append(true)
            .create(true)
            .open(&file_path)
            .expect("Couldn't write to file");

        log::debug!("Writing file {}", &filename);
        
        for snippet in &texdoc.snippets {
            let html = tex_snippet_to_html_entry(&snippet);

            file.write_all(html.as_bytes()).expect("Couldn't write to file");
            file.write_all(b"\n").expect("Couldn't write to file");
        }
    }

    // Generate snippets
    for snippet in &texdoc.snippets {
        // Write snippet tex to fs
        if let Some(tex) = &snippet.tex {
            let filename = format!("{}.tex", &snippet.id);
            let dir = snippets_dir.join(&snippet.id);
            let file_path = dir.join(&filename);

            create_if_necessary(&dir);

            let existing_content = fs::read_to_string(&file_path).ok();

            // Write only if there are changes
            if existing_content != Some(tex.into()) {
                log::debug!("Writing file {}", &filename);
                fs::write(&file_path, tex).expect("Couldn't write to file");
            } else {
                log::debug!("Skipping file {}", &filename);
            }
        }
    }

    log::info!("Remember to compile the snippets");
}

fn create_if_necessary(path: &Path) {
    if !path.exists() {
        fs::create_dir_all(path).unwrap();
    }
}

fn tex_snippet_to_html_entry(snippet: &TeXSnippet) -> String {
    let title = format!("<h{0}>{1}</h{0}>", snippet.level, snippet.title);
    let snippet = format!("<snippet>{}</snippet>", snippet.id);

    format!("{title}\n{snippet}")
}

fn tex_page_to_json_course(doc: &TeXPage) -> Value {
    let mut pages = vec![];

    for snippet in &doc.snippets {
        if snippet.level > 2 {
            continue;
        }

        let mut properties = vec![];

        properties.push(Value::Number(snippet.level.into()));
        properties.push(Value::String(snippet.title.clone()));
        if snippet.tex.is_some() {
            properties.push(Value::String(snippet.id.clone()));
        }

        pages.push(properties);
    }

    json!({
        "title": doc.title,
        "pages": pages,
    })
}
