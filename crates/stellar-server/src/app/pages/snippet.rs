use leptos::*;
use leptos_router::use_params_map;

use crate::app::{Navbar, PageRenderer, Topbar};
use crate::app::SnippetsRenderer;
use crate::app::SnippetLibraries;

#[component]
pub fn SnippetPage() -> impl IntoView {
    let params = use_params_map();
    let snippet = move || params.with(|params| params.get("snippet").cloned().unwrap_or_default());

    let content = format!("<stellar-snippet>{}</stellar-snippet>", &snippet().to_string());

    view! {
        <SnippetLibraries />

        <h1>Snippet ID: {snippet}</h1>
        <SnippetsRenderer content />
    }
}