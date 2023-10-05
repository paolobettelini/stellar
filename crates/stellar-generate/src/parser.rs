const GLOBAL_ID: &str = "!id";
const SNIPPET: &str = "!snippet";
const END_SNIPPET: &str = "!endsnippet";
const GEN_PAGE: &str = "!gen-page";
const GEN_COURSE: &str = "!gen-course";
const INCLUDE: &str = "!include";
const GLOBAL_TITLE: &str = "!title";
const SECTION: &str = "!section";
const SUBSECTION: &str = "!subsection";
const SUBSUBSECTION: &str = "!subsubsection";

#[derive(Debug)]
pub struct DocumentCmd {
    pub coords: (f64, f64),
    pub page: u16,
    pub cmd: Cmd,
}

#[derive(Debug)]
pub enum Cmd {
    SetGlobalTitle(String),
    SetGlobalID(String),
    SetGenPage(bool),
    SetGenCourse(bool),
    StartSnippet(String),
    EndSnippet,
    Include(String),
    AddSection(String),
    AddSubSection(String),
    AddSubSubSection(String),
}

pub fn extract_square_parenthesis<'a>(text: &'a str) -> &'a str {
    extract_parenthesis(&text, '[', ']') 
}

pub fn extract_parenthesis<'a>(text: &'a str, open: char, end: char) -> &'a str {
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

pub fn parse_cmd(line: &str) -> Option<Cmd> {
    let cmd = if line.starts_with(SNIPPET) {
        let id = parse_start_snippet(&line)?;
        Cmd::StartSnippet(id)
    } else if line.starts_with(END_SNIPPET) {
        Cmd::EndSnippet
    } else if line.starts_with(GEN_PAGE) {
        let v = parse_gen_page(&line)?;
        Cmd::SetGenPage(v)
    } else if line.starts_with(GEN_COURSE) {
        let v = parse_gen_course(&line)?;
        Cmd::SetGenCourse(v)
    } else if line.starts_with(INCLUDE) {
        let id = parse_include(&line)?;
        Cmd::Include(id)
    } else if line.starts_with(GLOBAL_TITLE) {
        let title = parse_global_title(&line)?;
        Cmd::SetGlobalTitle(title)
    } else if line.starts_with(GLOBAL_ID) {
        let id = parse_global_id(&line)?;
        Cmd::SetGlobalID(id)
    } else if line.starts_with(SECTION) {
        let id = parse_section(&line)?;
        Cmd::AddSection(id)
    } else if line.starts_with(SUBSECTION) {
        let id = parse_subsection(&line)?;
        Cmd::AddSubSection(id)
    } else if line.starts_with(SUBSUBSECTION) {
        let id = parse_subsubsection(&line)?;
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

fn parse_gen_course(line: &str) -> Option<bool> {
    let v = &line[(GEN_COURSE.len() + 1)..];
    let v: bool = v.parse().ok()?;
    Some(v)
}

fn parse_include(line: &str) -> Option<String> {
    let id = &line[(INCLUDE.len() + 1)..];
    Some(id.to_string())
}

fn parse_global_title(line: &str) -> Option<String> {
    let id = &line[(GLOBAL_TITLE.len() + 1)..];
    Some(id.to_string())
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