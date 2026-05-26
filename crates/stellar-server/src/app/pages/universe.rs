use crate::app::UniverseRenderer;
use leptos::prelude::*;
use leptos_router::hooks::use_params_map;

#[component]
pub fn UniversePage() -> impl IntoView {
    let params = use_params_map();
    let universe =
        Signal::derive(move || params.with(|params| params.get("universe").unwrap_or_default()));

    view! {
        <div style="width:100vw;height:100vh;overflow:hidden">
            <UniverseRenderer universe />
        </div>
    }
}
