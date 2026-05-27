use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Universe {
    pub title: String,
    pub courses: Vec<Course>,
    #[serde(default)]
    pub dependencies: Vec<Dependency>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Course {
    pub name: String,
    pub id: String,
    pub x: f64,
    pub y: f64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub color: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Dependency {
    pub from: String,
    pub to: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub curve: Option<f64>,
}

#[derive(Debug, Deserialize)]
pub struct QueryEntry {
    pub id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SnippetReferenceTree {
    pub id: String,
    #[serde(default)]
    pub references: Vec<SnippetReferenceTree>,
}
