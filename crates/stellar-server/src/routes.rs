use actix_web::{get, post, web, HttpResponse, Responder};

use std::path::{PathBuf, Path};
use futures::TryStreamExt;
use crate::{Data, asset::*};

#[post("/course/{course}")]
async fn course_service(data: web::Data<Data>, course: web::Path<String>) -> impl Responder {
    let file_name = format!("{course}.json");
    log::debug!("Reading file: {file_name:?}");
    // TODO pre-create path
    let file = &Path::new(&data.data_folder).join("courses").join(&file_name);
    let content = {
        if let Ok(v) = std::fs::read_to_string(file) {
            v
        } else {
            log::warn!("Could not find course: {file_name}");
            return HttpResponse::NotFound().body("Course not found");
        }
    };


    HttpResponse::Ok()
        .content_type("application/json")
        .body(content)
}

#[post("/universe/{universe}")]
async fn universe_service(data: web::Data<Data>, universe: web::Path<String>) -> impl Responder {
    let file_name = format!("{universe}.json");
    log::debug!("Reading file: {file_name:?}");
    // TODO pre-create path
    let file = &Path::new(&data.data_folder).join("universes").join(&file_name);
    let content = {
        if let Ok(v) = std::fs::read_to_string(file) {
            v
        } else {
            log::warn!("Could not find universe: {file_name}");
            return HttpResponse::NotFound().body("Universe not found");
        }
    };


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
    let file = &Path::new(&data.data_folder).join("pages").join(&file_name);
    let content = {
        if let Ok(v) = std::fs::read_to_string(file) {
            v
        } else {
            log::warn!("Could not find page: {file_name}");
            return HttpResponse::NotFound().body("Page not found");
        }
    };


    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(content)
}

#[post("/snippet/{snippet}")]
async fn snippet_service(data: web::Data<Data>, snippet: web::Path<String>) -> impl Responder {
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

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Found()
        .append_header(("Location", "/universe/stellar"))
        .finish()
}

#[get("/{_:.*}")]
async fn static_files(path: web::Path<String>) -> impl Responder {
    handle_static_file(path.as_str())
}

#[get("/private/{_:.*}")]
async fn private_files() -> impl Responder {
    HttpResponse::NotFound().body("404 not found")
}

#[get("/snippet/{snippet}/{file_name:.*}")]
async fn snippet_complementary_service(data: web::Data<Data>, params: web::Path<(String, String)>) -> impl Responder {
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
    } else {
        panic!("Content type not implemented");
    };

    HttpResponse::Ok().content_type(content_type).body(content)
}

#[get("/search")]
async fn search_html(_data: web::Data<Data>) -> impl Responder {
    let path = format!("private/search.html");
    handle_static_file(&path)
}

#[get("/universe/{universe}")]
async fn universe_html(_data: web::Data<Data>) -> impl Responder {
    let path = format!("private/universe.html");
    handle_static_file(&path)
}

#[get("/universe_editor/{universe}")]
async fn universe_editor_html(_data: web::Data<Data>) -> impl Responder {
    let path = format!("private/universe_editor.html");
    handle_static_file(&path)
}

#[get("/course/{course}")]
async fn course_html(_data: web::Data<Data>) -> impl Responder {
    let path = format!("private/course.html");
    handle_static_file(&path)
}

#[get("/page/{page}")]
async fn page_html(_data: web::Data<Data>) -> impl Responder {
    let path = format!("private/page.html");
    handle_static_file(&path)
}

#[get("/snippet/{snippet}")]
async fn snippet_html(_data: web::Data<Data>) -> impl Responder {
    let path = format!("private/snippet.html");
    handle_static_file(&path)
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