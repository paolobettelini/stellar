mod import;
mod pathbuf_type;
use std::path::PathBuf;

pub use import::*;
pub use pathbuf_type::*;

pub async fn import(url: &str, path: &PathBuf) -> anyhow::Result<()> {
    let data_type = get_path_type(path);

    match data_type {
        PathBufType::DataFolder => import_data(url, path).await?,
        PathBufType::SnippetsFolder => import_snippets(url, path).await?,
        PathBufType::PagesFolder => import_pages(url, path).await?,
        PathBufType::CoursesFolder => import_courses(url, path).await?,
        PathBufType::SnippetsFile => import_snippet(url, path).await?,
        PathBufType::PagesFile => import_page(url, path).await?,
        PathBufType::CoursesFile => import_course(url, path).await?,
        PathBufType::Other => log::error!("Path does not point to valid data"),
    }

    Ok(())
}