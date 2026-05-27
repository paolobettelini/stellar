use actix_web::{HttpResponse, Responder, get, post, web};

use crate::data::ServerData;
use mime_guess::from_path;
use std::path::{Component, Path, PathBuf};

// TODO: Move the following routes to leptos server functions

#[post("/api/snippet/{snippet}")]
async fn snippet_service(
    data: web::Data<ServerData>,
    snippet: web::Path<String>,
) -> impl Responder {
    let snippet = snippet.to_string();
    if !is_safe_id(&snippet) {
        log::warn!("Rejected invalid snippet id: {snippet}");
        return HttpResponse::BadRequest().body("Invalid snippet id");
    }

    let dir = Path::new(&data.config.server.data_folder)
        .join("snippets")
        .join(&snippet);

    let (file, content_type) = {
        if let Some(v) = get_snippet_file_and_content_type(&dir, &snippet) {
            v
        } else {
            log::warn!("Could not find snippet: {snippet}");
            return HttpResponse::NotFound().body("Snippet not found");
        }
    };

    log::debug!("Reading file: {file:?}");
    let content = {
        if let Ok(v) = std::fs::read(file) {
            v
        } else {
            log::warn!("Could not read snippet: {snippet}");
            return HttpResponse::NotFound().body("Snippet not found");
        }
    };

    HttpResponse::Ok().content_type(content_type).body(content)
}

/// Returns path of the main file and its content type
fn get_snippet_file_and_content_type(dir: &Path, snippet: &str) -> Option<(PathBuf, &'static str)> {
    let types = [("pdf", "application/pdf"), ("html", "text/html")];

    for &(ext, content_type) in &types {
        // Check if (e.g. snippet.pdf) exists
        let file = dir.join(format!("{}.{}", snippet, ext));
        if file.exists() {
            return Some((file, content_type));
        }
    }

    None
}

#[get("/snippet/{snippet}/{file_name:.*}")]
async fn snippet_complementary_service(
    data: web::Data<ServerData>,
    params: web::Path<(String, String)>,
) -> impl Responder {
    let snippet = &params.0;
    let file_name = &params.1;

    if !is_safe_id(snippet) {
        log::warn!("Rejected invalid snippet id: {snippet}");
        return HttpResponse::BadRequest().body("Invalid snippet id");
    }

    let Some(relative_path) = safe_relative_path(file_name) else {
        log::warn!("Rejected invalid snippet asset path: {file_name}");
        return HttpResponse::BadRequest().body("Invalid file path");
    };

    let snippet_dir = Path::new(&data.config.server.data_folder)
        .join("snippets")
        .join(snippet);

    let Ok(snippet_dir) = snippet_dir.canonicalize() else {
        log::warn!("Could not find snippet folder: {snippet}");
        return HttpResponse::NotFound().body("Snippet not found");
    };

    let requested_file = snippet_dir.join(&relative_path);
    let Ok(file) = requested_file.canonicalize() else {
        log::warn!("Could not find snippet asset: {requested_file:?}");
        return HttpResponse::NotFound().body("File not found");
    };

    if !file.starts_with(&snippet_dir) {
        log::warn!("Rejected snippet asset outside snippet folder: {file:?}");
        return HttpResponse::BadRequest().body("Invalid file path");
    }

    log::debug!("Reading file: {file:?}");
    let Ok(content) = std::fs::read(&file) else {
        log::warn!("Could not read snippet asset: {file:?}");
        return HttpResponse::NotFound().body("File not found");
    };

    HttpResponse::Ok()
        .content_type(from_path(&file).first_or_octet_stream().as_ref())
        .body(content)
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
