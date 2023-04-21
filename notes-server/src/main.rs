mod args;
mod handler;

use args::*;

#[macro_use]
extern crate lazy_static;

lazy_static! {
    pub static ref CONFIG: Args = Args::parse();
}

#[tokio::main]
async fn main() {
    let routes = handler::get_routes(
        &CONFIG.www,
        &CONFIG.snippets,
        &CONFIG.pages,
        &CONFIG.courses,
    );

    warp::serve(routes).run((CONFIG.address, CONFIG.port)).await;
}