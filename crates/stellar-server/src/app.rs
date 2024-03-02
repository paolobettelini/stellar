use leptos::*;
use leptos_meta::*;
use leptos_router::*;
use thaw::*;

#[component]
pub fn App() -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context();

    let theme = create_rw_signal(Theme::light());
    provide_context(theme);

    view! {
        // injects a stylesheet into the document <head>
        // id=leptos means cargo-leptos will hot-reload this stylesheet
        <Stylesheet id="leptos" href="/pkg/stellar.css"/>

        // sets the document title
        <Title text="Welcome to Leptoss"/>

        // content for this welcome page
        <ThemeProvider theme>
            <GlobalStyle />

            <Router>
                <main>
                    <Routes>
                        <Route path="" view=HomePage/>
                        <Route path="/*any" view=NotFound/>
                    </Routes>
                </main>
            </Router>
        </ThemeProvider>
    }
}

#[server]
pub async fn do_smth() -> Result<String, ServerFnError> {
    Ok(String::from("HELLOOO"))
}

#[component]
fn TopBar() -> impl IntoView {
    let theme = use_context::<RwSignal<Theme>>().unwrap();
    let (themes_hidden, set_themes_hidden) = create_signal(true);

    // https://carlosted.github.io/icondata/

    view! {
        <div id="top-bar">
            <div id="top-bar-icons">
                <i>
                    <Icon icon=icondata::FaBarsSolid/>
                </i>
                <i id="topbar-search">
                    <Icon icon=icondata::ImSearch/>
                </i>
                <i
                    id="topbar-theme"
                    on:click=move |_| {
                        set_themes_hidden.update(|v| *v = !*v)
                    }
                >
                    <Icon icon=icondata::FaPaintbrushSolid/>
                </i>
                <ul
                    id="theme-list"
                    style:display=move || if themes_hidden() { "none" } else { "block" }
                >
                    <Button on_click=move |_| theme.set(Theme::light())>"Light"</Button>
                    <Button on_click=move |_| theme.set(Theme::dark())>"Dark"</Button>
                </ul>
            </div>

            <div id="top-bar-title">Title</div>
        </div>
    }
}

#[component]
fn SideBar() -> impl IntoView {
    view! {
        <div id="side-bar">
            "Hello"
        </div>
    }
}

#[component]
fn PageRenderer() -> impl IntoView {
    view! {
        <h1>"Welcome to Leptos!"</h1>
    }
}

#[component]
fn HomePage() -> impl IntoView {
    let once = create_resource(|| (), |_| async move { do_smth().await });

    view! {
        <Layout has_sider=true>
            <LayoutSider>
                <SideBar />
            </LayoutSider>
            <Layout>
                <div id="right-side-container">
                    <LayoutHeader>
                        <TopBar />
                    </LayoutHeader>
                    <Layout>
                        <PageRenderer />
                    </Layout>
                </div>
            </Layout>
        </Layout>

        /*<Suspense
            fallback=move || view! {
                <Skeleton width="10%" text=true/>
                <br></br>
                <Skeleton width="10%" text=true/>
                <br></br>
                <Skeleton width="10%" text=true/>
                <br></br>
                <Skeleton width="10%" text=true/>
                <br></br>
                <Skeleton width="10%" text=true/>
                <br></br>
                <Skeleton width="10%" text=true/>
                <br></br>
                <Skeleton width="10%" text=true/>
            }
        >
            {move || match once.get() {
                None => view! {}.into_view(),
                Some(data) => view! { {data} }.into_view()
            }}
        </Suspense>*/
    }
}

/// 404 - Not Found
#[component]
fn NotFound() -> impl IntoView {
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
        <h1>"Not Found"</h1>
    }
}