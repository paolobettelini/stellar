use leptos::*;
use leptos_meta::*;
use leptos_router::*;
use thaw::*;

use crate::app::{Navbar, Topbar, PageRenderer};

#[component]
pub fn CoursePage() -> impl IntoView {
    let (page, set_page) = create_signal("".to_string());

    view! {
        <div class="course-container">
            <Navbar set_page />
            
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