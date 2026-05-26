use crate::app::UniverseRenderer;
use leptos::prelude::*;
use leptos_router::hooks::use_params_map;

#[component]
pub fn UniversePage() -> impl IntoView {
    let params = use_params_map();
    let universe = move || params.with(|params| params.get("universe").unwrap_or_default());

    let (universe, _set_title) = signal(universe().to_string());

    view! {
        <div style="width:100%;height:100%">
            <UniverseRenderer universe />
        </div>
    }
}
