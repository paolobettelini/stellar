use leptos::prelude::*;

use crate::app::{Navbar, PageRenderer, Topbar};

#[component]
pub fn CoursePage() -> impl IntoView {
    let page_sig = RwSignal::new("".to_string());
    let page = page_sig.read_only();
    let (title, set_title) = signal("".to_string());
    let (navbar_hidden, set_navbar_hidden) = signal(false);

    view! {
        <div class="course-container" class:retracted=move || navbar_hidden()>
            <Navbar page_sig set_title hidden=navbar_hidden />

            <div class="course-body">
                <div class="course-topbar">
                    <Topbar title=title.into() set_navbar_hidden />
                </div>
                <div class="course-content">
                    <PageRenderer page />
                </div>
            </div>
        </div>
    }
}
