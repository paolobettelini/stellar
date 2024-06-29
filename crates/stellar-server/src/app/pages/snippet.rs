use leptos::*;
use leptos_router::use_params_map;
use thaw::Skeleton;
use serde_json::Value;
use crate::app::{Navbar, PageRenderer, Topbar};
use crate::app::SnippetsRenderer;
use crate::app::SnippetLibraries;
use crate::app::get_snippet_meta_json;

#[component]
pub fn SnippetPage() -> impl IntoView {
    let params = use_params_map();
    let snippet = move || params.with(|params| params.get("snippet").cloned().unwrap_or_default());
    let content = format!("<stellar-snippet>{}</stellar-snippet>", &snippet().to_string());

    let once = create_resource(snippet, get_snippet_meta_json);

    // TODO: prova a togliere il setTimeout

    view! {
        <SnippetLibraries />

        <h1>Snippet ID: {snippet}</h1>

        <Suspense
            fallback=move || view! {
                <Skeleton text=true/>
            }
        >
            {move || match once.get() {
                None => view! {}.into_view(),
                Some(res) => {
                    if res.is_err() {
                        return view! { <p>No meta data </p> }.into_view()
                    }

                    let json = res.unwrap();

                    if json.len() == 0 {
                        return view! { <p>No meta data </p> }.into_view()
                    }

                    let json_data: Value = if let Ok(v) = serde_json::from_str(&json){
                        v
                    } else {
                        return view! { <p>Invalid JSON data in meta.json</p> }.into_view()
                    };
                    
                    if let Some(generalizations) = json_data.get("generalizations") {
                        if let Value::Array(array) = generalizations {
                            return view! {
                                <h2>Generalizations:</h2>
                                <ul>
                                    {array.clone().into_iter()
                                        .map(|n| {
                                            if let Value::String(id) = n {
                                                let href = format!("/snippet/{}", &id);
                                                view! {
                                                    <li><h2><a href=href>{id}</a></h2></li>
                                                }.into_view()
                                            } else {
                                                view! { }.into_view()
                                            }
                                        })
                                        .collect::<Vec<_>>()}
                                </ul>
                            }.into_view()
                        }
                    }

                    view!{ }.into_view()
                }
            }}
        </Suspense>

        <SnippetsRenderer content />
    }
}