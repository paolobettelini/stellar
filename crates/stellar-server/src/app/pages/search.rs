use crate::app::*;
use leptos::*;

#[derive(Clone, PartialEq)]
enum QueryType {
    Snippet,
    Page,
    Course,
    Universe,
}

#[component]
pub fn SearchPage() -> impl IntoView {
    const DEFAULT_QUERY: &str = ".*";

    let (query, set_query) = create_signal(DEFAULT_QUERY.to_owned());
    let (query_type, set_query_type) = create_signal(QueryType::Universe);
    let req = create_resource(
        move || (query.get(), query_type.get()),
        |(query, query_type)| async move {
            match query_type {
                QueryType::Snippet => query_snippet(query).await,
                QueryType::Page => query_page(query).await,
                QueryType::Course => query_course(query).await,
                QueryType::Universe => query_universe(query).await,
            }
        }
    );

    view! {
        <div id="search-container">
            <h1>Search</h1>

            <div class="radio-group">
                <label>
                    <input
                        type="radio"
                        autocomplete="off"
                        name="searchtype"
                        value="snippet"
                        on:click=move |_| set_query_type.set(QueryType::Snippet)
                        />
                    "Snippets"
                </label>
                <label>
                    <input
                        type="radio"
                        autocomplete="off"
                        name="searchtype"
                        value="page"
                        on:click=move |_| set_query_type.set(QueryType::Page)
                        />
                    "Pages"
                </label>
                <label>
                    <input
                        type="radio"
                        autocomplete="off"
                        name="searchtype"
                        value="course"
                        on:click=move |_| set_query_type.set(QueryType::Course)
                        />
                    "Courses"
                </label>
                <label>
                    <input
                        type="radio"
                        autocomplete="off"
                        name="searchtype"
                        value="universe"
                        on:click=move |_| set_query_type.set(QueryType::Universe)
                        checked /> // default
                    "Universes"
                </label>
            </div>

            <input
                type="text"
                autocomplete="off"
                on:input=move |e| set_query.set(event_target_value(&e))
                value=|| DEFAULT_QUERY.to_owned()
                id="searchbox"
            />
            <div id="results">
                <Suspense
                    fallback=move || view! { <p>Loading...</p> }
                >
                    {move || match req.get() {
                        None => view! {}.into_view(),
                        Some(res) => {
                            let content = res.unwrap();
                            let results = serde_json::from_str::<Vec<QueryEntry>>(&content).unwrap();
                            let query_type = match query_type() {
                                QueryType::Snippet => "snippet",
                                QueryType::Page => "page",
                                QueryType::Course => "course",
                                QueryType::Universe => "universe",
                            };
                            
                            results.into_iter()
                                .map(|entry| {
                                    let link = format!("/{}/{}", query_type, entry.id);
                                    view! {
                                        <a
                                            rel="external"
                                            href=link
                                        >{entry.id}</a>
                                    }}).collect_view()
                        }
                    }}
                </Suspense>
            </div>
        </div>
    }
}
