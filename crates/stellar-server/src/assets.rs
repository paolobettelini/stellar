#![cfg(feature = "ssr")]

use actix_web::HttpResponse;
use mime_guess::from_path;
#[cfg(not(debug_assertions))]
use rust_embed::RustEmbed;
#[cfg(debug_assertions)]
use std::path::Path;

#[cfg(not(debug_assertions))]
#[derive(RustEmbed)]
#[folder = "$CARGO_MANIFEST_DIR/../../dist/"]
pub(crate) struct Asset;

#[cfg(not(debug_assertions))]
pub(crate) fn handle_static_file(path: &str) -> HttpResponse {
    // If in release mode, read from the embedded folder

    match get_embedded_asset(path) {
        Some((served_path, content)) => HttpResponse::Ok()
            .content_type(content_type(&served_path))
            .body(content.data.into_owned()),
        None => {
            log::warn!(
                "Embedded asset not found: {path}. Embedded pkg assets: {}",
                embedded_pkg_assets()
            );
            HttpResponse::NotFound().body("404 Not Found")
        }
    }
}

#[cfg(not(debug_assertions))]
fn get_embedded_asset(path: &str) -> Option<(String, rust_embed::EmbeddedFile)> {
    Asset::get(path)
        .map(|content| (path.to_string(), content))
        .or_else(|| {
            let fallback_path = wasm_bindgen_bg_path_fallback(path)?;
            Asset::get(&fallback_path).map(|content| (fallback_path, content))
        })
}

#[cfg(not(debug_assertions))]
fn embedded_pkg_assets() -> String {
    let assets = Asset::iter()
        .filter(|path| path.starts_with("pkg/"))
        .take(32)
        .collect::<Vec<_>>();

    if assets.is_empty() {
        String::from("<none>")
    } else {
        assets.join(", ")
    }
}

#[cfg(debug_assertions)]
pub(crate) fn handle_static_file(path: &str) -> HttpResponse {
    let site_root = option_env!("LEPTOS_SITE_ROOT").unwrap_or("dist");
    let file_path = Path::new(site_root).join(path);
    let fallback_path = wasm_bindgen_bg_path_fallback(path);
    let fallback_file_path = fallback_path
        .as_ref()
        .map(|fallback_path| Path::new(site_root).join(fallback_path));

    let found_path = if file_path.exists() {
        file_path
    } else if let Some(fallback_file_path) = fallback_file_path.filter(|path| path.exists()) {
        fallback_file_path
    } else {
        file_path
    };

    match std::fs::read(&found_path) {
        Ok(content) => HttpResponse::Ok()
            .content_type(content_type(found_path.to_string_lossy().as_ref()))
            .body(content),
        Err(_) => {
            log::warn!("Static asset not found on disk: {}", found_path.display());
            HttpResponse::NotFound().body("404 Not Found")
        }
    }
}

fn wasm_bindgen_bg_path_fallback(path: &str) -> Option<String> {
    let wasm_path = path.strip_suffix("_bg.wasm")?;
    Some(format!("{wasm_path}.wasm"))
}

fn content_type(path: &str) -> String {
    if path.ends_with(".js") {
        String::from("text/javascript; charset=utf-8")
    } else if path.ends_with(".wasm") {
        String::from("application/wasm")
    } else if path.ends_with(".css") {
        String::from("text/css; charset=utf-8")
    } else {
        from_path(path).first_or_octet_stream().to_string()
    }
}
