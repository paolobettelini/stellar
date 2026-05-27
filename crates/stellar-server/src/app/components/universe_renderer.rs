use crate::app::{Universe, get_universe_json};
use leptos::html::{Canvas, Div};
use leptos::prelude::*;
use leptos_router::components::Redirect;
#[cfg(feature = "hydrate")]
use wasm_bindgen::JsCast;
#[cfg(feature = "hydrate")]
use web_sys::CanvasRenderingContext2d;
use web_sys::MouseEvent;

#[component]
pub fn UniverseRenderer(universe: Signal<String>) -> impl IntoView {
    let once = Resource::new(
        move || universe.get(),
        |universe| async move { get_universe_json(universe).await },
    );

    view! {
        <Suspense fallback=move || view! { <p class="universe-status">"Loading..."</p> }>
            {move || match once.get() {
                None => view! {}.into_any(),
                Some(Err(_)) => view! { <Redirect path="/404" /> }.into_any(),
                Some(Ok(content)) => {
                    match serde_json::from_str::<Universe>(&content) {
                        Ok(parsed) => {
                            view! {
                                <UniverseCanvasLoaded initial=parsed />
                            }.into_any()
                        }
                        Err(_) => view! { <p class="universe-status">"Invalid universe JSON"</p> }.into_any(),
                    }
                }
            }}
        </Suspense>
    }
}

#[component]
fn UniverseCanvasLoaded(initial: Universe) -> impl IntoView {
    let universe = RwSignal::new(Some(initial));
    let selected_course = RwSignal::new(None::<usize>);

    view! {
        <UniverseCanvas
            universe=universe
            selected_course=selected_course
            editable=false
        />
    }
}

#[component]
pub fn UniverseCanvas(
    universe: RwSignal<Option<Universe>>,
    selected_course: RwSignal<Option<usize>>,
    editable: bool,
) -> impl IntoView {
    let canvas = NodeRef::<Canvas>::new();
    let canvas_container = NodeRef::<Div>::new();

    let (is_dragging, set_is_dragging) = signal(false);
    let (dragging_course, set_dragging_course) = signal(None::<usize>);
    let (drag_start, set_drag_start) = signal((0.0, 0.0));
    let (drag_delta, set_drag_delta) = signal((0.0, 0.0));
    let (offset, set_offset) = signal((0.0, 0.0));

    #[cfg(feature = "hydrate")]
    Effect::new(move |_| {
        let Some(universe) = universe.get() else {
            return;
        };
        let _ = offset();
        let _ = drag_delta();
        let _ = leptos::leptos_dom::helpers::request_animation_frame(move || {
            draw_universe_dependencies(canvas, canvas_container, &universe);
        });
    });

    let on_mouse_down = move |event: MouseEvent| {
        set_is_dragging.set(true);
        set_drag_start.set((event.client_x() as f64, event.client_y() as f64));
    };

    let on_mouse_up = move |_| {
        if let Some(index) = dragging_course() {
            let (delta_x, delta_y) = drag_delta();
            universe.update(|state| {
                if let Some(universe) = state {
                    if let Some(course) = universe.courses.get_mut(index) {
                        course.x += delta_x;
                        course.y += delta_y;
                    }
                }
            });
            set_drag_delta.set((0.0, 0.0));
        }

        set_is_dragging.set(false);
        set_dragging_course.set(None);
    };

    let on_mouse_move = move |event: MouseEvent| {
        let (start_x, start_y) = drag_start();
        let delta_x = event.client_x() as f64 - start_x;
        let delta_y = event.client_y() as f64 - start_y;

        if let Some(index) = dragging_course() {
            let _ = index;
            set_drag_delta.set((delta_x, delta_y));
        } else if is_dragging() {
            set_offset.update(|offset| *offset = (offset.0 + delta_x, offset.1 + delta_y));
            set_drag_start.set((event.client_x() as f64, event.client_y() as f64));
        }
    };

    view! {
        <div
            class="universe-stage"
            class:editing=editable
            on:mouseup=on_mouse_up
            on:mouseleave=on_mouse_up
            on:mousemove=on_mouse_move
        >
            <div
                id="canvas-container"
                node_ref=canvas_container
                on:mousedown=on_mouse_down
            >
                <canvas
                    id="universe-canvas"
                    node_ref=canvas />
            </div>

            <div id="universe-content">
                {move || {
                    let Some(universe) = universe.get() else {
                        return view! {}.into_any();
                    };

                    universe.courses.into_iter()
                        .enumerate()
                        .map(|(index, course)| {
                            let title_id = format!("course-{}", course.id);
                            let title_href = format!("/course/{}", course.id);
                            let href = if editable {
                                String::from("#")
                            } else {
                                title_href
                            };
                            let left = course.x;
                            let top = course.y;
                            let course_offset = move || {
                                if dragging_course.get() == Some(index) {
                                    drag_delta.get()
                                } else {
                                    (0.0, 0.0)
                                }
                            };
                            let color1 = course.color.unwrap_or(String::from("#3498db"));
                            let color2 = color1.clone();
                            let color3 = color1.clone();
                            let set_dragging_course = set_dragging_course;
                            let set_drag_start = set_drag_start;
                            let selected_course = selected_course;

                            view! {
                                <a
                                    id=title_id
                                    href=href
                                    rel="external"
                                    class=("editable", editable)
                                    class=("selected", move || selected_course.get() == Some(index))
                                    on:click=move |event: MouseEvent| {
                                        if editable {
                                            event.prevent_default();
                                            selected_course.set(Some(index));
                                        }
                                    }
                                    on:mousedown=move |event: MouseEvent| {
                                        if editable {
                                            event.prevent_default();
                                            event.stop_propagation();
                                            selected_course.set(Some(index));
                                            set_dragging_course.set(Some(index));
                                            set_drag_start.set((
                                                event.client_x() as f64,
                                                event.client_y() as f64,
                                            ));
                                        }
                                    }
                                    style="position: absolute"
                                    style:left=move || {
                                        let (course_x, _) = course_offset();
                                        format!("{}px", left + offset().0 + course_x)
                                    }
                                    style:top=move || {
                                        let (_, course_y) = course_offset();
                                        format!("{}px", top + offset().1 + course_y)
                                    }
                                    style:background-color=move || format!("{}", color1)
                                    style:box-shadow=move || format!("0 0 5px {}", color2)
                                    style:border=move || format!("2px solid {}", color3)
                                >{course.name}</a>
                            }
                        })
                        .collect_view()
                        .into_any()
                }}
            </div>
        </div>
    }
}

#[cfg(feature = "hydrate")]
fn draw_universe_dependencies(
    canvas: NodeRef<Canvas>,
    canvas_container: NodeRef<Div>,
    universe: &Universe,
) {
    let Some(canvas) = canvas.get() else {
        return;
    };
    let Some(canvas_container) = canvas_container.get() else {
        return;
    };
    let Ok(Some(context)) = canvas.get_context("2d") else {
        return;
    };
    let Ok(ctx) = context.dyn_into::<CanvasRenderingContext2d>() else {
        return;
    };

    let width = canvas_container.client_width().max(0) as u32;
    let height = canvas_container.client_height().max(0) as u32;
    canvas.set_width(width);
    canvas.set_height(height);

    ctx.clear_rect(0.0, 0.0, width as f64, height as f64);
    ctx.set_stroke_style_str("red");
    ctx.set_line_width(3.0);

    let Some(window) = web_sys::window() else {
        return;
    };
    let Some(document) = window.document() else {
        return;
    };
    let container_rect = canvas_container.get_bounding_client_rect();

    for dependency in &universe.dependencies {
        let Some(from) = document.get_element_by_id(&format!("course-{}", dependency.from)) else {
            continue;
        };
        let Some(to) = document.get_element_by_id(&format!("course-{}", dependency.to)) else {
            continue;
        };

        let rect_a = from.get_bounding_client_rect();
        let point_a = (
            rect_a.x() - container_rect.x() + rect_a.width(),
            rect_a.y() - container_rect.y() + rect_a.height() * 0.5,
        );

        let rect_b = to.get_bounding_client_rect();
        let point_b = (
            rect_b.x() - container_rect.x(),
            rect_b.y() - container_rect.y() + rect_b.height() * 0.5,
        );

        ctx.begin_path();
        ctx.move_to(point_a.0, point_a.1);
        if let Some(curve) = dependency.curve.filter(|curve| curve.abs() > f64::EPSILON) {
            let dx = point_b.0 - point_a.0;
            let dy = point_b.1 - point_a.1;
            let length = (dx * dx + dy * dy).sqrt().max(1.0);
            let control_x = (point_a.0 + point_b.0) * 0.5 - dy / length * curve;
            let control_y = (point_a.1 + point_b.1) * 0.5 + dx / length * curve;
            ctx.quadratic_curve_to(control_x, control_y, point_b.0, point_b.1);
        } else {
            ctx.line_to(point_b.0, point_b.1);
        }
        ctx.stroke();
    }
}
