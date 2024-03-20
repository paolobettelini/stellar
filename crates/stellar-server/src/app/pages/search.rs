use leptos::*;

#[component]
pub fn SearchPage() -> impl IntoView {
    view! {
        <h1>Search</h1>

        <label>
            <input
                type="radio"
                autocomplete="off"
                name="searchtype"
                value="snippet"
                on:click=move |_| {}
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
                on:click=move |_| {}
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
                on:click=move |_| {}
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
                on:click=move |_| {}
                />
            "Universes"
        </label>
    
        <br />
    
        <input type="text" autocomplete="off" id="searchbox" />
        <div id="results" />
    }

}