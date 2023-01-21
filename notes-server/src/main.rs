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

            let response = json! ({
                "notes": [
                    { "name": "definition-tangent" },
                    { "name": "definition-tangent-subtangent" },
                    { "name": "definition-derivative" },
                    { "name": "interpretation-rate-of-growth" },
                    { "name": "interpretation-first-derivative-test" },
                    { "name": "interpretation-concavity" },
                    { "name": "interpretation-second-derivative-test" },
                    { "name": "absolute-extrema" },
                    { "name": "rules-for-differentiation" },
                    { "name": "hopital-rule" },
                    { "name": "intermediate-value-theorem" },
                    { "name": "bolzano-theorem" },
                    { "name": "weierstrass-theorem" },
                    { "name": "rolle-theorem" },
                    { "name": "mean-value-theorem" },
                    { "name": "chain-rule-definition" },
                    { "name": "chain-rule-proof" },
                    { "name": "differentials" }
                ]
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
