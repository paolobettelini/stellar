use crate::app::PageRenderer;
use leptos::prelude::*;
use leptos_router::hooks::use_params_map;

#[component]
pub fn PagePage() -> impl IntoView {
    let page_sig = RwSignal::new("".to_string());
    let page = page_sig.read_only();

    let params = use_params_map();
    let page_v = params.with(|params| params.get("page").unwrap_or_default());

    page_sig.set(page_v.clone());

    view! {
        <h1>Page ID: {page_v}</h1>
        <hr></hr>
        <PageRenderer page />
    }
}
