#[derive(Debug)]
pub struct Course {
    pub id: String,
    pub pages: Vec<Page>,
}

#[derive(Debug)]
pub struct Page {
    pub id: String,
    pub level: u8,
    pub title: String,
}

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
    Plain(String),
    AddSection(String),
    AddSubSection(String),
    AddSubSubSection(String),
}

impl Cmd {

    /// Adds a string to the command argument
    pub fn inject_additional_arguments(&mut self, arg: &str) {
        match self {
            Self::SetGlobalTitle(s) => s.push_str(arg),
            Self::SetGlobalID(s) => s.push_str(arg),
            Self::StartSnippet(s) => s.push_str(arg),
            Self::Include(s) => s.push_str(arg),
            Self::Plain(s) => s.push_str(arg),
            Self::AddSection(s) => s.push_str(arg),
            Self::AddSubSection(s) => s.push_str(arg),
            Self::AddSubSubSection(s) => s.push_str(arg),
            _ => {}
        }
    }
}