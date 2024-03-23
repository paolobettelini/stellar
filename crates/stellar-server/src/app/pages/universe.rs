use crate::app::UniverseRenderer;
use leptos::*;
use leptos_router::*;

#[component]
pub fn UniversePage() -> impl IntoView {
    let params = use_params_map();
    let universe =
        move || params.with(|params| params.get("universe").cloned().unwrap_or_default());

    let (universe, _set_title) = create_signal(universe().to_string());

    view! {
        <div style="width:100%;height:100%">
            <UniverseRenderer universe />
        </div>
    }
}
