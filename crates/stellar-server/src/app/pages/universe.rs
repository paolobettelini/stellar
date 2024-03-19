use leptos::*;
use leptos_router::*;
use crate::app::UniverseRenderer;

#[component]
pub fn UniversePage() -> impl IntoView {
    let params = use_params_map();
    let universe = move || params.with(|params| params.get("universe").cloned().unwrap_or_default());

    let (universe, _set_title) = create_signal(universe().to_string());

    view! {
        <p>Universe page {universe}</p>
        <UniverseRenderer universe />
    }
}
