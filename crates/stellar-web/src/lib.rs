use actix_files::Files;
use actix_web::{web, App, HttpServer};

use std::net::IpAddr;
use std::path::PathBuf;
use stellar_database::*;

mod routes;
use routes::*;

#[derive(Debug, Clone)]
pub(crate) struct Data {
    client: ClientHandler,
    data_folder: PathBuf,
    www_folder: PathBuf,
}

pub async fn start_server(
    address: IpAddr,
    port: u16,
    connection_url: &str,
    data_folder: PathBuf,
    www_folder: PathBuf,
) -> anyhow::Result<()> {
    let client = ClientHandler::new(connection_url).await?;

    let _ = client.create_indexes().await;

    let data = Data {
        client,
        data_folder,
        www_folder: www_folder.clone(),
    };

    HttpServer::new(move || {
        App::new()
            .service(universe_query)
            .service(course_query)
            .service(page_query)
            .service(snippet_query)
            .service(universe_service)
            .service(course_service)
            .service(page_service)
            .service(snippet_service)
            .service(snippet_complementary_service)
            // Static files
            .service(index)
            .service(private_folder)
            .service(search_html)
            .service(universe_html)
            .service(course_html)
            .service(page_html)
            .service(snippet_html)
            .service(Files::new("/", &www_folder))
            // Data
            .app_data(web::Data::new(data.clone()))
    })
    .bind((address, port))?
    .run()
    .await?;

    Ok(())
}
