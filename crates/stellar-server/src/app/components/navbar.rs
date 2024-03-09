use leptos::*;
use leptos_router::*;
use thaw::*;

use crate::app::{get_course_json, Course};

#[component]
pub fn Navbar(set_page: WriteSignal<String>) -> impl IntoView {
    let params = use_params_map();
    let course = move || params.with(|params| params.get("course").cloned().unwrap_or_default());

    let once = create_resource(course, get_course_json);

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

                            // Flag to set the first page
                            let first_page_found = false;

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
                                            class="nav-title"
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
