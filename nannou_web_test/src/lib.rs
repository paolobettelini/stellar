use async_std::task::block_on;
use wasm_bindgen::prelude::wasm_bindgen;

use sketch::*;

mod sketch;

// web app entry_point
#[wasm_bindgen]
pub async fn main_web(width: u32, height: u32) {
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    block_on(async move {
        run_app(Model {}).await;
    });
}
