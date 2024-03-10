use leptos::*;
use leptos_router::*;

#[component]
pub fn UniversePage() -> impl IntoView {
    let params = use_params_map();
    let universe = move || params.with(|params| params.get("universe").cloned().unwrap_or_default());

    view! {
        <p>Universe page</p>
    }
}
