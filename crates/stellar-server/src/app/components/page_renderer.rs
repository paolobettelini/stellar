use leptos::*;

use thaw::*;

use crate::app::get_page_html;

#[component]
pub fn PageRenderer(page: ReadSignal<String>) -> impl IntoView {
    let once = create_resource(page, |page| async move { get_page_html(page).await });

    view! {
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.min.js" />
        <script src="/assets/js/load-pdf.js" />
        <script src="/assets/js/utils.js" />
        <script src="/assets/js/snippet.js" />

        <Suspense
            fallback=move || view! {
                <Skeleton text=true/>
                <br></br>
            }
        >
            {move || match once.get() {
                None => view! {}.into_view(),
                Some(res) => {
                    if let Ok(content) = res {
                        if !content.is_empty() {
                            view! {
                                <div id="inner-content" inner_html=content>
                                </div>
                            }.into_view()
                        } else {
                            view! {}.into_view()
                        }
                    } else {
                        view! {}.into_view()
                    }
                }
            }}
        </Suspense>
    }
}
