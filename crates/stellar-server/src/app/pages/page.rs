use leptos::*;

use crate::app::{Navbar, PageRenderer, Topbar};

#[component]
pub fn PagePage() -> impl IntoView {
    let page_sig = create_rw_signal("".to_string());
    let page = page_sig.read_only();
    let (title, set_title) = create_signal("".to_string());

    view! {
        <PageRenderer page />
    }
}
