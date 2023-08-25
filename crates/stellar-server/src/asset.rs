use rust_embed::RustEmbed;
use mime_guess::from_path;
use actix_web::HttpResponse;

#[derive(RustEmbed)]
#[folder = "$CARGO_MANIFEST_DIR/../stellar-website/"]
#[exclude = "private/"]
pub(crate) struct Asset;

pub(crate) fn handle_embedded_file(path: &str) -> HttpResponse {
    match Asset::get(path) {
        Some(content) => HttpResponse::Ok()
            .content_type(from_path(path).first_or_octet_stream().as_ref())
            .body(content.data.into_owned()),
        None => HttpResponse::NotFound().body("404 Not Found"),
    }
}