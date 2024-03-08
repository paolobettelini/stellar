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
        <Stylesheet id="leptos" href="/pkg/stellar.css"/>

    //    <!-- Computer Modern (LaTeX) font-->
    // <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/fonts.css">

        // sets the document title
        <Title text="Welcome to Leptoss"/>

        // content for this welcome page
        <ThemeProvider theme>
            <GlobalStyle />

            <Router>
                <main>
                    <Routes>
                        <Route path="/" view=HomePage/>
                        <Route path="/course/:course" view=CoursePage/>
                        <Route path="/*any" view=NotFound/>
                    </Routes>
                </main>
            </Router>
        </ThemeProvider>
    }
}

#[derive(serde::Deserialize)]
struct Course {
    title: String,
    pages: Vec<Page>,
}
#[derive(serde::Deserialize)]
#[serde(untagged)]
enum Page {
    Empty((u8, String)),
    Ref((u8, String, String))
}

#[server]
pub async fn get_course_json(course: String) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    let data = expect_context::<ServerData>();

    let file_name = format!("{course}.json");
    log::info!("Reading file: {file_name:?}"); // debug
    // TODO pre-create path
    let file = &std::path::Path::new(&data.data_folder).join("courses").join(&file_name);
    
    let json = {
        if let Ok(v) = std::fs::read_to_string(file) {
            v
        } else {
            log::warn!("Could not find course: {file_name}");
            panic!("sad");
        }
    };

    Ok(json)
}

#[server]
pub async fn get_page_html(page: String) -> Result<String, ServerFnError> {
    if page.is_empty() {
        return Ok(String::from(""));
    }

    use crate::data::ServerData;
    let data = expect_context::<ServerData>();

    let file_name = format!("{page}.html");
    log::info!("Reading file: {file_name:?}");
    // TODO pre-create path
    let file = &std::path::Path::new(&data.data_folder).join("pages").join(&file_name);
    let content = {
        if let Ok(v) = std::fs::read_to_string(file) {
            v
        } else {
            log::warn!("Could not find page: {file_name}");
            panic!("sad");
        }
    };

    Ok(content)
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
fn Navbar(
    set_page: WriteSignal<String>,
) -> impl IntoView {
    let params = use_params_map();
    let course = move || params.with(|params| params.get("course").cloned().unwrap_or_default());

    let once = create_resource(course, get_course_json);

    view! {
        <div id="navbar">
            <div id="navbar-content">
                <Suspense
                    fallback=move || view! {
                        <Skeleton text=true/>
                        <br></br>
                        <Skeleton text=true/>
                        <br></br>
                        <Skeleton text=true/>
                        <br></br>
                        <Skeleton text=true/>
                        <br></br>
                        <Skeleton text=true/>
                        <br></br>
                        <Skeleton text=true/>
                        <br></br>
                        <Skeleton text=true/>
                    }
                >
                    {move || match once.get() {
                        None => view! {}.into_view(),
                        Some(res) => {
                            let json = res.unwrap();
                            let course: Course = serde_json::from_str(&json).unwrap();

                            // Flag to set the first page
                            let mut first_page_found = false;

                            course.pages.into_iter()
                                .map(|page| {
                                    use crate::app::Page::*;
                                    let (lvl, title, id) = match page {
                                        Empty((lvl, title)) => (lvl, title, None),
                                        Ref((lvl, title, id)) => (lvl, title, Some(id)),
                                    };
                                    let id_is_none = id.is_none();
                                    let lvl_class = format!("nav-title-level-{lvl}");
                                    let id_str = if let Some(ref id) = id {
                                        format!("nav-title-{id}")
                                    } else {
                                        "".to_string()
                                    };

                                    /*if !first_page_found {
                                        if let Some(ref id) = id {
                                            set_page.set(id.to_string());
                                            first_page_found = true;
                                        }
                                    }*/

                                    view! {
                                        <span
                                            class={lvl_class}
                                            class=("empty-nav-title", id_is_none)
                                            on:click=move |_| {
                                                if let Some(id) = &id {
                                                    // Update page
                                                    set_page.set(id.to_string());
                                                }
                                            }
                                            id=id_str
                                            >
                                            {title}
                                        </span>
                                    }
                                })
                                .collect_view()
                        }
                    }}
                </Suspense>
            </div>
        </div>
    }
}

#[component]
fn PageRenderer(
    page: ReadSignal<String>,
) -> impl IntoView {
    let once = create_resource(page, |page| async move { get_page_html(page).await });    

    view! {
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.min.js" />
        <script src="/assets/js/load-pdf.js" />
        <script src="/assets/js/utils.js" />
        <script src="/assets/js/snippet.js" />

        <Suspense
            fallback=move || view! {
                <Skeleton text=true/>
                <br></br>
            }
        >
            {move || match once.get() {
                None => view! {}.into_view(),
                Some(res) => {
                    if let Ok(content) = res {
                        if !content.is_empty() {
                            view! {
                                <div id="inner-content" inner_html=content>
                                </div>
                            }.into_view()
                        } else {
                            view! {}.into_view()    
                        }
                    } else {
                        view! {}.into_view()
                    }
                }
            }}
        </Suspense>

        <h1>"Currenctly rendering page: !"</h1>
        
    }
}

#[component]
fn CoursePage() -> impl IntoView {
    let (page, set_page) = create_signal("".to_string());

    view! {
        <Layout has_sider=true>
            <LayoutSider>
                <Navbar set_page />
            </LayoutSider>
            <Layout>
                <div id="right-side-container">
                    <LayoutHeader>
                        <TopBar />
                    </LayoutHeader>
                    <Layout>
                        <PageRenderer page />
                    </Layout>
                </div>
            </Layout>
        </Layout>
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

#[component]
fn HomePage() -> impl IntoView {
    view! {
        <p>Home page</p>
    }
}