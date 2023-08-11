use actix_files::Files;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

use env_logger;
use std::path::{Path, PathBuf};
use std::fs;
use futures::TryStreamExt;
use stellar_database::*;

mod args;
use args::*;

#[macro_use]
extern crate lazy_static;

lazy_static! {
    pub static ref CONFIG: Args = Args::parse();
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize logging
    env_logger::init();

    let client = ClientHandler::new(&CONFIG.connection_url).await?;
    let _ = client.create_indexes().await;

    HttpServer::new(move || {
        App::new()
            .service(course_service)
            .service(page_service)
            .service(snippet_complementary_service)
            .service(snippet_service)
            .service(snippet_query)
            .service(page_query)
            .service(course_query)
            // Static files
            .service(private_folder)
            .service(search_html)
            .service(course_html)
            .service(page_html)
            .service(snippet_html)
            .service(Files::new("/", &CONFIG.www).index_file("index.html"))
            // Data
            .app_data(web::Data::new(client.clone()))
    })
    .bind((CONFIG.address, CONFIG.port))?
    .run()
    .await?;

    Ok(())
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

#[post("/snippet/{snippet}")]
async fn snippet_service(snippet: web::Path<String>) -> impl Responder {
    let snippet = snippet.to_string();
    // TODO pre-create path
    let dir = &Path::new(&CONFIG.data).join("snippets").join(&snippet);

    let (file, content_type) = get_snippet_file_and_content_type(&dir, &snippet).unwrap();

    log::debug!("Reading file: {file:?}");
    let content = std::fs::read(file).unwrap();

    HttpResponse::Ok().content_type(content_type).body(content)
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
        panic!("Content type not implemented");
    };

    HttpResponse::Ok().content_type(content_type).body(content)
}

#[get("/private/{a:.*}")]
async fn private_folder() -> impl Responder {
    HttpResponse::NotFound().body("404 not found")
}

#[get("/search")]
async fn search_html() -> impl Responder {
    let file = Path::new(&CONFIG.www).join("private").join("search.html");
    let html = fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}

#[get("/course/{course}")]
async fn course_html() -> impl Responder {
    let file = Path::new(&CONFIG.www).join("private").join("course.html");
    let html = fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}

#[get("/page/{page}")]
async fn page_html() -> impl Responder {
    let file = Path::new(&CONFIG.www).join("private").join("page.html");
    let html = fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}

#[get("/snippet/{snippet}")]
async fn snippet_html() -> impl Responder {
    let file = Path::new(&CONFIG.www).join("private").join("snippet.html");
    let html = fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}

#[post("/query/snippet/{keyword}")]
async fn snippet_query(client: web::Data<ClientHandler>, keyword: web::Path<String>) -> impl Responder {
    let mut cursor = client.query_snippets(&keyword).await.unwrap();

    let mut vec = Vec::new();
    while let Some(document) = cursor.try_next().await.unwrap() {
        vec.push(document);
    }
    let json = serde_json::to_string(&vec).unwrap();

    HttpResponse::Ok()
        .content_type("application/json")
        .body(json)
}

#[post("/query/page/{keyword}")]
async fn page_query(client: web::Data<ClientHandler>, keyword: web::Path<String>) -> impl Responder {
    let mut cursor = client.query_pages(&keyword).await.unwrap();

    let mut vec = Vec::new();
    while let Some(document) = cursor.try_next().await.unwrap() {
        vec.push(document);
    }
    let json = serde_json::to_string(&vec).unwrap();

    HttpResponse::Ok()
        .content_type("application/json")
        .body(json)
}

#[post("/query/course/{keyword}")]
async fn course_query(client: web::Data<ClientHandler>, keyword: web::Path<String>) -> impl Responder {
    let mut cursor = client.query_courses(&keyword).await.unwrap();

    let mut vec = Vec::new();
    while let Some(document) = cursor.try_next().await.unwrap() {
        vec.push(document);
    }
    let json = serde_json::to_string(&vec).unwrap();

    HttpResponse::Ok()
        .content_type("application/json")
        .body(json)
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