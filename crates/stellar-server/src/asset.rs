use rust_embed::RustEmbed;
use mime_guess::from_path;
use std::path::Path;
use actix_web::HttpResponse;

/*
#[derive(RustEmbed)]
#[folder = "$CARGO_MANIFEST_DIR/../stellar-website/"]
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
    // If in debug mode, resolve the path to an absolute path
    
    const FILE: &'static str = concat!(env!("CARGO_MANIFEST_DIR"), "/..", "/stellar-website/");
    
    let path = Path::new(FILE).join(path);
    match std::fs::read(&path) {
        Ok(content) => HttpResponse::Ok()
            .content_type(from_path(path).first_or_octet_stream().as_ref())
            .body(content),
        Err(_) => HttpResponse::NotFound().body("404 Not Found"),
    }
}*/