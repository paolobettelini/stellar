#[cfg(feature = "ssr")]
use actix_web::{web, App, HttpServer};

#[cfg(feature = "ssr")]
use std::net::IpAddr;
#[cfg(feature = "ssr")]
use std::path::PathBuf;
#[cfg(feature = "ssr")]
use stellar_database::*;

use wasm_bindgen::prelude::wasm_bindgen;

#[cfg(feature = "ssr")]
mod routes;
mod app;
use app::*;
#[cfg(feature = "ssr")]
pub(crate) mod asset;
#[cfg(feature = "ssr")]
use routes::*;

#[cfg(feature = "ssr")]
#[derive(Debug, Clone)]
pub(crate) struct Data {
    client: ClientHandler,
    data_folder: PathBuf,
}

#[cfg(feature = "hydrate")]
#[wasm_bindgen]
pub fn hydrate() {
    use leptos::*;
    console_error_panic_hook::set_once();

    leptos::mount_to_body(App);
}

#[cfg(feature = "ssr")]
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

    let leptos_options = if let Ok(file) = get_configuration(None).await {
        log::info!("Using leptos metadata configuration in Cargo.toml");
        file.leptos_options
    } else {
        let env = if cfg!(debug_assertions) {
                leptos_config::Env::DEV
            } else {
                leptos_config::Env::PROD
            };
        use std::net::Ipv4Addr;
        LeptosOptions {
            site_root: String::from("dist"),
            site_pkg_dir: String::from("pkg"),
            env,
            // TODO use param
            site_addr: std::net::SocketAddr::new(std::net::IpAddr::V4("127.0.0.1".parse::<Ipv4Addr>().unwrap()), 8081),
            ..LeptosOptions::default()
        }
    };

    // Generate the list of routes in your Leptos App
    let routes = generate_route_list(App);

    //let binding = (address, port);
    let binding = leptos_options.site_addr;

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
            .service(Files::new("/pkg", format!("{site_root}/pkg")))
            .service(Files::new("/assets", site_root))
            .leptos_routes(leptos_options.to_owned(), routes.to_owned(), App)
            // Data
            .app_data(web::Data::new(data.clone()))
    })
    .bind(binding)?
    .run()
    .await?;

    Ok(())
}

#[cfg(feature = "ssr")]
#[actix_web::get("favicon.ico")]
async fn favicon() -> actix_web::Result<actix_files::NamedFile> {
    let site_root = "dist";
    Ok(actix_files::NamedFile::open(format!(
        "{site_root}/favicon.ico"
    ))?)
}