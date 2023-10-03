const SNIPPET: &str = "!snippet";
const END_SNIPPET: &str = "!endsnippet";
const GEN_PAGE: &str = "!gen-page";
const GEN_COURSE: &str = "!gen-course";
const INCLUDE: &str = "!include";
const GLOBAL_TITLE: &str = "!title";

#[derive(Debug)]
pub struct DocumentCmd {
    pub coords: (f64, f64),
    pub page: u16,
    pub cmd: Cmd,
}

#[derive(Debug)]
pub enum Cmd {
    SetGlobalTitle(String),
    SetGenPage(bool),
    SetGenCourse(bool),
    StartSnippet(String),
    EndSnippet,
    SetSnippetTitle(String),
    Include(String),
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
        let id = parse_start_snippet(&line)?;
        Cmd::Include(id)
    } else if line.starts_with(GLOBAL_TITLE) {
        todo!()
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