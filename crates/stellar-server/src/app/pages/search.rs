use crate::app::query_snippet;
use leptos::*;

#[component]
pub fn SearchPage() -> impl IntoView {
    let (query, set_query) = create_signal(String::from(".*"));

    let results = async { query_snippet(query()).await.unwrap() };

    view! {
        <h1>Search</h1>

        <label>
            <input
                type="radio"
                autocomplete="off"
                name="searchtype"
                value="snippet"
                on:click=move |_| set_query.set(query())
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
                on:click=move |_| set_query.set(query())
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
                on:click=move |_| set_query.set(query())
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
                on:click=move |_| set_query.set(query())
                />
            "Universes"
        </label>

        <br />

        <input
            type="text"
            autocomplete="off"
            on:input=move |e| set_query.set(event_target_value(&e))
            id="searchbox"
        />
        <div id="results">

        </div>
    }
}
