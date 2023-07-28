use async_std::task::block_on;
use futures::{
    future::FutureExt, // for `.fuse()`
    pin_mut,
    select,
};
use wasm_bindgen::prelude::wasm_bindgen;
mod mandelbrot;
mod teapot;

// web app entry_point
#[wasm_bindgen]
pub async fn main_web() {
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    block_on(async {
        mandelbrot::sketch::run_app().await;
    });
}
