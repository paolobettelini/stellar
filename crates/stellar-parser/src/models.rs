pub struct Course {
    id: String,
    pages: Vec<Page>,
}

pub struct Page {
    id: String,
    level: u8,
    title: String,
}