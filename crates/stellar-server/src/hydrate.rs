#![cfg(feature = "hydrate")]

use wasm_bindgen::prelude::wasm_bindgen;
use crate::App;

#[wasm_bindgen]
pub fn hydrate() {
    console_error_panic_hook::set_once();
    leptos::mount_to_body(App);
}