#[derive(Debug)]
pub struct DocumentCmd {
    pub coords: (f64, f64),
    pub page: u16,
    pub cmd: Cmd,
}

#[derive(Debug)]
pub enum Cmd {
    SetGlobalID(String),
    SetGenPage(bool),
    StartSnippet(String),
    EndSnippet(Option<String>),
    Include((String, Option<String>)),
    Plain(String),
    AddSection(String),
    AddSubSection(String),
    AddSubSubSection(String),
}

impl Cmd {

    /// Adds a string to the command argument
    pub fn inject_additional_arguments(&mut self, arg: &str) {
        match self {
            Self::SetGlobalID(s) => s.push_str(arg),
            Self::StartSnippet(s) => s.push_str(arg),
            Self::EndSnippet(s) => {
                if let Some(ref mut meta) = s {
                    meta.push_str(arg)
                }
            },
            Self::Include(s) => {
                if let Some(ref mut params) = &mut s.1 {
                    params.push_str(arg)
                }
            },
            Self::Plain(s) => {
                s.push_str(" ");
                s.push_str(arg);
            },
            Self::AddSection(s) => s.push_str(arg),
            Self::AddSubSection(s) => s.push_str(arg),
            Self::AddSubSubSection(s) => s.push_str(arg),
            _ => {}
        }
    }
}