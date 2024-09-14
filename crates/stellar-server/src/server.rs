#![cfg(feature = "ssr")]

use crate::app::App;
use crate::assets::handle_static_file;
use crate::routes::*;
use crate::config::StellarConfig;
use actix_web::{get, web, HttpServer, Responder};
use std::net::IpAddr;
use std::path::PathBuf;
use stellar_database::*;

pub async fn start_server(config: StellarConfig) -> anyhow::Result<()> {
    use actix_files::Files;
    use leptos::*;
    use leptos_actix::{generate_route_list, LeptosRoutes};

    // Check if data folder exists
    check_data_folder_exists(&config.server.data_folder);

    let client = ClientHandler::new(&config.server.connection_url).await?;
    let _ = client.create_indexes().await;

    use crate::data::ServerData;
    let data = ServerData {
        client,
        config,
    };

    // Generate leptos options
    let cargo_toml = include_str!(concat!(env!("CARGO_MANIFEST_DIR"), "/../../Cargo.toml"));
    let mut leptos_options = match leptos_config::get_config_from_str(cargo_toml) {
        Ok(file) => file,
        Err(err) => {
            log::error!("{:#?}", err);
            panic!("Error in leptos config file")
        }
    };
    leptos_options.site_addr = std::net::SocketAddr::new(data.config.server.address, data.config.server.port);
    leptos_options.env = if cfg!(debug_assertions) {
        leptos_config::Env::DEV
    } else {
        leptos_config::Env::PROD
    };

    // Generate the list of routes in your Leptos App
    let routes = generate_route_list(App);
    let listen_addr = leptos_options.site_addr;

    HttpServer::new(move || {
        let data = data.clone();
        let data2 = data.clone();
        let site_root = &leptos_options.site_root;

        actix_web::App::new()
            .service(snippet_service)
            .service(snippet_complementary_service)
            .service(favicon)
            // /pkg/<path> -> <site_root>/pkg/<path>
            //.service(Files::new("/pkg", format!("{site_root}/pkg")))
            .service(static_assets)
            // /assets/<path> -> <site_root>/<path>
            //.service(Files::new("/assets", site_root))
            .service(static_pkg)
            .leptos_routes_with_context(
                leptos_options.to_owned(),
                routes.to_owned(),
                move || provide_context(data.clone()),
                App,
            )
            // Data
            .app_data(web::Data::new(data2))
    })
    .bind(listen_addr)?
    .run()
    .await?;

    Ok(())
}

#[get("/assets/{_:.*}")]
async fn static_assets(path: web::Path<String>) -> impl Responder {
    handle_static_file(path.as_str())
}

#[get("/pkg/{_:.*}")]
async fn static_pkg(path: web::Path<String>) -> impl Responder {
    let site_pkg = env!("LEPTOS_SITE_PKG_DIR");

    let path = path.as_str();
    let full_path = format!("{}/{}", site_pkg, path);

    handle_static_file(&full_path)
}

#[get("favicon.ico")]
async fn favicon() -> impl Responder {
    handle_static_file("favicon.ico")
}

fn check_data_folder_exists(path: &PathBuf) {
    if !(path.exists() && path.is_dir()) {
        log::error!("Data folder {:?} does not exist!", path);

        // Construct a default config to check if the path hasn't been changed.
        let def_config = StellarConfig::default();
        if def_config.server.data_folder == *path {
            log::error!("It seems like you did not change the default value in the TOML config.");
        }

        std::process::exit(1);
    }
}