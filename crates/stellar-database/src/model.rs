use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Snippet {
    pub id: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Page {
    pub id: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Course {
    pub id: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Universe {
    pub id: String,
}

/*
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
*/