use leptos::*;
use thaw::*;
use crate::app::get_universe_json;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(module = "/assets/js/universe.js")]
extern "C" {
    pub fn render_universe(universe: String);
}

#[component]
pub fn UniverseRenderer(universe: ReadSignal<String>) -> impl IntoView {
    let once = create_resource(universe, |universe| async move { get_universe_json(universe).await });

    view! {
        <div id="canvas-container">
            <canvas id="universe-canvas"></canvas>
        </div>

        <div id="universe-content">
        </div>

        <Suspense
            fallback=move || view! {}
        >
            {move || match once.get() {
                None => view! {}.into_view(),
                Some(res) => {
                    if let Ok(content) = res {
                        if !content.is_empty() {
                            #[cfg(feature = "hydrate")]
                            render_universe(content);

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
