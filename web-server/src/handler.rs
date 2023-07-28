use serde_json::json;
use std::path::{Path, PathBuf};
use warp::{
    http::{Response, StatusCode},
    Filter, Rejection, Reply,
};

#[allow(opaque_hidden_inferred_bound)]
pub fn get_routes(
    www: &'static PathBuf,
    data_folder: &'static PathBuf,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    let snippets_path = Path::new(data_folder);
    let pages_path = Path::new(data_folder);
    let courses_path = Path::new(data_folder);

    let static_files = warp::fs::dir(www);

    let course_api =
        warp::path!("course" / String)
            .and(warp::post())
            .then(move |course: String| async move {
                let file_name = format!("{course}.json");
                println!("Reading file: {file_name:?}");
                let file = &courses_path.join("courses").join(file_name);
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
                let file = &pages_path.join("pages").join(file_name);
                let content = std::fs::read_to_string(file).unwrap();

                Response::builder()
                    .status(StatusCode::OK)
                    .header("Content-Type", "text/html; charset=utf-8")
                    .body(content)
                    .unwrap()
            });

    let snippet_api =
        warp::path!("snippet" / String)
            .and(warp::get())
            .then(move |snippet: String| async move {
                let dir = &snippets_path.join("snippets").join(&snippet);

                let (file, content_type) =
                    get_snippet_file_and_content_type(&dir, &snippet).unwrap();

                println!("Reading file: {file:?}");
                let content = std::fs::read(file).unwrap();

                Response::builder()
                    .status(StatusCode::OK)
                    .header("Content-Type", content_type)
                    .body(content)
                    .unwrap()
            });

    let snippet_complementary_file_api = warp::path!("snippet" / String / String)
        .and(warp::get())
        .then(move |snippet: String, file_name: String| async move {
            let file = &snippets_path
                .join("snippets")
                .join(&snippet)
                .join(&file_name);

            println!("Reading complementary: {:?}", file);
            let content = std::fs::read(file).unwrap();

            // TODO this is temporary
            let content_type = if file_name.ends_with("html") {
                "text/html"
            } else if file_name.ends_with("wasm") {
                "application/wasm"
            } else if file_name.ends_with("js") {
                "text/javascript"
            } else {
                "*"
            };

            Response::builder()
                .status(StatusCode::OK)
                .header("Content-Type", content_type)
                .body(content)
                .unwrap()
        });

    let routes = snippet_api
        .or(snippet_complementary_file_api)
        .or(page_api)
        .or(course_api)
        .or(static_files);

    routes
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
