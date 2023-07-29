use actix_files::Files;
use actix_web::{get, post, web, App, HttpServer, Responder, HttpResponse};
use env_logger;
use std::path::{Path, PathBuf};

mod args;
use args::*;

#[macro_use]
extern crate lazy_static;

lazy_static! {
    pub static ref CONFIG: Args = Args::parse();
}

// &CONFIG.www, &CONFIG.data
#[tokio::main]
async fn main() -> std::io::Result<()> {
    // Initialize logging
    env_logger::init();

    HttpServer::new(|| {
        App::new()
            .service(course_service)
            .service(page_service)
            .service(snippet_complementary_service)
            .service(snippet_service)
            // Static files
            .service(Files::new("/", &CONFIG.www).index_file("index.html"))
    })
    .bind((CONFIG.address, CONFIG.port))?
    .run()
    .await
}

#[post("/course/{course}")]
async fn course_service(course: web::Path<String>) -> impl Responder {
    let file_name = format!("{course}.json");
    log::debug!("Reading file: {file_name:?}");
    // TODO pre-create path
    let file = &Path::new(&CONFIG.data).join("courses").join(file_name);
    let content = std::fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("application/json")
        .body(content)
    // HttpResponse::NotFound().body("Course not found")
}


#[post("/page/{page}")]
async fn page_service(page: web::Path<String>) -> impl Responder {
    let file_name = format!("{page}.html");
    log::debug!("Reading file: {file_name:?}");
    // TODO pre-create path
    let file = &Path::new(&CONFIG.data).join("pages").join(file_name);
    let content = std::fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(content)
}

#[get("/snippet/{snippet}")]
async fn snippet_service(snippet: web::Path<String>) -> impl Responder {
    let snippet = snippet.to_string();
    // TODO pre-create path
    let dir = &Path::new(&CONFIG.data).join("snippets").join(&snippet);
    
    let (file, content_type) =
        get_snippet_file_and_content_type(&dir, &snippet).unwrap();

    log::debug!("Reading file: {file:?}");
    let content = std::fs::read(file).unwrap();

    HttpResponse::Ok()
        .content_type(content_type)
        .body(content)
}

#[get("/snippet/{snippet}/{file_name}")]
async fn snippet_complementary_service(data: web::Path<(String, String)>) -> impl Responder {
    let snippet = &data.0;
    let file_name = &data.1;
    // TODO pre-create path
    let file = &Path::new(&CONFIG.data)
        .join("snippets")
        .join(&snippet.to_string())
        .join(&file_name.to_string());
    log::debug!("Reading file: {file:?}");

    let content = std::fs::read(file).unwrap();
    // TODO this is temporary
    let content_type = if file_name.ends_with("html") {
        "text/html"
    } else if file_name.ends_with("wasm") {
        "application/wasm"
    } else if file_name.ends_with("js") {
        "text/javascript"
    } else {
        "*"
    };

    HttpResponse::Ok()
        .content_type(content_type)
        .body(content)
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