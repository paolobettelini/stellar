use leptos::prelude::*;
use leptos_router::{NavigateOptions, components::Redirect, hooks::use_navigate};
use wasm_bindgen::prelude::*;

use crate::app::{LoadingIndicator, get_course_json};

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
pub fn Navbar(
    page_sig: RwSignal<String>,
    course: Signal<String>,
    route_page: Signal<Option<String>>,
    set_title: WriteSignal<String>,
    hidden: ReadSignal<bool>,
) -> impl IntoView {
    let navigate = use_navigate();
    let navigate_first_page = navigate.clone();
    let once = Resource::new(move || course.get(), get_course_json);

    Effect::new(move |_| {
        if let Some(page) = route_page.get().filter(|page| !page.trim().is_empty()) {
            page_sig.set(page);
        }
    });

    Effect::new(move |_| {
        let Some(Ok(json)) = once.get() else {
            return;
        };
        let Ok(course_data) = serde_json::from_str::<Course>(&json) else {
            return;
        };

        set_title.set(course_data.title.clone());

        if route_page
            .get()
            .filter(|page| !page.trim().is_empty())
            .is_none()
        {
            if let Some(first_page) = first_content_page(&course_data) {
                page_sig.set(first_page.clone());
                navigate_first_page(
                    &format!("/course/{}/{}", course.get(), first_page),
                    NavigateOptions {
                        replace: true,
                        ..Default::default()
                    },
                );
            }
        }
    });

    let (full_navbar, set_full_navbar) = signal(true);
    // If the navbar is set to be shown, set it to full mode (for small screens)
    Effect::new(move |_| {
        let _ = hidden();
        if getPageWidth() < 768 {
            // ??? I have to click the hamburger two times?
            set_full_navbar.set(true);
        }
    });

    view! {
        <div id="navbar" class:hidden=move || hidden() class:full=move || full_navbar()>
            <a href="/">
                <img style="padding-left: 10px; padding-top: 10px" src="/assets/logo.png" width="64px" height="64px" alt="Home" />
            </a>
            <div id="navbar-content">
                <Suspense
                    fallback=move || view! {
                        <LoadingIndicator />
                    }
                >
                    {move || match once.get() {
                        None => view! {}.into_any(),
                        Some(Err(_)) => view! { <Redirect path="/404" /> }.into_any(),
                        Some(Ok(json)) => {
                            let Ok(course_data) = serde_json::from_str::<Course>(&json) else {
                                return view! { <Redirect path="/404" /> }.into_any();
                            };
                            let course_id = course.get();

                            course_data.pages.into_iter()
                                .map(|page| {
                                    let (lvl, title, id) = match page {
                                        Page::Empty((lvl, title)) => (lvl, title, None),
                                        Page::Ref((lvl, title, id)) => (lvl, title, Some(id)),
                                    };
                                    let id_is_none = id.is_none();
                                    let lvl_class = format!("nav-title-level-{lvl}");
                                    let id_str = if let Some(id) = id.as_ref() {
                                        format!("nav-title-{id}")
                                    } else {
                                        "".to_string()
                                    };
                                    let href = id
                                        .as_ref()
                                        .map(|id| format!("/course/{course_id}/{id}"))
                                        .unwrap_or_else(|| String::from("#"));
                                    let id_clone = id.clone();
                                    let href_clone = href.clone();
                                    let navigate = navigate.clone();

                                    view! {
                                        <a
                                            class=format!("nav-title {lvl_class}")
                                            class=("empty-nav-title", id_is_none)
                                            class=("active", move || {
                                                if let Some(id) = id_clone.clone() {
                                                    return id == page_sig()
                                                }
                                                return false;
                                            })
                                            on:click=move |event| {
                                                event.prevent_default();

                                                if let Some(id) = &id {
                                                    page_sig.set(id.to_string());
                                                    navigate(
                                                        &href_clone,
                                                        NavigateOptions::default(),
                                                    );
                                                }

                                                // If the screen is small close full navbar
                                                if getPageWidth() <= 768 {
                                                    set_full_navbar.set(false)
                                                }
                                            }
                                            href=href
                                            id=id_str>
                                            {title}
                                        </a>
                                    }
                                })
                                .collect_view()
                                .into_any()
                        }
                    }}
                </Suspense>
            </div>
        </div>
    }
}

fn first_content_page(course: &Course) -> Option<String> {
    course.pages.iter().find_map(|page| match page {
        Page::Empty(_) => None,
        Page::Ref((_, _, id)) => Some(id.clone()),
    })
}
