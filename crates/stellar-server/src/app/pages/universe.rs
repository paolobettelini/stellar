use crate::app::{Topbar, UniverseRenderer};
use leptos::prelude::*;
use leptos_router::hooks::use_params_map;

#[component]
pub fn UniversePage() -> impl IntoView {
    let params = use_params_map();
    let universe =
        Signal::derive(move || params.with(|params| params.get("universe").unwrap_or_default()));
    let title = Signal::derive(move || {
        let universe = universe.get();

        if universe.is_empty() {
            String::from("Universe")
        } else {
            format!("Universe / {universe}")
        }
    });
    let edit_href = Signal::derive(move || format!("/edit-universe/{}", universe.get()));

    view! {
        <div class="universe-page">
            <div class="universe-page-topbar">
                <Topbar title show_home=true edit_href />
            </div>

            <UniverseRenderer universe />
        </div>
    }
}
