use leptos::prelude::*;

#[component]
fn SearchIcon() -> impl IntoView {
    let icon = icondata::ImSearch;
    let view_box = icon.view_box.unwrap_or("0 0 24 24");
    let width = icon.width.unwrap_or("1em");
    let height = icon.height.unwrap_or("1em");
    let fill = icon.fill.unwrap_or("currentColor");

    view! {
        <svg
            aria-hidden="true"
            focusable="false"
            viewBox=view_box
            width=width
            height=height
            fill=fill
            class="not-found-search-icon"
            inner_html=icon.data
        />
    }
}

#[component]
pub fn NotFound() -> impl IntoView {
    // set an HTTP status code 404
    // this is feature gated because it can only be done during
    // initial server-side rendering
    // if you navigate to the 404 page subsequently, the status
    // code will not be set because there is not a new HTTP request
    // to the server
    #[cfg(feature = "ssr")]
    {
        // this can be done inline because it's synchronous
        // if it were async, we'd use a server function
        let resp = expect_context::<leptos_actix::ResponseOptions>();
        resp.set_status(actix_web::http::StatusCode::NOT_FOUND);
    }

    view! {
        <main id="not-found-page">
            <section class="not-found-content">
                <h1>"ERROR 404"</h1>
                <p>"We couldn't find the page you were looking for"</p>

                <a class="not-found-search-button" href="/search">
                    <SearchIcon />
                    <span>"Go to Search"</span>
                </a>

                <img
                    class="not-found-logo"
                    src="/assets/logo.png"
                    alt="Stellar"
                    width="112"
                    height="112"
                />
            </section>
        </main>
    }
}
