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
        <script type="module">
            import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.min.mjs';
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.mjs';
        </script>
        <script src="/assets/js/load-pdf.js" />
        <script src="/assets/js/utils.js" />
        <script src="/assets/js/snippet.js" />
    }
}