use actix_files::Files;
use actix_web::{get, post, web, App, HttpServer, Responder, HttpResponse};
use env_logger;
use std::path::Path;

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
            .service(courses)
            // Static files
            .service(Files::new("/", &CONFIG.www).index_file("index.html"))
    })
    .bind((CONFIG.address, CONFIG.port))?
    .run()
    .await
}

#[post("/course/{course}")]
async fn courses(course: web::Path<String>) -> impl Responder {
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
