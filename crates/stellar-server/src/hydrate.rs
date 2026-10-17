#![cfg(feature = "hydrate")]

use crate::app::App;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen(inline_js = r#"
export function stellarBasePath() {
    return document.querySelector('meta[name="stellar-base-path"]')?.content || '';
}
"#)]
extern "C" {
    fn stellarBasePath() -> String;
}

#[wasm_bindgen]
pub fn hydrate() {
    console_error_panic_hook::set_once();
    let base_path = stellarBasePath();
    leptos::server_fn::client::set_server_url(Box::leak(base_path.clone().into_boxed_str()));
    leptos::mount::hydrate_body(move || leptos::view! { <App base_path=base_path.clone()/> });
}
