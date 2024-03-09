#![cfg(feature = "ssr")]

use rust_embed::RustEmbed;
use mime_guess::from_path;
use std::path::Path;
use actix_web::HttpResponse;

#[cfg(not(debug_assertions))]
#[derive(RustEmbed)]
#[folder = "$CARGO_MANIFEST_DIR/../../$LEPTOS_SITE_ROOT/"]
pub(crate) struct Asset;

#[cfg(not(debug_assertions))]
pub(crate) fn handle_static_file(path: &str) -> HttpResponse {
    // If in release mode, read from the embedded folder

    match Asset::get(path) {
        Some(content) => HttpResponse::Ok()
            .content_type(from_path(path).first_or_octet_stream().as_ref())
            .body(content.data.into_owned()),
        None => HttpResponse::NotFound().body("404 Not Found"),
    }
}

#[cfg(debug_assertions)]
pub(crate) fn handle_static_file(path: &str) -> HttpResponse {
    let path = Path::new(path);
    match std::fs::read(&path) {
        Ok(content) => HttpResponse::Ok()
            .content_type(from_path(path).first_or_octet_stream().as_ref())
            .body(content),
        Err(_) => HttpResponse::NotFound().body("404 Not Found"),
    }
}