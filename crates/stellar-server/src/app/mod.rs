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

    let theme = create_rw_signal(Theme::light());
    provide_context(theme);

    view! {
        <Stylesheet id="leptos" href="/pkg/stellar.css"/>

        // Computer Modern (LaTeX)
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/fonts.css" />

        // sets the document title
        <Title text="Stellar"/>

        // content for this welcome page
        <ThemeProvider theme>
            <GlobalStyle />

            <Router>
                <main>
                    <Routes>
                        <Route path="/" view=HomePage/>
                        <Route path="/course/:course" view=CoursePage/>
                        <Route path="/universe/:universe" view=UniversePage/>
                        <Route path="/search" view=SearchPage/>
                        <Route path="/*any" view=NotFound/>
                    </Routes>
                </main>
            </Router>
        </ThemeProvider>
    }
}
