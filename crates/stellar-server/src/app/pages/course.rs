use leptos::*;

use crate::app::{Navbar, PageRenderer, Topbar};

#[component]
pub fn CoursePage() -> impl IntoView {
    let page_sig = create_rw_signal("".to_string());
    let page = page_sig.read_only();
    let (title, set_title) = create_signal("".to_string());

    view! {
        <div class="course-container">
            <Navbar page_sig set_title />

            <div class="course-body">
                <div class="course-topbar">
                    <Topbar title />
                </div>
                <div class="course-content">
                    <PageRenderer page />
                </div>
            </div>
        </div>
    }
}
