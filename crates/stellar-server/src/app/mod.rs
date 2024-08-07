use leptos::*;
use leptos_meta::*;
use leptos_router::*;
use thaw::*;

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

        // Computer Modern (LaTeX)
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/fonts.css" />

        // sets the document title
        <Title text="Stellar"/>

        <Router>
            <main>
                <Routes>
                    <Route path="/" view=HomePage/>
                    <Route path="/snippet/:snippet" view=SnippetPage/>
                    <Route path="/page/:page" view=PagePage/>
                    <Route path="/course/:course" view=CoursePage/>
                    <Route path="/course/:course/:page" view=CoursePage/>
                    <Route path="/universe/:universe" view=UniversePage/>
                    <Route path="/search" view=SearchPage/>
                    <Route path="/*any" view=NotFound/>
                </Routes>
            </main>
        </Router>
    }
}
