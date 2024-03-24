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
        <h1>Search</h1>

        <label>
            <input
                type="radio"
                autocomplete="off"
                name="searchtype"
                value="snippet"
                on:click=move |_| set_query_type.set(QueryType::Snippet)
                checked/> // default
            "Snippets"
        </label>
        <br />
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
        <br />
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
        <br />
        <label>
            <input
                type="radio"
                autocomplete="off"
                name="searchtype"
                value="universe"
                on:click=move |_| set_query_type.set(QueryType::Universe)
                />
            "Universes"
        </label>

        <br />

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

                        results.into_iter()
                            .map(|entry| {

                                view! {
                                    <a>{entry.id}</a>
                                    <br />
                                }
                            }).collect_view()
                    }
                }}
            </Suspense>
        </div>
    }
}
