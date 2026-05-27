use crate::app::Topbar;
use leptos::prelude::*;

#[component]
pub fn HomePage() -> impl IntoView {
    let title = Signal::derive(|| String::from("Stellar"));

    view! {
        <div class="home-page">
            <div class="home-topbar">
                <Topbar title />
            </div>

            <main class="home-main">
                <section class="home-hero">
                    <div class="home-brand">
                        <img
                            class="home-logo"
                            src="/assets/logo.png"
                            alt="Stellar"
                            width="132"
                            height="132"
                        />
                        <h1>"Stellar"</h1>
                    </div>

                    <p class="home-description">
                        "Agnostic courseware solution enabling the creation of customized courses and notes, structured into "
                        <a href="https://paolobettelini.github.io/stellar/stellar_universes.html" class="hl-universes">"universes"</a>
                        ", "
                        <a href="https://paolobettelini.github.io/stellar/stellar_courses.html" class="hl-courses">"courses"</a>
                        ", "
                        <a href="https://paolobettelini.github.io/stellar/stellar_pages.html" class="hl-pages">"pages"</a>
                        " and "
                        <a href="https://paolobettelini.github.io/stellar/stellar_snippets.html" class="hl-snippets">"snippets"</a>
                        ". Checkout the "
                        <a href="https://paolobettelini.github.io/stellar" class="doc-link" target="_blank">"documentation"</a>
                        "."
                    </p>

                    <a class="home-search-link" href="/search">
                        "Go to Search"
                    </a>
                </section>
            </main>
        </div>
    }
}
