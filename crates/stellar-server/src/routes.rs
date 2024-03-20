use actix_web::{get, post, web, HttpResponse, Responder};

use crate::data::ServerData;
use futures::TryStreamExt;
use std::path::{Path, PathBuf};

// TODO: Move the following routes to leptos server functions

#[post("/api/snippet/{snippet}")]
async fn snippet_service(
    data: web::Data<ServerData>,
    snippet: web::Path<String>,
) -> impl Responder {
    let snippet = snippet.to_string();
    // TODO pre-create path
    let dir = &Path::new(&data.data_folder).join("snippets").join(&snippet);

    let (file, content_type) = {
        if let Some(v) = get_snippet_file_and_content_type(dir, &snippet) {
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
    // TODO pre-create path
    let file = &Path::new(&data.data_folder)
        .join("snippets")
        .join(snippet)
        .join(file_name.replace("..", "")); // replace .. just to be sure
    log::debug!("Reading file: {file:?}");

    let content = std::fs::read(file).unwrap();
    // TODO this is temporary
    // use mime_guess::from_path;
    let content_type = if file_name.ends_with("html") {
        "text/html"
    } else if file_name.ends_with("wasm") {
        "application/wasm"
    } else if file_name.ends_with("js") {
        "text/javascript"
    } else if file_name.ends_with("css") {
        "text/css"
    } else {
        panic!("Content type not implemented");
    };

    HttpResponse::Ok().content_type(content_type).body(content)
}