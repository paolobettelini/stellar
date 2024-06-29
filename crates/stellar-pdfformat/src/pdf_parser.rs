use crate::models::*;
use std::{path::Path, process::Command};

const GLOBAL_ID: &str = "!id";
const SNIPPET: &str = "!snippet";
const END_SNIPPET: &str = "!endsnippet";
const GEN_PAGE: &str = "!gen-page";
const INCLUDE: &str = "!include";
const PLAIN: &str = "!plain";
const GLOBAL_TITLE: &str = "!title";
const SECTION: &str = "!section";
const SUBSECTION: &str = "!subsection";
const SUBSUBSECTION: &str = "!subsubsection";

/// Example:
/// 245.00 234.00 1 [Some text]
/// 477.00 11.00 2 [Some other text]
pub fn pdf_extract(path: &Path) -> anyhow::Result<Vec<DocumentCmd>> {
    let mut raw = &pdf_extract_raw(path)?[..];
    let mut result = vec![];

    while let Some(text_index) = raw.find('[') {
        let coords_raw = &raw[0..text_index];

        let text = extract_square_parenthesis(&raw[text_index..]).to_string();
        let mut coords_parts = coords_raw.split_whitespace();

        let x = coords_parts.next().unwrap();
        let y = coords_parts.next().unwrap();
        let page = coords_parts.next().unwrap();

        let x: f64 = x.parse()?;
        let y: f64 = y.parse()?;
        let page: u16 = page.parse()?;

        let text_len = &text.len();

        let lines = text.split('\n');
        for line in lines {
            log::debug!("Processing line: {line}");

            let coords = (x, y);
            let res = parse_cmd(line);

            match res {
                Some(cmd) => {
                    result.push(DocumentCmd { coords, page, cmd });    
                },
                None => {
                    // If the line does not start with a CMD,
                    // it means that the argument(s) of the last command extend to
                    // multiple line. In this case we add the line to the previous command,
                    // and update its coordinates.

                    let mut last_cmd = if let Some(cmd) = result.pop() {
                        cmd
                    } else {
                        log::warn!("Discarded line: {line}");
                        continue;
                    };

                    last_cmd.cmd.inject_additional_arguments(line);
                    last_cmd.page = page;
                    last_cmd.coords = coords;

                    result.push(last_cmd);
                }
            }
        }

        let index = text_index + text_len + 2;
        raw = &raw[index..];
    }

    Ok(result)
}

pub fn pdf_extract_raw(path: &Path) -> anyhow::Result<String> {
    let output = Command::new("pdfextract.py").arg(path).output()?;

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    Ok(stdout)
}

pub fn extract_square_parenthesis(text: &str) -> &str {
    extract_parenthesis(text, '[', ']')
}

pub fn extract_parenthesis(text: &str, open: char, end: char) -> &str {
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

        // This is wrong as a char may be more than one byte long
        // length += 1;

        length += c.len_utf8();
    }

    &text[1..length]
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
