use crate::app::get_snippet_meta_json;
use crate::app::get_snippet_references;
use crate::app::SnippetLibraries;
use crate::app::SnippetsRenderer;
use leptos::prelude::*;
use leptos_router::hooks::use_params_map;
use serde_json::Value;

#[component]
pub fn SnippetPage() -> impl IntoView {
    let params = use_params_map();
    let snippet = move || params.with(|params| params.get("snippet").unwrap_or_default());
    let content = format!(
        "<stellar-snippet>{}</stellar-snippet>",
        &snippet().to_string()
    );

    let once1 = Resource::new(snippet, get_snippet_meta_json);
    let once2 = Resource::new(snippet, get_snippet_references);

    view! {
        <SnippetLibraries />

        <h1>Snippet ID: {snippet}</h1>

        <Suspense
            fallback=move || view! {
                <p>"Loading..."</p>
            }
        >
            {move || match once1.get() {
                None => view! {}.into_any(),
                Some(res) => {
                    if res.is_err() {
                        return view! { <p>No meta data </p> }.into_any()
                    }

                    let json = res.unwrap();

                    if json.len() == 0 {
                        return view! { <p>No meta data </p> }.into_any()
                    }

                    let json_data: Value = if let Ok(v) = serde_json::from_str(&json){
                        v
                    } else {
                        return view! { <p>Invalid JSON data in meta.json</p> }.into_any()
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
                                                }.into_any()
                                            } else {
                                                view! { }.into_any()
                                            }
                                        })
                                        .collect::<Vec<_>>()}
                                </ul>
                            }.into_any()
                        }
                    }

                    view!{ }.into_any()
                }
            }}
        </Suspense>

        <Suspense
            fallback=move || view! {
                <p>"Loading..."</p>
            }
        >
            {move || match once2.get() {
                None => view! {}.into_any(),
                Some(res) => {
                    if let Ok(Some(references)) = res {
                        view! {
                            <h2>References:</h2>
                            <ul>
                                {references.clone().into_iter()
                                    .map(|id| {
                                        let href = format!("/snippet/{}", &id);
                                        view! {
                                            <li><h2><a href=href>{id}</a></h2></li>
                                        }.into_any()
                                    })
                                    .collect::<Vec<_>>()}
                            </ul>
                        }.into_any()
                    } else {
                        view!{ <p>No references</p> }.into_any()
                    }
                }
            }}
        </Suspense>

        <SnippetsRenderer content />
    }
}
