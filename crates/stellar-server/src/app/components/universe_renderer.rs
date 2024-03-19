use leptos::*;
use thaw::*;
use crate::app::get_universe_json;

#[component]
pub fn UniverseRenderer(universe: ReadSignal<String>) -> impl IntoView {
    let once = create_resource(universe, |universe| async move { get_universe_json(universe).await });

    view! {
        <div id="canvas-container">
            <canvas id="universe-canvas"></canvas>
        </div>

        <div id="universe-content">
        </div>

        <script src="/assets/js/universe.js" />

        <Suspense
            fallback=move || view! {}
        >
            {move || match once.get() {
                None => view! {}.into_view(),
                Some(res) => {
                    if let Ok(content) = res {
                        if !content.is_empty() {
                            view! {}.into_view()
                        } else {
                            view! {}.into_view()
                        }
                    } else {
                        view! {}.into_view()
                    }
                }
            }}
        </Suspense>
    }
}
