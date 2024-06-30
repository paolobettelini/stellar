use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Snippet {
    pub id: String,
    pub references: Option<Vec<String>>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Page {
    pub id: String,
    pub snippets: Vec<String>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Course {
    pub id: String,
    pub pages: Vec<String>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Universe {
    pub id: String,
    pub courses: Vec<String>,
    pub dependencies: Vec<Dependency>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Dependency {
    pub from: String,
    pub to: String,
}