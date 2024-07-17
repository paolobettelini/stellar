use crate::app::{get_universe_json, Universe};
use leptos::{html::*, *};
use thaw::*;
use wasm_bindgen::{prelude::*, JsCast};
use web_sys::{window, CanvasRenderingContext2d, Document, HtmlCanvasElement, MouseEvent, CssStyleDeclaration};

#[component]
pub fn UniverseRenderer(universe: ReadSignal<String>) -> impl IntoView {
    let once = create_resource(universe, |universe| async move {
        get_universe_json(universe).await
    });

    let canvas = create_node_ref::<Canvas>();
    let canvas_container = create_node_ref::<Div>();

    // Dragging state
    let (is_dragging, set_is_dragging) = create_signal(false);
    let (drag_start, set_drag_start) = create_signal((0.0, 0.0));
    let (offset, set_offset) = create_signal((0.0, 0.0));

    let on_mouse_down = move |event: MouseEvent| {
        set_is_dragging.set(true);
        set_drag_start.set((event.client_x() as f64, event.client_y() as f64));
    };

    let on_mouse_up = move |_| {
        set_is_dragging.set(false);
    };

    let on_mouse_move = {
        let is_dragging = is_dragging.clone();
        let drag_start = drag_start.clone();
        let offset = offset.clone();
        let canvas_container = canvas_container.clone();
        move |event: MouseEvent| {
            if is_dragging() {
                let (start_x, start_y) = drag_start();
                let delta_x = event.client_x() as f64 - start_x;
                let delta_y = event.client_y() as f64 - start_y;

                set_offset.update(|offset| {
                    *offset = (offset.0 + delta_x, offset.1 + delta_y)
                });

                set_drag_start.set((event.client_x() as f64, event.client_y() as f64));
            }
        }
    };

    view! {
        <div
            id="canvas-container"
            node_ref=canvas_container
            on:mousedown=on_mouse_down
            on:mouseup=on_mouse_up
            on:mousemove=on_mouse_move
        >
            <canvas
                id="universe-canvas"
                node_ref=canvas />
        </div>

        <div id="universe-content" >
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

                                // Make the rendering depend on offset changes
                                let _ = offset();

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
                                let left = course.x;
                                let top = course.y;
                                let color1 = course.color.unwrap_or(String::from("#3498db"));
                                let color2 = color1.clone();
                                let color3 = color1.clone();

                                view! {
                                    <a
                                        id=title_id
                                        href=title_href
                                        rel="external"
                                        style="position: absolute"
                                        style:left=move || format!("{}px", left + offset().0)
                                        style:top=move || format!("{}px", top + offset().1)
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
