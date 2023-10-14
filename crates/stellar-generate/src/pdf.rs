use crate::parser::{Cmd::*, *};
use latex::{Align, Document, DocumentClass, Element, Section};
use std::{
    fs,
    path::{Path, PathBuf},
};
use stellar_compile::*;
use uuid::Uuid;

pub fn generate_pdf(input: &PathBuf, output: &PathBuf, data: &PathBuf) -> anyhow::Result<()> {
    let filename = String::from(input.file_stem().unwrap().to_string_lossy());

    let commands = pdf_extract(&input).unwrap();
    let mut doc = Document::new(DocumentClass::Article);

    doc.preamble.use_package("fullpage");
    doc.preamble.use_package("graphicx");

    doc.push(Element::TitlePage)
        .push(Element::ClearPage)
        .push(Element::TableOfContents)
        .push(Element::ClearPage);

    for cmd in &commands {
        match &cmd.cmd {
            SetGlobalTitle(title) => {
                doc.preamble.title(title);
            }
            SetGlobalID(_) => {}
            SetGenPage(_) => {}
            SetGenCourse(_) => {}
            StartSnippet(id) => {
                doc.push(&*include(&data, id));
            }
            EndSnippet => {}
            Include(id) => {
                doc.push(&*include(&data, id));
            }
            AddSection(title) => {
                doc.push(&*format!(r"\section{{{title}}}"));
            }
            AddSubSection(title) => {
                doc.push(&*format!(r"\subsection{{{title}}}"));
            }
            AddSubSubSection(title) => {
                doc.push(&*format!(r"\subsubsection{{{title}}}"));
            }
        }
    }

    let rendered = latex::print(&doc).unwrap();
    let id = Uuid::new_v4().to_string();

    let tex_file = format!("{id}.tex");
    let pdf_file = format!("{id}.pdf");
    let tex_path = Path::new(&tex_file);
    let pdf_path = Path::new(&pdf_file);

    // Write temporary tex
    let res = fs::write(&tex_path, &rendered);
    if res.is_err() {
        log::error!("Couldn't write temporary file {}", &filename);
    }

    // Compile temporary file
    compile_latex(&tex_path);

    // Remove temporary file
    log::info!("Deleting {tex_path:?}");
    fs::remove_file(&tex_path).unwrap();

    // Move compiled tex
    fs::rename(&pdf_path, &output).unwrap();

    Ok(())
}

fn include(data: &PathBuf, id: &str) -> String {
    // TODO: different extensions
    let file = data.join("snippets").join(&id).join(format!("{id}.pdf"));

    if !file.exists() {
        log::error!("File {file:?} not found");
        return String::from("");
    }

    let path = fs::canonicalize(file).unwrap();
    let path = path.to_string_lossy();
    format!("\\includegraphics[width=\\textwidth]{{{path}}}")
}
