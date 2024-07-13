use leptos::*;
use leptos_router::*;
use thaw::*;
use wasm_bindgen::prelude::*;

use crate::app::get_course_json;

#[derive(serde::Deserialize)]
struct Course {
    title: String,
    pages: Vec<Page>,
}

#[derive(serde::Deserialize)]
#[serde(untagged)]
enum Page {
    Empty((u8, String)),
    Ref((u8, String, String)),
}

#[wasm_bindgen(inline_js = r#"
export function getPageWidth() {
    return window.innerWidth;
}
"#)]
extern "C" {
    fn getPageWidth() -> i32;
}

#[component]
pub fn Navbar(page_sig: RwSignal<String>, set_title: WriteSignal<String>, hidden: ReadSignal<bool>) -> impl IntoView {
    let params = use_params_map();
    let course = move || params.with(|params| params.get("course").cloned().unwrap_or_default());
    let page = move || params.with(|params| params.get("page").cloned());

    let once = create_resource(course, get_course_json);

    // TODO: show hamburger only if an optional signal is passed

    // Render parameter specified page
    if let Some(v) = page() {
        page_sig.set(v);
    }

    // Render first page of the course logic
    let (first_page, set_first_page) = create_signal(None::<String>);
    create_effect(move |_| {
        if let Some(id) = first_page() {
            page_sig.set(id.clone());
        }
    });

    let (full_navbar, set_full_navbar) = create_signal(true);
    // If the navbar is set to be shown, set it to full mode (for small screens)
    create_effect(move |_| {
        let _ = hidden();
        if getPageWidth() < 768 { // ??? I have to click the hamburger two times?
            set_full_navbar.set(true);
        }
    });

    view! {
        <div id="navbar" class:hidden=move || hidden() class:full=move || full_navbar()>
            <img style="padding-left: 10px; padding-top: 10px" src="/assets/logo.png" width="64px" height="64px" />
            <div id="navbar-content">
                <Suspense
                    fallback=move || view! {
                        <Skeleton repeat=10 text=true/>
                        <br></br>
                    }
                >
                    {move || match once.get() {
                        None => view! {}.into_view(),
                        Some(res) => {
                            let json = res.unwrap();
                            let course: Course = serde_json::from_str(&json).unwrap();

                            set_title.set(course.title);

                            course.pages.into_iter()
                                .map(|page| {
                                    let (lvl, title, id) = match page {
                                        Page::Empty((lvl, title)) => (lvl, title, None),
                                        Page::Ref((lvl, title, id)) => (lvl, title, Some(id)),
                                    };
                                    let id_is_none = id.is_none();
                                    let lvl_class = format!("nav-title-level-{lvl}");
                                    let id_str = if let Some(ref id) = id {
                                        format!("nav-title-{id}")
                                    } else {
                                        "".to_string()
                                    };
                                    let id_clone = id.clone();
                                    let id_clone2 = id.clone();

                                    // Render first page
                                    if first_page.get_untracked().is_none() {
                                        if let Some(id) = id_clone2.clone() {
                                            set_first_page.set(Some(id.to_string()));
                                        }
                                    }

                                    view! {
                                        <span
                                            class="nav-title"
                                            class={lvl_class}
                                            class=("empty-nav-title", id_is_none)
                                            class=("active", move || {
                                                if let Some(id) = id_clone.clone() {
                                                    return id == page_sig()
                                                }
                                                return false;
                                            })
                                            on:click=move |_| {
                                                if let Some(id) = &id {
                                                    // Update page
                                                    page_sig.set(id.to_string());
                                                }

                                                // If the screen is small close full navbar
                                                if getPageWidth() <= 768 {
                                                    set_full_navbar.set(false)
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
