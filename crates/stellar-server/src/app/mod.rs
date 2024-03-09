use leptos::*;
use leptos_meta::*;
use leptos_router::*;
use thaw::*;

mod components;
mod pages;
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