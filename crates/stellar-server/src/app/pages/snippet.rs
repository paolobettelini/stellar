use crate::app::{
    SnippetLibraries, SnippetsRenderer, Topbar, get_snippet_exists, get_snippet_meta_json,
    get_snippet_references,
};
use leptos::prelude::*;
use leptos_router::components::Redirect;
use leptos_router::hooks::use_params_map;
use serde_json::Value;

#[component]
pub fn SnippetPage() -> impl IntoView {
    let params = use_params_map();
    let snippet =
        Signal::derive(move || params.with(|params| params.get("snippet").unwrap_or_default()));
    let title = Signal::derive(|| String::from("Snippet"));
    let exists = Resource::new(move || snippet.get(), get_snippet_exists);
    let meta = Resource::new(move || snippet.get(), get_snippet_meta_json);
    let references = Resource::new(move || snippet.get(), get_snippet_references);
    let default_params = RwSignal::new(None::<String>);
    let params_draft = RwSignal::new(String::new());
    let applied_params = RwSignal::new(None::<String>);
    let snippet_rerender_key = RwSignal::new(0_u64);
    let content = Signal::derive(move || {
        let snippet = html_text_escape(&snippet.get());
        let rerender_key = snippet_rerender_key.get();

        if let Some(params) = applied_params.get() {
            format!(
                r#"<stellar-snippet params="{}">{}</stellar-snippet><!-- stellar-rerender:{} -->"#,
                html_attr_escape(&params),
                snippet,
                rerender_key
            )
        } else {
            format!(
                "<stellar-snippet>{snippet}</stellar-snippet><!-- stellar-rerender:{rerender_key} -->"
            )
        }
    });

    let theme_change_handle = leptos::leptos_dom::helpers::window_event_listener_untyped(
        "stellar-theme-change",
        move |_| {
            snippet_rerender_key.update(|key| *key += 1);
        },
    );
    on_cleanup(move || theme_change_handle.remove());

    Effect::new(move |_| {
        let Some(Ok(json)) = meta.get() else {
            return;
        };

        let params = default_params_from_json(&json);
        params_draft.set(params.clone().unwrap_or_default());
        applied_params.set(params.clone());
        default_params.set(params);
    });

    view! {
        <SnippetLibraries />

        <div id="snippet-container">
            <Suspense fallback=move || view! {}>
                {move || match exists.get() {
                    Some(Ok(false)) | Some(Err(_)) => view! { <Redirect path="/404" /> }.into_any(),
                    _ => view! {}.into_any(),
                }}
            </Suspense>

            <div class="snippet-topbar">
                <Topbar title />
            </div>

            <main id="snippet-page">
                <section id="snippet-header">
                    <p class="snippet-id">{move || snippet.get()}</p>
                </section>

                <section class="snippet-info-stack">
                    <div class="snippet-panel">
                        <header class="snippet-panel-header">
                            <h2>"Metadata"</h2>
                        </header>

                        <Suspense fallback=move || view! { <p class="snippet-status">"Loading..."</p> }>
                            {move || match meta.get() {
                                None => view! {}.into_any(),
                                Some(Err(_)) => view! { <p class="snippet-status">"Could not load metadata"</p> }.into_any(),
                                Some(Ok(json)) => metadata_table(json),
                            }}
                        </Suspense>
                    </div>

                    <div class="snippet-panel">
                        <header class="snippet-panel-header">
                            <h2>"References"</h2>
                            <a
                                class="snippet-tree-link"
                                href=move || format!("/reftree/{}", snippet.get())
                            >
                                "Show tree"
                            </a>
                        </header>

                        <Suspense fallback=move || view! { <p class="snippet-status">"Loading..."</p> }>
                            {move || match references.get() {
                                None => view! {}.into_any(),
                                Some(Ok(Some(references))) if !references.is_empty() => view! {
                                    <div class="snippet-reference-list">
                                        {references.into_iter()
                                            .map(|id| {
                                                let href = format!("/snippet/{id}");
                                                view! {
                                                    <a class="snippet-reference" href=href>
                                                        <span>{id}</span>
                                                    </a>
                                                }
                                            })
                                            .collect_view()}
                                    </div>
                                }.into_any(),
                                Some(Ok(_)) => view! { <p class="snippet-status">"No references"</p> }.into_any(),
                                Some(Err(_)) => view! { <p class="snippet-status">"Could not load references"</p> }.into_any(),
                            }}
                        </Suspense>
                    </div>
                </section>

                <section id="snippet-rendered-free">
                    {move || default_params.get().map(|default_params| {
                        view! {
                            <div class="snippet-params-row">
                                <label class="snippet-param-field">
                                    <span>"Default parameters"</span>
                                    <input
                                        type="text"
                                        value=move || params_draft.get()
                                        placeholder=default_params
                                        on:input=move |event| {
                                            params_draft.set(event_target_value(&event));
                                        }
                                    />
                                </label>
                                <button
                                    type="button"
                                    on:click=move |_| {
                                        applied_params.set(Some(params_draft.get()));
                                        snippet_rerender_key.update(|key| *key += 1);
                                    }
                                >
                                    "Reload"
                                </button>
                            </div>
                        }
                    })}
                    {move || view! { <SnippetsRenderer content=content.get() /> }}
                </section>
            </main>
        </div>
    }
}

fn default_params_from_json(json: &str) -> Option<String> {
    let value = serde_json::from_str::<Value>(json).ok()?;
    let default_params = value.get("default-params")?;

    match default_params {
        Value::String(value) => Some(value.clone()),
        Value::Null => None,
        value => Some(json_value_label(value)),
    }
}

fn metadata_table(json: String) -> AnyView {
    if json.trim().is_empty() {
        return view! { <p class="snippet-status">"No metadata"</p> }.into_any();
    }

    let Ok(value) = serde_json::from_str::<Value>(&json) else {
        return view! { <p class="snippet-status">"Invalid metadata JSON"</p> }.into_any();
    };

    let Value::Object(entries) = value else {
        return view! {
            <table class="snippet-meta-table">
                <tbody>
                    <tr>
                        <th>"value"</th>
                        <td>{json_value_label(&value)}</td>
                    </tr>
                </tbody>
            </table>
        }
        .into_any();
    };

    if entries.is_empty() {
        return view! { <p class="snippet-status">"No metadata"</p> }.into_any();
    }

    view! {
        <table class="snippet-meta-table">
            <tbody>
                {entries.into_iter()
                    .map(|(key, value)| {
                        view! {
                            <tr>
                                <th>{key}</th>
                                <td>{json_value_label(&value)}</td>
                            </tr>
                        }
                    })
                    .collect_view()}
            </tbody>
        </table>
    }
    .into_any()
}

fn html_attr_escape(value: &str) -> String {
    value
        .replace('&', "&amp;")
        .replace('"', "&quot;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
}

fn html_text_escape(value: &str) -> String {
    value
        .replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
}

fn json_value_label(value: &Value) -> String {
    match value {
        Value::Null => String::from("null"),
        Value::Bool(value) => value.to_string(),
        Value::Number(value) => value.to_string(),
        Value::String(value) => value.clone(),
        Value::Array(_) | Value::Object(_) => {
            serde_json::to_string_pretty(value).unwrap_or_else(|_| value.to_string())
        }
    }
}
