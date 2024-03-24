use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct Universe {
    pub title: String,
    pub courses: Vec<Course>,
    pub dependencies: Vec<Dependency>,
}

#[derive(Debug, Deserialize)]
pub struct Course {
    pub name: String,
    pub id: String,
    pub x: f64,
    pub y: f64,
    pub color: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct Dependency {
    pub from: String,
    pub to: String,
}

#[derive(Debug, Deserialize)]
pub struct QueryEntry {
    pub id: String,
}
