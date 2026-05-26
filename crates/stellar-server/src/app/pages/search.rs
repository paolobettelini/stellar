use crate::app::*;
use leptos::prelude::*;

#[derive(Clone, Copy, PartialEq)]
enum QueryType {
    Snippet,
    Page,
    Course,
    Universe,
}

#[component]
pub fn SearchPage() -> impl IntoView {
    const DEFAULT_QUERY: &str = ".*";

    let (query, set_query) = signal(DEFAULT_QUERY.to_owned());
    let (query_type, set_query_type) = signal(QueryType::Universe);
    let req = Resource::new(
        move || (query.get(), query_type.get()),
        |(query, query_type)| async move {
            match query_type {
                QueryType::Snippet => query_snippet(query).await,
                QueryType::Page => query_page(query).await,
                QueryType::Course => query_course(query).await,
                QueryType::Universe => query_universe(query).await,
            }
        },
    );

    view! {
        <div id="search-container">
            <section id="search-panel">
                <h1>Search</h1>

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

                <input
                    type="text"
                    autocomplete="off"
                    on:input=move |e| set_query.set(event_target_value(&e))
                    value=|| DEFAULT_QUERY.to_owned()
                    id="searchbox"
                />
            </section>

            <div id="results">
                <Suspense
                    fallback=move || view! { <p class="search-status">Loading...</p> }
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
