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
                        <Route path="/" view=HomePage/>
                        <Route path="/*any" view=NotFound/>
                    </Routes>
                </main>
            </Router>
        </ThemeProvider>
    }
}

#[server]
pub async fn do_smth() -> Result<String, ServerFnError> {
    std::thread::sleep(std::time::Duration::from_secs(2));
    Ok(String::from("HELLOOO"))
}

/// Renders the home page of your application.
#[component]
fn HomePage() -> impl IntoView {
    let theme = use_context::<RwSignal<Theme>>().unwrap();
    let once = create_resource(|| (), |_| async move { do_smth().await });

    view! {
        <h1>"Welcome to Leptos!"</h1>

        <Card>
            <Space>
                <Button on_click=move |_| theme.set(Theme::light())>"Light"</Button>
                <Button on_click=move |_| theme.set(Theme::dark())>"Dark"</Button>
            </Space>
        </Card>

        <Suspense
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
        </Suspense>
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