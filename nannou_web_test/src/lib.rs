use async_std::task::block_on;
use wasm_bindgen::prelude::wasm_bindgen;
use futures::{
    future::FutureExt, // for `.fuse()`
    pin_mut,
    select,
};
use sketch::*;

mod sketch;

// web app entry_point
#[wasm_bindgen]
pub async fn main_web(container: String) {
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    let t1 = run_app(String::from("container1")).fuse();
    let t2 = run_app(String::from("container2")).fuse();

    pin_mut!(t1, t2);

    select! {
        () = t1 => {},
        () = t2 => {},
    }
}
