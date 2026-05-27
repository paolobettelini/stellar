use leptos::prelude::*;
use leptos_meta::{Meta, Stylesheet, Title, provide_meta_context};
use leptos_router::{
    components::{Route, Router, Routes},
    path,
};

mod api;
mod components;
mod pages;

pub use api::*;
pub use components::*;
pub use pages::*;

#[component]
pub fn App() -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context();

    view! {
        <Stylesheet id="leptos" href="/pkg/stellar.css"/>
        <script src="/assets/js/init.js" />

        // Meta
        <Meta property="og:site_name" content="Stellar" />
        <Meta property="og:title" content="Stellar" />
        <Meta property="og:description" content="Courseware website" />

        <Meta property="og:type" content="website" />
        <Meta property="og:image:type" content="image/png" />
        <Meta property="og:image:width" content="600" />
        <Meta property="og:image:height" content="600" />

        // Computer Modern (LaTeX)
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/fonts.css" />

        <Title text="Stellar"/>

        <Router>
            <main>
                <Routes fallback=|| view! { <NotFound/> }>
                    <Route path=path!("") view=HomePage/>
                    <Route path=path!("snippet/:snippet") view=SnippetPage/>
                    <Route path=path!("page/:page") view=PagePage/>
                    <Route path=path!("course/:course") view=CoursePage/>
                    <Route path=path!("course/:course/:page") view=CoursePage/>
                    <Route path=path!("universe/:universe") view=UniversePage/>
                    <Route path=path!("edit-universe/:universe") view=EditUniversePage/>
                    <Route path=path!("search") view=SearchPage/>
                    <Route path=path!("404") view=NotFound/>
                </Routes>
            </main>
        </Router>
    }
}
