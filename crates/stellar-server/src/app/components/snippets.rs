use crate::app::base_url;
use leptos::prelude::*;

#[component]
pub fn SnippetsRenderer(content: String) -> impl IntoView {
    view! {
        <div id="inner-content" inner_html=content>
        </div>
    }
}

#[component]
pub fn SnippetLibraries() -> impl IntoView {
    let filter = base_url("/assets/js/filter.js");
    let pdf = base_url("/assets/js/load-pdf.js");
    let utils = base_url("/assets/js/utils.js");
    let snippet = base_url("/assets/js/snippet.js");
    view! {
        <script type="module">
            {r#"
            if (!window.stellarPdfJsPromise) {
                window.stellarPdfJsPromise = import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.min.mjs')
                    .then((pdfjsLib) => {
                        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.mjs';
                        window.pdfjsLib = pdfjsLib;
                        return pdfjsLib;
                    });
            }
            "#}
        </script>
        <script src=filter />
        <script src=pdf />
        <script src=utils />
        <script src=snippet />
    }
}
