use leptos::*;
use leptos_router::use_params_map;
use crate::app::{Navbar, PageRenderer, Topbar};

#[component]
pub fn PagePage() -> impl IntoView {
    let page_sig = create_rw_signal("".to_string());
    let page = page_sig.read_only();
    
    let params = use_params_map();
    let page_v = params.with(|params| params.get("page").cloned().unwrap_or_default());

    page_sig.set(page_v.clone());

    view! {
        <h1>Page ID: {page_v}</h1>
        <hr></hr>
        <PageRenderer page />
    }
}
