use leptos::*;
use thaw::*;

use crate::app::get_page_html;
use crate::app::{SnippetsRenderer, SnippetLibraries};

#[component]
pub fn PageRenderer(page: ReadSignal<String>) -> impl IntoView {
    let once = create_resource(page, |page| async move { get_page_html(page).await });

    view! {
        <SnippetLibraries />

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
                                <SnippetsRenderer content />
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
