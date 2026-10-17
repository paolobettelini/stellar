use leptos::prelude::*;

#[derive(Clone)]
pub struct BasePath(pub String);

pub fn base_url(path: &str) -> String {
    let base = expect_context::<BasePath>();
    format!("{}{}", base.0, path)
}
