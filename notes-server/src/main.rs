use serde_json::json;
use std::net::IpAddr;
use std::path::Path;
use warp::{
    filters::cookie,
    http::{Response, StatusCode},
    multipart::{FormData, Part},
    reply, Filter, Rejection, Reply,
};

#[tokio::main]
async fn main() {
    start_service(
        &"/home/paolo/Scrivania/github/notes-v2/",
        &"/home/paolo/Scrivania/github/notes-v2/snippets",
        &"0.0.0.0",
        8080u16,
    )
    .await;
}

#[allow(opaque_hidden_inferred_bound)]
pub fn get_routes(
    www: &'static str,
    notes_folder: &'static str,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    let notes_path = Path::new(notes_folder);

    let static_files = warp::fs::dir(www);

    let page_api = warp::path!("page" / String)
        .and(warp::post())
        .then(|page: String| async {

            // HARDCODED
            let response = json! ({
                "notes":[{"level":1,"title":"Definition"},{"level":2,"title":"Tangent","file":"definition-tangent"},{"level":3,"title":"Subtangent","file":"definition-tangent-subtangent"},{"level":2,"title":"Derivative","file":"definition-derivative"},{"level":1,"title":"Interpretation"},{"level":2,"title":"Rate of Growth","file":"interpretation-rate-of-growth"},{"level":2,"title":"First Derivative Test","file":"interpretation-first-derivative-test"},{"level":2,"title":"Concavity","file":"interpretation-concavity"},{"level":2,"title":"Second Derivative Test","file":"interpretation-second-derivative-test"},{"level":1,"title":"Absolute Extrema","file":"absolute-extrema"},{"level":1,"title":"Rules for differentiation","file":"rules-for-differentiation"},{"level":1,"title":"L'Hôpital Rule","file":"hopital-rule"},{"level":1,"title":"Intermediate value Theorem","file":"intermediate-value-theorem"},{"level":1,"title":"Bolzano's Theorem","file":"bolzano-theorem"},{"level":1,"title":"Weierstrass Theorem","file":"weierstrass-theorem"},{"level":1,"title":"Rolle's Theorem","file":"rolle-theorem"},{"level":1,"title":"Mean Value Theorem","file":"mean-value-theorem"},{"level":1,"title":"Chain Rule"},{"level":2,"title":"Definition","file":"chain-rule-definition"},{"level":2,"title":"Proof","file":"chain-rule-proof"},{"level":1,"title":"Differentials","file":"differentials"}]
            });

            Response::builder()
                .status(StatusCode::OK)
                .header("Content-Type", "application/json")
                .body(response.to_string())
                .unwrap()
        });

    let note_api =
        warp::path!("note" / String)
            .and(warp::get())
            .then(move |note: String| async move {
                let file_name = format!("{note}.pdf");
                println!("Reading file: {file_name:?}");
                let file = &notes_path.join(file_name);
                let content = std::fs::read(file).unwrap();

                Response::builder()
                    .status(StatusCode::OK)
                    .header("Content-Type", "application/pdf")
                    .body(content)
                    .unwrap()
            });

    let routes = note_api.or(page_api).or(static_files);

    routes
}

async fn start_service(www: &'static str, notes_folder: &'static str, ip: &'static str, port: u16) {
    let routes = get_routes(www, notes_folder);

    let ip = if let Ok(address) = ip.parse::<IpAddr>() {
        address
    } else {
        panic!("Invalid IP");
    };

    warp::serve(routes).run((ip, port)).await;
}
