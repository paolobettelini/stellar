use crate::app::PageRenderer;
use leptos::prelude::*;
use leptos_router::hooks::use_params_map;

#[component]
pub fn PagePage() -> impl IntoView {
    let page_sig = RwSignal::new("".to_string());
    let page = page_sig.read_only();

    let params = use_params_map();
    Effect::new(move |_| {
        page_sig.set(params.with(|params| params.get("page").unwrap_or_default()));
    });

    view! {
        <h1>Page ID: {move || page.get()}</h1>
        <hr></hr>
        <PageRenderer page />
    }
}
