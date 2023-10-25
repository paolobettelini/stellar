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
    AddSection(String),
    AddSubSection(String),
    AddSubSubSection(String),
}