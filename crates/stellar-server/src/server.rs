#![cfg(feature = "ssr")]

use crate::app::App;
use crate::assets::handle_static_file;
use crate::config::StellarConfig;
use crate::routes::*;
use actix_web::{
    HttpServer, Responder, dev::Service, get, http::Uri, middleware::NormalizePath, web,
};
use leptos::config::{Env, LeptosOptions, get_config_from_str};
use leptos::prelude::*;
use leptos_meta::MetaTags;
use leptos_router::Method;
use std::path::PathBuf;
use stellar_database::*;

pub fn shell(options: LeptosOptions, base_path: String) -> impl IntoView {
    let app_base = base_path.clone();
    view! {
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="stellar-base-path" content=base_path.clone()/>
                <AutoReload options=options.clone()/>
                <HydrationScripts options root=base_path/>
                <MetaTags/>
            </head>
            <body>
                <App base_path=app_base/>
            </body>
        </html>
    }
}

pub async fn start_server(config: StellarConfig) -> anyhow::Result<()> {
    use leptos_actix::{LeptosRoutes, generate_route_list};

    let base_path = normalize_base_path(&config.server.base_path)?;

    // Check if data folder exists
    check_data_folder_exists(&config.server.data_folder);

    let client = ClientHandler::new(&config.server.connection_url).await?;
    client.create_indexes().await?;

    use crate::data::ServerData;
    let data = ServerData { client, config };

    // Generate leptos options
    let cargo_toml = include_str!(concat!(env!("CARGO_MANIFEST_DIR"), "/../../Cargo.toml"));
    let mut leptos_options = match get_config_from_str(cargo_toml) {
        Ok(file) => file,
        Err(err) => {
            log::error!("{:#?}", err);
            panic!("Error in leptos config file")
        }
    };
    leptos_options.site_addr =
        std::net::SocketAddr::new(data.config.server.address, data.config.server.port);
    leptos_options.env = if cfg!(debug_assertions) {
        Env::DEV
    } else {
        Env::PROD
    };

    // Generate the list of routes in your Leptos App
    let route_base = base_path.clone();
    let routes = generate_route_list(move || view! { <App base_path=route_base.clone()/> });
    let listen_addr = leptos_options.site_addr;

    HttpServer::new(move || {
        let data = data.clone();
        let data2 = data.clone();
        let options = leptos_options.clone();
        let fallback_data = data.clone();
        let fallback_options = options.clone();
        let scope_base = base_path.clone();
        let shell_base = base_path.clone();
        let fallback_base = base_path.clone();
        let scope_data = data.clone();
        let api_base = base_path.clone();

        actix_web::App::new()
            .wrap(NormalizePath::trim())
            .leptos_routes_with_context(
                routes.to_owned(),
                move || provide_context(data.clone()),
                move || shell(options.clone(), shell_base.clone()),
            )
            .service(
                web::scope(&scope_base)
                    .service(snippet_service)
                    .service(snippet_complementary_service)
                    .service(favicon)
                    .service(static_assets)
                    .service(static_pkg)
                    .configure(|cfg| {
                        for (path, _) in leptos::server_fn::actix::server_fn_paths() {
                            let context_data = scope_data.clone();
                            let api_base = api_base.clone();
                            cfg.service(
                                web::resource(path)
                                    .wrap_fn(move |mut req, service| {
                                        if !api_base.is_empty() {
                                            // Leptos looks up server functions by the original /api path.
                                            let uri = server_fn_uri(req.uri(), &api_base);
                                            req.head_mut().uri = uri;
                                        }
                                        service.call(req)
                                    })
                                    .route(leptos_actix::handle_server_fns_with_context(
                                        move || provide_context(context_data.clone()),
                                    )),
                            );
                        }
                    })
                    .default_service(leptos_actix::render_app_to_stream_with_context(
                        move || {
                            provide_context(Method::Get);
                            provide_context(fallback_data.clone());
                        },
                        move || shell(fallback_options.clone(), fallback_base.clone()),
                        Method::Get,
                    )),
            )
            // Data
            .app_data(web::Data::new(data2))
    })
    .bind(listen_addr)?
    .run()
    .await?;

    Ok(())
}

fn server_fn_uri(uri: &Uri, base_path: &str) -> Uri {
    let path_and_query = uri
        .path_and_query()
        .expect("server function request has a path");
    let path = path_and_query.path();
    let relative_path = path.strip_prefix(base_path).unwrap_or(path);
    let relative_path = if let Some(query) = path_and_query.query() {
        format!("{relative_path}?{query}")
    } else {
        relative_path.to_string()
    };
    Uri::builder()
        .path_and_query(relative_path)
        .build()
        .expect("valid server function URI")
}

pub fn normalize_base_path(path: &str) -> anyhow::Result<String> {
    if path == "/" {
        return Ok(String::new());
    }
    let path = path.trim_end_matches('/');
    anyhow::ensure!(
        path.len() > 1
            && path.starts_with('/')
            && path.split('/').skip(1).all(|segment| {
                !segment.is_empty()
                    && segment != "."
                    && segment != ".."
                    && segment
                        .bytes()
                        .all(|c| c.is_ascii_alphanumeric() || c == b'-' || c == b'_')
            }),
        "Invalid base path: use / or a path like /stellar/notes"
    );
    Ok(path.to_string())
}

#[get("/assets/{_:.*}")]
async fn static_assets(path: web::Path<String>) -> impl Responder {
    handle_static_file(path.as_str())
}

#[get("/pkg/{_:.*}")]
async fn static_pkg(path: web::Path<String>) -> impl Responder {
    let site_pkg = option_env!("LEPTOS_SITE_PKG_DIR").unwrap_or("pkg");

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

#[cfg(test)]
mod tests {
    use super::{normalize_base_path, server_fn_uri};

    #[test]
    fn normalizes_base_paths() {
        assert_eq!(normalize_base_path("/").unwrap(), "");
        assert_eq!(normalize_base_path("/stellar/").unwrap(), "/stellar");
        assert_eq!(
            normalize_base_path("/stellar/notes").unwrap(),
            "/stellar/notes"
        );
        for invalid in [
            "",
            "stellar",
            "////",
            "/stellar//notes",
            "/../notes",
            "/stellar?x=1",
        ] {
            assert!(normalize_base_path(invalid).is_err());
        }
    }

    #[test]
    fn leptos_routes_include_base_path() {
        use crate::app::App;
        use leptos::prelude::*;

        let routes =
            leptos_actix::generate_route_list(|| view! { <App base_path="/stellar".to_string()/> });
        assert!(routes.iter().any(|route| route.path() == "/stellar/search"));
        assert!(
            routes
                .iter()
                .any(|route| route.path() == "/stellar/course/{course}")
        );
    }
}
