use serde_json::json;
use std::net::IpAddr;
use std::path::Path;
use warp::{
    http::{Response, StatusCode},
    Filter, Rejection, Reply,
};

#[tokio::main]
async fn main() {
    start_service(
        &"/home/paolo/Desktop/notes-v2/static",
        &"/home/paolo/Desktop/notes-v2/data/snippets",
        &"/home/paolo/Desktop/notes-v2/data/pages",
        &"/home/paolo/Desktop/notes-v2/data/courses",
        &"0.0.0.0",
        8080u16,
    )
    .await;
}

#[allow(opaque_hidden_inferred_bound)]
pub fn get_routes(
    www: &'static str,
    snippets_folder: &'static str,
    pages_folder: &'static str,
    courses_folder: &'static str,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    let snippets_path = Path::new(snippets_folder);
    let pages_path = Path::new(pages_folder);
    let courses_path = Path::new(courses_folder);

    let static_files = warp::fs::dir(www);

    let course_api =
    warp::path!("course" / String)
        .and(warp::post())
        .then(move |course: String| async move {
            let file_name = format!("{course}.json");
            println!("Reading file: {file_name:?}");
            let file = &courses_path.join(file_name);
            let content = std::fs::read_to_string(file).unwrap();

            Response::builder()
                .status(StatusCode::OK)
                .header("Content-Type", "application/json")
                .body(content)
                .unwrap()
        });

    let page_api =
        warp::path!("page" / String)
            .and(warp::post())
            .then(move |page: String| async move {
                let file_name = format!("{page}.html");
                println!("Reading file: {file_name:?}");
                let file = &pages_path.join(file_name);
                let content = std::fs::read_to_string(file).unwrap();

                Response::builder()
                    .status(StatusCode::OK)
                    .header("Content-Type", "text/html; charset=utf-8")
                    .body(content)
                    .unwrap()
            });

    let snippet_api =
        warp::path!("note" / String)
            .and(warp::get())
            .then(move |snippet: String| async move {
                let file_name = format!("{snippet}.pdf");
                println!("Reading file: {file_name:?}");
                let file = &snippets_path.join(file_name);
                let content = std::fs::read(file).unwrap();

                Response::builder()
                    .status(StatusCode::OK)
                    .header("Content-Type", "application/pdf")
                    .body(content)
                    .unwrap()
            });

    let routes = snippet_api.or(page_api).or(course_api).or(static_files);

    routes
}

async fn start_service(
    www: &'static str,
    snippets_folder: &'static str,
    pages_folder: &'static str,
    courses_folder: &'static str,
    ip: &'static str,
    port: u16,
) {
    let routes = get_routes(www, snippets_folder, pages_folder, courses_folder);

    let ip = if let Ok(address) = ip.parse::<IpAddr>() {
        address
    } else {
        panic!("Invalid IP");
    };

    warp::serve(routes).run((ip, port)).await;
}
