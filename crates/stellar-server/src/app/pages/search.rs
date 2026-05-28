use crate::app::*;

#[derive(Clone, Copy, PartialEq)]
enum QueryType {
    Snippet,
    Page,
    Course,
    Universe,
}

#[component]
pub fn SearchPage() -> impl IntoView {
    const DEFAULT_QUERY: &str = "";

    let title = Signal::derive(|| String::from("Search"));
    let (query, set_query) = signal(DEFAULT_QUERY.to_owned());
    let (query_type, set_query_type) = signal(QueryType::Universe);
    let (regex_enabled, set_regex_enabled) = signal(false);
    let req = Resource::new(
        move || (query.get(), query_type.get(), regex_enabled.get()),
        |(query, query_type, regex_enabled)| async move {
            match query_type {
                QueryType::Snippet => query_snippet(query, regex_enabled).await,
                QueryType::Page => query_page(query, regex_enabled).await,
                QueryType::Course => query_course(query, regex_enabled).await,
                QueryType::Universe => query_universe(query, regex_enabled).await,
            }
        },
    );

    view! {
        <div id="search-container">
            <div class="search-topbar">
                <Topbar title show_search=false />
            </div>

            <section id="search-panel">
                <div class="radio-group" role="radiogroup" aria-label="Search type">
                    <label>
                    <input
                        type="radio"
                        autocomplete="off"
                        name="searchtype"
                        value="snippet"
                        checked=move || query_type() == QueryType::Snippet
                        on:change=move |_| set_query_type.set(QueryType::Snippet)
                        />
                        <span>"Snippets"</span>
                    </label>
                    <label>
                    <input
                        type="radio"
                        autocomplete="off"
                        name="searchtype"
                        value="page"
                        checked=move || query_type() == QueryType::Page
                        on:change=move |_| set_query_type.set(QueryType::Page)
                        />
                        <span>"Pages"</span>
                    </label>
                    <label>
                    <input
                        type="radio"
                        autocomplete="off"
                        name="searchtype"
                        value="course"
                        checked=move || query_type() == QueryType::Course
                        on:change=move |_| set_query_type.set(QueryType::Course)
                        />
                        <span>"Courses"</span>
                    </label>
                    <label>
                    <input
                        type="radio"
                        autocomplete="off"
                        name="searchtype"
                        value="universe"
                        checked=move || query_type() == QueryType::Universe
                        on:change=move |_| set_query_type.set(QueryType::Universe)
                        />
                        <span>"Universes"</span>
                    </label>
                </div>

                <div class="search-input-row">
                    <input
                        type="text"
                        autocomplete="off"
                        on:input=move |e| set_query.set(event_target_value(&e))
                        value=move || query()
                        placeholder=move || {
                            if regex_enabled() {
                                "Regex pattern"
                            } else {
                                "Search by substring"
                            }
                        }
                        id="searchbox"
                    />
                    <label class="search-regex-toggle">
                        <input
                            type="checkbox"
                            autocomplete="off"
                            checked=move || regex_enabled()
                            on:change=move |event| set_regex_enabled.set(event_target_checked(&event))
                        />
                        <span>"Regex"</span>
                    </label>
                </div>
            </section>

            <div id="results">
                <Suspense
                    fallback=move || view! {
                        <div class="stellar-loading-center">
                            <LoadingIndicator />
                        </div>
                    }
                >
                    {move || match req.get() {
                        None => view! {}.into_any(),
                        Some(res) => {
                            let Ok(content) = res else {
                                return view! { <p class="search-status">Search failed</p> }.into_any();
                            };

                            let Ok(results) = serde_json::from_str::<Vec<QueryEntry>>(&content) else {
                                return view! { <p class="search-status">Invalid results</p> }.into_any();
                            };

                            if results.is_empty() {
                                return view! { <p class="search-status">No results</p> }.into_any();
                            }

                            let query_type = match query_type() {
                                QueryType::Snippet => "snippet",
                                QueryType::Page => "page",
                                QueryType::Course => "course",
                                QueryType::Universe => "universe",
                            };

                            view! {
                                <div class="results-list">
                                    {results.into_iter()
                                        .map(|entry| {
                                            let link = format!("/{}/{}", query_type, entry.id);
                                            view! {
                                                <a
                                                    class="result-entry"
                                                    rel="external"
                                                    href=link
                                                >
                                                    <span class="result-kind">{query_type}</span>
                                                    <span class="result-id">{entry.id}</span>
                                                </a>
                                            }
                                        })
                                        .collect_view()}
                                </div>
                            }.into_any()
                        }
                    }}
                </Suspense>
            </div>
        </div>
    }
}
