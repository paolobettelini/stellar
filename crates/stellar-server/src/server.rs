#![cfg(feature = "ssr")]

use actix_web::{web, App, HttpServer};
use std::net::IpAddr;
use std::path::PathBuf;
use stellar_database::*;

use crate::routes::*;
use crate::app::App;

#[derive(Debug, Clone)]
pub(crate) struct Data {
    pub client: ClientHandler,
    pub data_folder: PathBuf,
}

pub async fn start_server(
    address: IpAddr,
    port: u16,
    connection_url: &str,
    data_folder: PathBuf,
) -> anyhow::Result<()> {
    use leptos::*;
    use leptos_actix::{generate_route_list, LeptosRoutes};
    use actix_files::Files;

    let client = ClientHandler::new(connection_url).await?;
    let _ = client.create_indexes().await;

    let data = Data {
        client,
        data_folder,
    };

    // Generate leptos options
    let cargo_toml = include_str!(concat!(env!("CARGO_MANIFEST_DIR"), "/../../Cargo.toml"));
    let mut leptos_options = match leptos_config::get_config_from_str(cargo_toml) {
        Ok(file) => file.leptos_options,
        Err(err) => {
            log::error!("{:#?}", err);
            panic!("Error in leptos config file")
        },
    };
    leptos_options.site_addr = std::net::SocketAddr::new(address, port);
    leptos_options.env = if cfg!(debug_assertions) {
        leptos_config::Env::DEV
    } else {
        leptos_config::Env::PROD
    };

    //println!("{}", env!("LEPTOS_SITE_ROOT"));
    //println!("{}", env!("LEPTOS_SITE_PKG_DIR"));

    // Generate the list of routes in your Leptos App
    let routes = generate_route_list(App);
    let listen_addr = leptos_options.site_addr;

    HttpServer::new(move || {
        let site_root = &leptos_options.site_root;

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
            //.service(index)
            //.service(search_html)
            //.service(universe_html)
            //.service(universe_editor_html)
            //.service(course_html)
            //.service(page_html)
            //.service(snippet_html)
            //.service(private_files)
            //.service(static_files)
            // Leptos
            .service(favicon)
            // /pkg/<path> -> <site_root>/pkg/<path>
            .service(Files::new("/pkg", format!("{site_root}/pkg")))
            // /assets/<path> -> <site_root>/<path>
            .service(Files::new("/assets", site_root))
            .leptos_routes(leptos_options.to_owned(), routes.to_owned(), App)
            // Data
            .app_data(web::Data::new(data.clone()))
    })
    .bind(listen_addr)?
    .run()
    .await?;

    Ok(())
}

#[actix_web::get("favicon.ico")]
async fn favicon() -> actix_web::Result<actix_files::NamedFile> {
    let site_root = "dist";
    Ok(actix_files::NamedFile::open(format!(
        "{site_root}/favicon.ico"
    ))?)
}