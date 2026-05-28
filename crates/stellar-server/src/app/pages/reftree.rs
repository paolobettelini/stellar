use crate::app::{LoadingIndicator, SnippetReferenceTree, Topbar, get_snippet_reference_tree};
use leptos::html::{Canvas, Div};
use leptos::prelude::*;
use leptos_router::hooks::use_params_map;
use std::collections::{HashMap, HashSet};
#[cfg(feature = "hydrate")]
use wasm_bindgen::JsCast;
#[cfg(feature = "hydrate")]
use web_sys::CanvasRenderingContext2d;
use web_sys::MouseEvent;

const NODE_WIDTH: f64 = 220.0;
const NODE_HEIGHT: f64 = 54.0;
const COLUMN_GAP: f64 = 260.0;
const ROW_GAP: f64 = 150.0;

#[derive(Clone, Copy, PartialEq, Eq, Hash)]
enum ReferenceTreeView {
    Compact,
    Tree,
}

#[derive(Clone, Copy, PartialEq, Eq, Hash)]
struct ReferenceNodeKey {
    view: ReferenceTreeView,
    index: usize,
}

fn view_button_class(current: ReferenceTreeView, target: ReferenceTreeView) -> &'static str {
    if current == target { "active" } else { "" }
}

#[component]
pub fn RefTreePage() -> impl IntoView {
    let params = use_params_map();
    let snippet =
        Signal::derive(move || params.with(|params| params.get("id").unwrap_or_default()));
    let title = Signal::derive(|| String::from("Reference Tree"));
    let tree = Resource::new(move || snippet.get(), get_snippet_reference_tree);

    view! {
        <div class="reftree-page">
            <div class="reftree-topbar">
                <Topbar title />
            </div>

            <Suspense fallback=move || view! {
                <div class="stellar-loading-page">
                    <LoadingIndicator />
                </div>
            }>
                {move || match tree.get() {
                    None => view! {}.into_any(),
                    Some(Err(error)) => view! {
                        <div class="reftree-error">
                            <h1>"Could not render reference tree"</h1>
                            <p>{error.to_string()}</p>
                        </div>
                    }.into_any(),
                    Some(Ok(json)) => match serde_json::from_str::<SnippetReferenceTree>(&json) {
                        Ok(tree) => view! {
                            <ReferenceTreeCanvas tree />
                        }.into_any(),
                        Err(_) => view! {
                            <div class="reftree-error">
                                <h1>"Could not render reference tree"</h1>
                                <p>"Invalid reference tree data"</p>
                            </div>
                        }.into_any(),
                    },
                }}
            </Suspense>
        </div>
    }
}

#[component]
fn ReferenceTreeCanvas(tree: SnippetReferenceTree) -> impl IntoView {
    let view_mode = RwSignal::new(ReferenceTreeView::Compact);
    let layout = Memo::new(move |_| match view_mode.get() {
        ReferenceTreeView::Compact => layout_reference_graph(&tree),
        ReferenceTreeView::Tree => layout_reference_tree(&tree),
    });
    let canvas = NodeRef::<Canvas>::new();
    let viewport = NodeRef::<Div>::new();
    let (is_dragging, set_is_dragging) = signal(false);
    let (drag_start, set_drag_start) = signal((0.0, 0.0));
    let (offset, set_offset) = signal((0.0, 0.0));
    let node_offsets = RwSignal::new(HashMap::<ReferenceNodeKey, (f64, f64)>::new());
    let dragging_node = RwSignal::new(None::<ReferenceNodeKey>);
    let drag_distance = RwSignal::new(0.0_f64);
    let suppress_next_click = RwSignal::new(false);
    #[cfg(feature = "hydrate")]
    let redraw_key = RwSignal::new(0_u64);

    #[cfg(feature = "hydrate")]
    {
        let theme_change_handle = leptos::leptos_dom::helpers::window_event_listener_untyped(
            "stellar-theme-change",
            move |_| {
                redraw_key.update(|key| *key += 1);
            },
        );
        on_cleanup(move || theme_change_handle.remove());
    }

    #[cfg(feature = "hydrate")]
    Effect::new(move |_| {
        let layout = layout.get();
        let current_view = view_mode.get();
        let _ = leptos::leptos_dom::helpers::request_animation_frame(move || {
            let Some(viewport) = viewport.get() else {
                return;
            };
            let Some(root) = layout
                .nodes
                .iter()
                .find(|node| node.index == layout.root_index)
            else {
                return;
            };
            let root_offset = node_offsets.with_untracked(|offsets| {
                offsets
                    .get(&ReferenceNodeKey {
                        view: current_view,
                        index: root.index,
                    })
                    .copied()
                    .unwrap_or((0.0, 0.0))
            });

            set_offset.set((
                viewport.client_width() as f64 * 0.5 - root.x - root_offset.0,
                viewport.client_height() as f64 * 0.7 - root.y - root_offset.1,
            ));
        });
    });

    #[cfg(feature = "hydrate")]
    Effect::new(move |_| {
        let _ = offset();
        let _ = node_offsets.get();
        let _ = redraw_key.get();
        let layout = layout.get();
        let _ = leptos::leptos_dom::helpers::request_animation_frame(move || {
            draw_reference_tree(canvas, viewport, &layout);
        });
    });

    let on_mouse_down = move |event: MouseEvent| {
        event.prevent_default();
        set_is_dragging.set(true);
        set_drag_start.set((event.client_x() as f64, event.client_y() as f64));
    };

    let on_mouse_up = move |_| {
        set_is_dragging.set(false);
        dragging_node.set(None);
    };

    let on_mouse_move = move |event: MouseEvent| {
        if !is_dragging() {
            return;
        }

        let (start_x, start_y) = drag_start();
        let delta_x = event.client_x() as f64 - start_x;
        let delta_y = event.client_y() as f64 - start_y;

        if let Some(node_key) = dragging_node.get() {
            node_offsets.update(|offsets| {
                let offset = offsets.entry(node_key).or_insert((0.0, 0.0));
                offset.0 += delta_x;
                offset.1 += delta_y;
            });
            drag_distance.update(|distance| {
                *distance += (delta_x * delta_x + delta_y * delta_y).sqrt();
                if *distance > 5.0 {
                    suppress_next_click.set(true);
                }
            });
        } else {
            set_offset.update(|offset| {
                offset.0 += delta_x;
                offset.1 += delta_y;
            });
        }
        set_drag_start.set((event.client_x() as f64, event.client_y() as f64));
    };

    view! {
        <div
            class="reftree-stage"
            node_ref=viewport
            on:mouseup=on_mouse_up
            on:mouseleave=on_mouse_up
            on:mousemove=on_mouse_move
        >
            <div class="reftree-canvas-layer" on:mousedown=on_mouse_down>
                <canvas class="reftree-canvas" node_ref=canvas />
            </div>

            <div class="reftree-view-toggle">
                <button
                    type="button"
                    class=move || view_button_class(view_mode.get(), ReferenceTreeView::Compact)
                    on:click=move |_| view_mode.set(ReferenceTreeView::Compact)
                >
                    "Compact"
                </button>
                <button
                    type="button"
                    class=move || view_button_class(view_mode.get(), ReferenceTreeView::Tree)
                    on:click=move |_| view_mode.set(ReferenceTreeView::Tree)
                >
                    "Tree"
                </button>
            </div>

            <div class="reftree-content">
                {move || {
                    let layout = layout.get();
                    let root_index = layout.root_index;
                    let current_view = view_mode.get();

                    layout
                        .nodes
                        .into_iter()
                        .map(|node| {
                            let id = node.id.clone();
                            let href = format!("/snippet/{id}");
                            let element_id = format!("reftree-node-{}", node.index);
                            let is_target = node.index == root_index;
                            let left = node.x;
                            let top = node.y;
                            let node_key = ReferenceNodeKey {
                                view: current_view,
                                index: node.index,
                            };
                            let node_position_offset = move || {
                                node_offsets.with(|offsets| {
                                    offsets.get(&node_key).copied().unwrap_or((0.0, 0.0))
                                })
                            };

                            view! {
                                <a
                                    id=element_id
                                    class="reftree-node"
                                    class=("target", is_target)
                                    class=("dragging", move || dragging_node.get() == Some(node_key))
                                    href=href
                                    draggable="false"
                                    on:mousedown=move |event: MouseEvent| {
                                        event.prevent_default();
                                        event.stop_propagation();
                                        set_is_dragging.set(true);
                                        dragging_node.set(Some(node_key));
                                        drag_distance.set(0.0);
                                        suppress_next_click.set(false);
                                        set_drag_start.set((
                                            event.client_x() as f64,
                                            event.client_y() as f64,
                                        ));
                                    }
                                    on:click=move |event| {
                                        if suppress_next_click.get() {
                                            event.prevent_default();
                                            suppress_next_click.set(false);
                                        }
                                    }
                                    style:left=move || {
                                        let (node_offset_x, _) = node_position_offset();
                                        format!(
                                            "{}px",
                                            left + offset().0 + node_offset_x - NODE_WIDTH * 0.5,
                                        )
                                    }
                                    style:top=move || {
                                        let (_, node_offset_y) = node_position_offset();
                                        format!(
                                            "{}px",
                                            top + offset().1 + node_offset_y - NODE_HEIGHT * 0.5,
                                        )
                                    }
                                >
                                    <span>{id}</span>
                                </a>
                            }
                        })
                        .collect_view()
                }}
            </div>
        </div>
    }
}

#[derive(Clone, PartialEq)]
struct ReferenceTreeLayout {
    nodes: Vec<ReferenceTreeNode>,
    #[cfg_attr(not(feature = "hydrate"), allow(dead_code))]
    edges: Vec<(usize, usize)>,
    root_index: usize,
}

#[derive(Clone, PartialEq)]
struct ReferenceTreeNode {
    index: usize,
    id: String,
    x: f64,
    y: f64,
}

fn layout_reference_tree(tree: &SnippetReferenceTree) -> ReferenceTreeLayout {
    let mut nodes = Vec::new();
    let mut edges = Vec::new();
    let mut leaf_cursor = 0_usize;
    let mut max_depth = 0_usize;

    let (root_index, _) = layout_reference_tree_node(
        tree,
        0,
        &mut nodes,
        &mut edges,
        &mut leaf_cursor,
        &mut max_depth,
    );

    for node in &mut nodes {
        node.y = (max_depth as f64 - node.y) * ROW_GAP;
    }

    ReferenceTreeLayout {
        nodes,
        edges,
        root_index,
    }
}

fn layout_reference_graph(tree: &SnippetReferenceTree) -> ReferenceTreeLayout {
    let mut depths = HashMap::new();
    let mut edges = HashSet::new();
    let mut order = Vec::new();

    collect_reference_graph(tree, None, 0, &mut depths, &mut edges, &mut order);

    let max_depth = depths.values().copied().max().unwrap_or(0);
    let mut nodes = Vec::new();
    let mut indices = HashMap::new();

    for depth in 0..=max_depth {
        let ids = order
            .iter()
            .filter(|id| depths.get(*id) == Some(&depth))
            .collect::<Vec<_>>();
        let count = ids.len();

        for (position, id) in ids.into_iter().enumerate() {
            let index = nodes.len();
            let x = (position as f64 - (count.saturating_sub(1) as f64 * 0.5)) * COLUMN_GAP;
            let y = (max_depth - depth) as f64 * ROW_GAP;

            indices.insert(id.clone(), index);
            nodes.push(ReferenceTreeNode {
                index,
                id: id.clone(),
                x,
                y,
            });
        }
    }

    let mut edges = edges.into_iter().collect::<Vec<_>>();
    edges.sort_by(|(from_a, to_a), (from_b, to_b)| {
        depths
            .get(to_a)
            .cmp(&depths.get(to_b))
            .then_with(|| order_position(&order, from_a).cmp(&order_position(&order, from_b)))
            .then_with(|| order_position(&order, to_a).cmp(&order_position(&order, to_b)))
    });
    let edges = edges
        .into_iter()
        .filter_map(|(from, to)| Some((*indices.get(&from)?, *indices.get(&to)?)))
        .collect();
    let root_index = *indices.get(&tree.id).unwrap_or(&0);

    ReferenceTreeLayout {
        nodes,
        edges,
        root_index,
    }
}

fn collect_reference_graph(
    tree: &SnippetReferenceTree,
    parent: Option<&str>,
    depth: usize,
    depths: &mut HashMap<String, usize>,
    edges: &mut HashSet<(String, String)>,
    order: &mut Vec<String>,
) {
    if !depths.contains_key(&tree.id) {
        order.push(tree.id.clone());
    }

    depths
        .entry(tree.id.clone())
        .and_modify(|current| *current = (*current).max(depth))
        .or_insert(depth);

    if let Some(parent) = parent {
        edges.insert((tree.id.clone(), parent.to_string()));
    }

    for reference in &tree.references {
        collect_reference_graph(reference, Some(&tree.id), depth + 1, depths, edges, order);
    }
}

fn order_position(order: &[String], id: &str) -> usize {
    order
        .iter()
        .position(|current| current == id)
        .unwrap_or(usize::MAX)
}

fn layout_reference_tree_node(
    tree: &SnippetReferenceTree,
    depth: usize,
    nodes: &mut Vec<ReferenceTreeNode>,
    edges: &mut Vec<(usize, usize)>,
    leaf_cursor: &mut usize,
    max_depth: &mut usize,
) -> (usize, f64) {
    *max_depth = (*max_depth).max(depth);

    let mut children = Vec::new();
    for reference in &tree.references {
        children.push(layout_reference_tree_node(
            reference,
            depth + 1,
            nodes,
            edges,
            leaf_cursor,
            max_depth,
        ));
    }

    let x = if children.is_empty() {
        let x = *leaf_cursor as f64 * COLUMN_GAP;
        *leaf_cursor += 1;
        x
    } else {
        children.iter().map(|(_, x)| x).sum::<f64>() / children.len() as f64
    };
    let index = nodes.len();

    nodes.push(ReferenceTreeNode {
        index,
        id: tree.id.clone(),
        x,
        y: depth as f64,
    });

    for (child_index, _) in children {
        edges.push((child_index, index));
    }

    (index, x)
}

#[cfg(feature = "hydrate")]
fn draw_reference_tree(
    canvas: NodeRef<Canvas>,
    viewport: NodeRef<Div>,
    layout: &ReferenceTreeLayout,
) {
    let Some(canvas) = canvas.get() else {
        return;
    };
    let Some(viewport) = viewport.get() else {
        return;
    };
    let Ok(Some(context)) = canvas.get_context("2d") else {
        return;
    };
    let Ok(ctx) = context.dyn_into::<CanvasRenderingContext2d>() else {
        return;
    };

    let width = viewport.client_width().max(0) as u32;
    let height = viewport.client_height().max(0) as u32;
    canvas.set_width(width);
    canvas.set_height(height);

    ctx.clear_rect(0.0, 0.0, width as f64, height as f64);
    ctx.set_line_width(3.0);
    ctx.set_stroke_style_str(
        theme_color(&viewport, "--col4")
            .as_deref()
            .unwrap_or("#286f96"),
    );

    let Some(window) = web_sys::window() else {
        return;
    };
    let Some(document) = window.document() else {
        return;
    };
    let viewport_rect = viewport.get_bounding_client_rect();

    for (from, to) in &layout.edges {
        let Some(from) = document.get_element_by_id(&format!("reftree-node-{from}")) else {
            continue;
        };
        let Some(to) = document.get_element_by_id(&format!("reftree-node-{to}")) else {
            continue;
        };

        let from_rect = from.get_bounding_client_rect();
        let to_rect = to.get_bounding_client_rect();
        let point_a = (
            from_rect.x() - viewport_rect.x() + from_rect.width() * 0.5,
            from_rect.y() - viewport_rect.y() + from_rect.height(),
        );
        let point_b = (
            to_rect.x() - viewport_rect.x() + to_rect.width() * 0.5,
            to_rect.y() - viewport_rect.y(),
        );
        let control_y = (point_a.1 + point_b.1) * 0.5;

        ctx.begin_path();
        ctx.move_to(point_a.0, point_a.1);
        ctx.bezier_curve_to(
            point_a.0, control_y, point_b.0, control_y, point_b.0, point_b.1,
        );
        ctx.stroke();
    }
}

#[cfg(feature = "hydrate")]
fn theme_color(element: &web_sys::HtmlDivElement, variable: &str) -> Option<String> {
    let style = web_sys::window()?.get_computed_style(element).ok()??;
    let value = style.get_property_value(variable).ok()?;
    let value = value.trim();

    if value.is_empty() {
        None
    } else {
        Some(value.to_string())
    }
}
