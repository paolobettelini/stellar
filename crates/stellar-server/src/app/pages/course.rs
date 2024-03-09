use leptos::*;

use crate::app::{Navbar, PageRenderer, Topbar};

#[component]
pub fn CoursePage() -> impl IntoView {
    let page_sig = create_rw_signal("".to_string());
    let page = page_sig.read_only();

    view! {
        <div class="course-container">
            <Navbar page_sig />

            <div class="course-body">
                <div class="course-topbar">
                    <Topbar />
                </div>
                <div class="course-content">
                    <PageRenderer page />
                </div>
            </div>
        </div>
    }
}
