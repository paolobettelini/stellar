use actix_files::NamedFile;
use actix_web::{Error, error, get, post, web};

use crate::data::ServerData;
use std::path::{Component, Path, PathBuf};

// TODO: Move the following routes to leptos server functions

#[post("/api/snippet/{snippet}")]
async fn snippet_service(
    data: web::Data<ServerData>,
    snippet: web::Path<String>,
) -> Result<NamedFile, Error> {
    let snippet = snippet.to_string();
    if !is_safe_id(&snippet) {
        log::warn!("Rejected invalid snippet id: {snippet}");
        return Err(error::ErrorBadRequest("Invalid snippet id"));
    }

    let dir = Path::new(&data.config.server.data_folder)
        .join("snippets")
        .join(&snippet);

    let Some(file) = get_snippet_file(&dir, &snippet) else {
        log::warn!("Could not find snippet: {snippet}");
        return Err(error::ErrorNotFound("Snippet not found"));
    };

    log::debug!("Streaming file: {file:?}");
    NamedFile::open_async(&file)
        .await
        .map(NamedFile::disable_content_disposition)
        .map_err(|err| {
            log::warn!("Could not open snippet {snippet} at {file:?}: {err}");
            error::ErrorNotFound("Snippet not found")
        })
}

/// Returns the path of the snippet's main file.
fn get_snippet_file(dir: &Path, snippet: &str) -> Option<PathBuf> {
    for ext in ["pdf", "html"] {
        // Check if (e.g. snippet.pdf) exists
        let file = dir.join(format!("{}.{}", snippet, ext));
        if file.exists() {
            return Some(file);
        }
    }

    None
}

#[get("/snippet/{snippet}/{file_name:.+}")]
async fn snippet_complementary_service(
    data: web::Data<ServerData>,
    params: web::Path<(String, String)>,
) -> Result<NamedFile, Error> {
    let snippet = &params.0;
    let file_name = &params.1;

    if !is_safe_id(snippet) {
        log::warn!("Rejected invalid snippet id: {snippet}");
        return Err(error::ErrorBadRequest("Invalid snippet id"));
    }

    let Some(relative_path) = safe_relative_path(file_name) else {
        log::warn!("Rejected invalid snippet asset path: {file_name}");
        return Err(error::ErrorBadRequest("Invalid file path"));
    };

    let snippet_dir = Path::new(&data.config.server.data_folder)
        .join("snippets")
        .join(snippet);

    let Ok(snippet_dir) = snippet_dir.canonicalize() else {
        log::warn!("Could not find snippet folder: {snippet}");
        return Err(error::ErrorNotFound("Snippet not found"));
    };

    let requested_file = snippet_dir.join(&relative_path);
    let Ok(file) = requested_file.canonicalize() else {
        log::warn!("Could not find snippet asset: {requested_file:?}");
        return Err(error::ErrorNotFound("File not found"));
    };

    if !file.starts_with(&snippet_dir) {
        log::warn!("Rejected snippet asset outside snippet folder: {file:?}");
        return Err(error::ErrorBadRequest("Invalid file path"));
    }

    log::debug!("Streaming file: {file:?}");
    NamedFile::open_async(&file)
        .await
        .map(NamedFile::disable_content_disposition)
        .map_err(|err| {
            log::warn!("Could not open snippet asset {file:?}: {err}");
            error::ErrorNotFound("File not found")
        })
}

fn is_safe_id(id: &str) -> bool {
    !id.is_empty()
        && id != "."
        && id != ".."
        && id.len() <= 128
        && id.bytes().all(|byte| {
            byte.is_ascii_alphanumeric() || byte == b'-' || byte == b'_' || byte == b'.'
        })
}

fn safe_relative_path(path: &str) -> Option<PathBuf> {
    let path = Path::new(path);
    if path.is_absolute() {
        return None;
    }

    let mut safe_path = PathBuf::new();
    for component in path.components() {
        match component {
            Component::Normal(part) => safe_path.push(part),
            Component::CurDir => {}
            Component::ParentDir | Component::RootDir | Component::Prefix(_) => return None,
        }
    }

    if safe_path.as_os_str().is_empty() {
        None
    } else {
        Some(safe_path)
    }
}
