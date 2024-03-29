use leptos::*;
use leptos_router::*;
use thaw::*;

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

#[component]
pub fn Navbar(page_sig: RwSignal<String>, set_title: WriteSignal<String>) -> impl IntoView {
    let params = use_params_map();
    let course = move || params.with(|params| params.get("course").cloned().unwrap_or_default());
    let page = move || params.with(|params| params.get("page").cloned());

    let once = create_resource(course, get_course_json);

    // TODO: show hamburger only if an optional signal is passed

    // Render parameter specified page
    if let Some(v) = page() {
        page_sig.set(v);
    }

    view! {
        <div id="navbar">
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

                                    // Render first page
                                    /*if page_sig() == "" {
                                        if let Some(id) = id.clone() {
                                            //page_sig.set(id.to_string());
                                        }
                                    }*/

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
