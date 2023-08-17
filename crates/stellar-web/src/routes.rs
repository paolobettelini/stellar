use actix_web::{get, post, web, HttpResponse, Responder};
use std::fs;
use std::path::{PathBuf, Path};
use crate::Data;
use futures::TryStreamExt;

#[post("/course/{course}")]
async fn course_service(data: web::Data<Data>, course: web::Path<String>) -> impl Responder {
    let file_name = format!("{course}.json");
    log::debug!("Reading file: {file_name:?}");
    // TODO pre-create path
    let file = &Path::new(&data.data_folder).join("courses").join(file_name);
    let content = std::fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("application/json")
        .body(content)
    // HttpResponse::NotFound().body("Course not found")
}

#[post("/universe/{universe}")]
async fn universe_service(data: web::Data<Data>, universe: web::Path<String>) -> impl Responder {
    let file_name = format!("{universe}.json");
    log::debug!("Reading file: {file_name:?}");
    // TODO pre-create path
    let file = &Path::new(&data.data_folder).join("universes").join(file_name);
    let content = std::fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("application/json")
        .body(content)
    // HttpResponse::NotFound().body("Course not found")
}

#[post("/page/{page}")]
async fn page_service(data: web::Data<Data>, page: web::Path<String>) -> impl Responder {
    let file_name = format!("{page}.html");
    log::debug!("Reading file: {file_name:?}");
    // TODO pre-create path
    let file = &Path::new(&data.data_folder).join("pages").join(file_name);
    let content = std::fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(content)
}

#[post("/snippet/{snippet}")]
async fn snippet_service(data: web::Data<Data>, snippet: web::Path<String>) -> impl Responder {
    let snippet = snippet.to_string();
    // TODO pre-create path
    let dir = &Path::new(&data.data_folder).join("snippets").join(&snippet);

    let (file, content_type) = get_snippet_file_and_content_type(dir, &snippet).unwrap();

    log::debug!("Reading file: {file:?}");
    let content = std::fs::read(file).unwrap();

    HttpResponse::Ok().content_type(content_type).body(content)
}

#[get("/snippet/{snippet}/{file_name}")]
async fn snippet_complementary_service(data: web::Data<Data>, params: web::Path<(String, String)>) -> impl Responder {
    let snippet = &params.0;
    let file_name = &params.1;
    // TODO pre-create path
    let file = &Path::new(&data.data_folder)
        .join("snippets")
        .join(snippet)
        .join(file_name);
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
async fn search_html(data: web::Data<Data>) -> impl Responder {
    let file = Path::new(&data.www_folder).join("private").join("search.html");
    let html = fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}

#[get("/universe/{universe}")]
async fn universe_html(data: web::Data<Data>) -> impl Responder {
    let file = Path::new(&data.www_folder).join("private").join("universe.html");
    let html = fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}

#[get("/course/{course}")]
async fn course_html(data: web::Data<Data>) -> impl Responder {
    let file = Path::new(&data.www_folder).join("private").join("course.html");
    let html = fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}

#[get("/page/{page}")]
async fn page_html(data: web::Data<Data>) -> impl Responder {
    let file = Path::new(&data.www_folder).join("private").join("page.html");
    let html = fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}

#[get("/snippet/{snippet}")]
async fn snippet_html(data: web::Data<Data>) -> impl Responder {
    let file = Path::new(&data.www_folder).join("private").join("snippet.html");
    let html = fs::read_to_string(file).unwrap();

    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}

#[post("/query/snippet/{keyword}")]
async fn snippet_query(data: web::Data<Data>, keyword: web::Path<String>) -> impl Responder {
    let mut cursor = data.client.query_snippets(&keyword).await.unwrap();

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
async fn page_query(data: web::Data<Data>, keyword: web::Path<String>) -> impl Responder {
    let mut cursor = data.client.query_pages(&keyword).await.unwrap();

    let mut vec = Vec::new();
    while let Some(document) = cursor.try_next().await.unwrap() {
        vec.push(document);
    }
    let json = serde_json::to_string(&vec).unwrap();

    HttpResponse::Ok()
        .content_type("application/json")
        .body(json)
}

#[post("/query/universe/{keyword}")]
async fn universe_query(data: web::Data<Data>, keyword: web::Path<String>) -> impl Responder {
    let mut cursor = data.client.query_universes(&keyword).await.unwrap();

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
async fn course_query(data: web::Data<Data>, keyword: web::Path<String>) -> impl Responder {
    let mut cursor = data.client.query_courses(&keyword).await.unwrap();

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