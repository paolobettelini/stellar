use crate::models::*;
use std::{path::Path, process::Command};
use mupdf::{Document, TextPageFlags};
use mupdf::text_page::TextBlockType;

const GLOBAL_ID: &str = "!id";
const SNIPPET: &str = "!snippet";
const END_SNIPPET: &str = "!endsnippet";
const GEN_PAGE: &str = "!gen-page";
const INCLUDE: &str = "!include";
const PLAIN: &str = "!plain";
const SECTION: &str = "!section";
const SUBSECTION: &str = "!subsection";
const SUBSUBSECTION: &str = "!subsubsection";

struct DocumentRawCmd {
    x: f64,
    y: f64,
    page: u16,
    text: String,
}

pub fn pdf_extract(path: &Path) -> anyhow::Result<Vec<DocumentCmd>> {
    let mut command_lines = pdf_extract_raw_cmds(path)?;
    let mut result = vec![];

    for line in command_lines {
        let coords = (line.x, line.y);
        let page = line.page;
        let res = parse_cmd(&line.text);

        match res {
            Some(cmd) => {
                result.push(DocumentCmd { coords, page, cmd });
            }
            None => {
                // If the line does not start with a CMD,
                // it means that the argument(s) of the last command extend to
                // multiple line. In this case we add the line to the previous command,
                // and update its coordinates.

                let mut last_cmd = if let Some(cmd) = result.pop() {
                    cmd
                } else {
                    log::warn!("Discarded line: {}", &line.text);
                    continue;
                };

                last_cmd.cmd.inject_additional_arguments(&line.text);
                last_cmd.page = page;
                last_cmd.coords = coords;

                result.push(last_cmd);
            }
        }
    }

    Ok(result)
}

fn pdf_extract_raw_cmds(pdf_path: &Path) -> anyhow::Result<Vec<DocumentRawCmd>> {
    let mut result = vec![];
    let document = Document::open(pdf_path)?;
    let page_count = document.page_count().expect("Could not get page count");

    for page_index in 0..page_count {
        let page = document.load_page(page_index)?;

        let text_page = page.to_text_page(
            TextPageFlags::ACCURATE_BBOXES | TextPageFlags::PRESERVE_LIGATURES,
        )?;

        for block in text_page.blocks() {
            if block.r#type() != TextBlockType::Text {
                continue;
            }

            let bbox = block.bounds();

            let mut text = String::new();

            for line in block.lines() {
                for ch in line.chars() {
                    if let Some(c) = ch.char() {
                        text.push(c);
                    }
                }
                text.push('\n');
            }

            let text = text.trim();

            /*
             * MuPDF coordinate system
             * - origin at the top left
             * - y grows downwards
             */
            let x = bbox.x0 as f64;
            let y = bbox.y0 as f64;

            if text.starts_with('!') && x < 0.001 {
                let clean_text = clean_text(text);
                let page = page_index as u16;

                result.push(DocumentRawCmd { x, y, page, text: clean_text });
            }
        }
    }

    Ok(result)
}

fn clean_text(text: &str) -> String {
    text.replace('’', "'")
        .replace('ﬀ', "ff")
        .replace('ô', "o")
        .replace('”', "\"")
        .replace('“', "\"")
}

pub fn parse_cmd(line: &str) -> Option<Cmd> {
    let cmd = if line.starts_with(SNIPPET) {
        let id = parse_start_snippet(line)?;
        Cmd::StartSnippet(id)
    } else if line.starts_with(END_SNIPPET) {
        let v = parse_endsnippet(line);
        Cmd::EndSnippet(v)
    } else if line.starts_with(GEN_PAGE) {
        let v = parse_gen_page(line)?;
        Cmd::SetGenPage(v)
    } else if line.starts_with(INCLUDE) {
        let cmd = parse_include(line)?;
        Cmd::Include(cmd)
    } else if line.starts_with(PLAIN) {
        let text = parse_plain(line)?;
        Cmd::Plain(text)
    } else if line.starts_with(GLOBAL_ID) {
        let id = parse_global_id(line)?;
        Cmd::SetGlobalID(id)
    } else if line.starts_with(SECTION) {
        let id = parse_section(line)?;
        Cmd::AddSection(id)
    } else if line.starts_with(SUBSECTION) {
        let id = parse_subsection(line)?;
        Cmd::AddSubSection(id)
    } else if line.starts_with(SUBSUBSECTION) {
        let id = parse_subsubsection(line)?;
        Cmd::AddSubSubSection(id)
    } else {
        return None;
    };

    Some(cmd)
}

fn parse_start_snippet(line: &str) -> Option<String> {
    let id = &line[(SNIPPET.len() + 1)..];
    Some(id.to_string())
}

fn parse_gen_page(line: &str) -> Option<bool> {
    let v = &line[(GEN_PAGE.len() + 1)..];
    let v: bool = v.parse().ok()?;
    Some(v)
}

/// Option<(id, Option<params>)>
fn parse_include(line: &str) -> Option<(String, Option<String>)> {
    let text = &line[(INCLUDE.len() + 1)..];

    if let Some(pos) = text.find(' ') {
        let id = &text[..pos];
        let params = &text[pos + 1..];
        Some((id.to_string(), Some(params.to_string())))
    } else {
        // no parameters
        Some((text.to_string(), None))
    }
}

fn parse_endsnippet(line: &str) -> Option<String> {
    if line.len() == END_SNIPPET.len() {
        None
    } else {
        let text = &line[(END_SNIPPET.len() + 1)..];
        Some(text.to_string())
    }
}

fn parse_plain(line: &str) -> Option<String> {
    let text = &line[(PLAIN.len() + 1)..];
    Some(text.to_string())
}

fn parse_global_id(line: &str) -> Option<String> {
    let id = &line[(GLOBAL_ID.len() + 1)..];
    Some(id.to_string())
}

fn parse_section(line: &str) -> Option<String> {
    let v = &line[(SECTION.len() + 1)..];
    Some(v.to_string())
}

fn parse_subsection(line: &str) -> Option<String> {
    let v = &line[(SUBSECTION.len() + 1)..];
    Some(v.to_string())
}

fn parse_subsubsection(line: &str) -> Option<String> {
    let v = &line[(SUBSUBSECTION.len() + 1)..];
    Some(v.to_string())
}
