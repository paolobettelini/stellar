use latex::{DocumentClass, Element, Document, Section, Align};
use crate::parser::{*, Cmd::*};
use std::{
    fs,
    path::{Path, PathBuf},
};

pub fn generate_pdf(
    input: &PathBuf,
    output: &PathBuf,
    data: &PathBuf,
) -> anyhow::Result<()> {
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
            },
            SetGlobalID(_) => {},
            SetGenPage(_) => {},
            SetGenCourse(_) => {},
            StartSnippet(id) => {
                doc.push(&*include(id));
            }
            EndSnippet => {},
            Include(id) => {
                doc.push(&*include(id));
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
    println!("{}", &rendered);

    Ok(())
}

fn include(id: &str) -> String {
    // TODO check if file exists

    id.to_string()
}