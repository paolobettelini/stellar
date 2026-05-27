use crate::app::get_page_html;
use crate::app::{SnippetLibraries, SnippetsRenderer};
use leptos::prelude::*;
use leptos_router::components::Redirect;

#[component]
pub fn PageRenderer(
    page: ReadSignal<String>,
    #[prop(optional)] rerender_key: Option<Signal<u64>>,
) -> impl IntoView {
    let once = Resource::new(
        move || {
            (
                page.get(),
                rerender_key
                    .map(|rerender_key| rerender_key.get())
                    .unwrap_or(0),
            )
        },
        |(page, _)| async move { get_page_html(page).await },
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
                            let content = format!(
                                "{content}\n<!-- stellar-rerender:{} -->",
                                rerender_key.map(|rerender_key| rerender_key.get()).unwrap_or(0)
                            );

                            view! {
                                <SnippetsRenderer content />
                            }.into_any()
                        } else {
                            view! {}.into_any()
                        }
                    } else {
                        view! { <Redirect path="/404" /> }.into_any()
                    }
                }
            }}
        </Suspense>
    }
}
