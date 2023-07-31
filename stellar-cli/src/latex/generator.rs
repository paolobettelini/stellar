use crate::latex::parser::*;
use std::path::PathBuf;
use std::{fs, path::Path};

use serde_json::{json, Value};

pub fn generate_from_latex(input: &PathBuf, output: &PathBuf) {
    let content = fs::read_to_string(input).unwrap();
    let filename = String::from(input.to_string_lossy());

    let out_folder = Path::new(output);
    create_if_necessary(&out_folder);

    let snippets_dir = out_folder.join("snippets");
    let pages_dir = out_folder.join("pages");
    let courses_dir = out_folder.join("courses");

    create_if_necessary(&snippets_dir);
    create_if_necessary(&pages_dir);
    create_if_necessary(&courses_dir);

    let texdoc = parse(&content, &filename);

    let json = tex_page_to_json_course(&texdoc);
    let json = serde_json::to_string_pretty(&json).unwrap();

    let filename = format!("{}.json", texdoc.title);
    fs::write(courses_dir.join(filename), json).expect("Couldn't write to file");

    for snippet in texdoc.snippets {
        // Write page to fs
        let html_page = tex_snippet_to_html_page(&snippet);
        let filename = format!("{}.html", snippet.id);

        fs::write(pages_dir.join(filename), html_page).expect("Couldn't write to file");

        // Write snippet tex to fs
        if let Some(tex) = snippet.tex {
            let filename = format!("{}.tex", snippet.id);

            let dir = snippets_dir.join(snippet.id);
            create_if_necessary(&dir);
            fs::write(dir.join(filename), tex).expect("Couldn't write to file");
        }
    }
}

fn create_if_necessary(path: &Path) {
    if !path.exists() {
        fs::create_dir_all(path).unwrap();
    }
}

fn tex_snippet_to_html_page(snippet: &TeXSnippet) -> String {
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
