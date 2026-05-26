use crate::app::get_page_html;
use crate::app::{SnippetLibraries, SnippetsRenderer};
use leptos::prelude::*;

#[component]
pub fn PageRenderer(page: ReadSignal<String>) -> impl IntoView {
    let once = Resource::new(
        move || page.get(),
        |page| async move { get_page_html(page).await },
    );

    view! {
        <SnippetLibraries />

        <Suspense
            fallback=move || view! {
                <p>"Loading..."</p>
                <br></br>
            }
        >
            {move || match once.get() {
                None => view! {}.into_any(),
                Some(res) => {
                    if let Ok(content) = res {
                        if !content.is_empty() {
                            view! {
                                <SnippetsRenderer content />
                            }.into_any()
                        } else {
                            view! {}.into_any()
                        }
                    } else {
                        view! {}.into_any()
                    }
                }
            }}
        </Suspense>
    }
}
