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
                
                let (file_name, content_type) = {
                    // Check if PDF file exists
                    let file = dir.join(format!("{snippet}.pdf"));
                    if file.exists() {
                        (file, "application/pdf")
                    } else {
                        // Check if HTML file exists
                        let file = dir.join(format!("{snippet}.html"));
                        if file.exists() {
                            (file, "text/html")
                        } else {
                            panic!("Not found :(");
                        }
                    }
                };

                println!("Reading file: {file_name:?}");
                let content = std::fs::read(file_name).unwrap();

                Response::builder()
                    .status(StatusCode::OK)
                    .header("Content-Type", content_type)
                    .body(content)
                    .unwrap()
            });

    let routes = snippet_api.or(page_api).or(course_api).or(static_files);

    routes
}
