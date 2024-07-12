use crate::app::{get_universe_json, Universe};
use leptos::{html::*, *};
use thaw::*;
use wasm_bindgen::{prelude::*, JsCast};
use web_sys::{window, CanvasRenderingContext2d, Document, HtmlCanvasElement};

#[component]
pub fn UniverseRenderer(universe: ReadSignal<String>) -> impl IntoView {
    let once = create_resource(universe, |universe| async move {
        get_universe_json(universe).await
    });

    let canvas = create_node_ref::<Canvas>();
    let canvas_container = create_node_ref::<Div>();

    view! {
        <div
            id="canvas-container"
            node_ref=canvas_container>
            <canvas
                id="universe-canvas"
                node_ref=canvas />
        </div>

        <div id="universe-content">
            <Suspense
                fallback=move || view! { <p>Loading...</p> }
            >
                {move || match once.get() {
                    None => view! {}.into_view(),
                    Some(res) => {
                        let content = res.unwrap();
                        let universe = serde_json::from_str::<Universe>(&content).unwrap();

                        // Render dependencies
                        #[cfg(feature = "hydrate")] {
                            let canvas = canvas.get().unwrap();
                            let canvas_container = canvas_container.get().unwrap();
                            let ctx = canvas.get_context("2d")
                                .unwrap()
                                .unwrap()
                                .dyn_into::<CanvasRenderingContext2d>()
                                .unwrap();

                            canvas.set_width(canvas_container.client_width() as u32);
                            canvas.set_height(canvas_container.client_height() as u32);

                            ctx.set_stroke_style(&JsValue::from_str("red"));
                            ctx.set_line_width(3.0);

                            let window = window().unwrap();
                            let document = window.document().unwrap();

                            for dependency in &universe.dependencies {
                                let from = document
                                    .get_element_by_id(&format!("course-{}", dependency.from))
                                    .unwrap();

                                let to = document
                                    .get_element_by_id(&format!("course-{}", dependency.to))
                                    .unwrap();

                                let rect_a = from.get_bounding_client_rect();
                                let point_a = (
                                    rect_a.x() + rect_a.width(),
                                    rect_a.y() + rect_a.height() * 0.5,
                                );

                                let rect_b = to.get_bounding_client_rect();
                                let point_b = (
                                    rect_b.x(),
                                    rect_b.y() + rect_b.height() * 0.5,
                                );

                                ctx.begin_path();
                                ctx.move_to(point_a.0, point_a.1);
                                ctx.line_to(point_b.0, point_b.1);
                                ctx.stroke();
                            }
                        }

                        // Render titles (SSR)
                        universe.courses.into_iter()
                            .map(|course| {
                                let title_id = format!("course-{}", course.id);
                                let title_href = format!("/course/{}", course.id);
                                let left = course.x * 100.0;
                                let top = course.y * 100.0;
                                let color1 = course.color.unwrap_or(String::from("#3498db"));
                                let color2 = color1.clone();
                                let color3 = color1.clone();


                                view! {
                                    <a
                                        id=title_id
                                        href=title_href
                                        rel="external"
                                        style="position: absolute"
                                        style:left=move || format!("{}%", left)
                                        style:top=move || format!("{}%", top)
                                        style:background-color=move || format!("{}", color1)
                                        style:box-shadow=move || format!("0 0 5px {}", color2)
                                        style:border=move || format!("2px solid {}", color3)
                                    >{course.name}</a>
                                }
                            }).collect_view()
                    }
                }}
            </Suspense>
        </div>
    }
}
