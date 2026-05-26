use leptos::prelude::*;
use leptos_router::hooks::use_params_map;

use crate::app::{Navbar, PageRenderer, Topbar};

#[component]
pub fn CoursePage() -> impl IntoView {
    let params = use_params_map();
    let course_params = params.clone();
    let course = Signal::derive(move || {
        course_params.with(|params| params.get("course").unwrap_or_default())
    });
    let route_page = Signal::derive(move || {
        params.with(|params| params.get("page").filter(|page| !page.trim().is_empty()))
    });
    let course_share_href = Signal::derive(move || format!("/course/{}", course.get()));
    let page_sig = RwSignal::new("".to_string());
    let page = page_sig.read_only();
    let (title, set_title) = signal("".to_string());
    let (navbar_hidden, set_navbar_hidden) = signal(false);

    view! {
        <div class="course-container" class:retracted=move || navbar_hidden()>
            <Navbar
                page_sig
                course
                route_page
                set_title
                hidden=navbar_hidden
            />

            <div class="course-body">
                <div class="course-topbar">
                    <Topbar
                        title=title.into()
                        set_navbar_hidden
                        share_href=course_share_href
                    />
                </div>
                <div class="course-content">
                    {move || {
                        if page.get().is_empty() {
                            view! {
                                <p>"Loading..."</p>
                                <br></br>
                            }.into_any()
                        } else {
                            view! {
                                <PageRenderer page />
                            }.into_any()
                        }
                    }}
                </div>
            </div>
        </div>
    }
}
