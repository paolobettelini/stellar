use leptos::*;
use thaw::*;

#[component]
pub fn SnippetsRenderer(content: String) -> impl IntoView {
    view! {
        <div id="inner-content" inner_html=content>
        </div>
    }
}

#[component]
pub fn SnippetLibraries() -> impl IntoView {
    view! {
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.min.js" />
        <script src="/assets/js/load-pdf.js" />
        <script src="/assets/js/utils.js" />
        <script src="/assets/js/snippet.js" />
    }
}