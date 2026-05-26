use crate::app::{get_universe_json, Course, Dependency, Topbar, Universe, UniverseCanvas};
use leptos::prelude::*;
use leptos_router::hooks::use_params_map;

#[cfg(feature = "hydrate")]
use wasm_bindgen::prelude::wasm_bindgen;

#[cfg(feature = "hydrate")]
#[wasm_bindgen(inline_js = r#"
export function downloadJson(filename, content) {
    const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}
"#)]
extern "C" {
    #[wasm_bindgen(js_name = downloadJson)]
    fn download_json(filename: &str, content: &str);
}

#[component]
pub fn EditUniversePage() -> impl IntoView {
    let params = use_params_map();
    let universe_id =
        Signal::derive(move || params.with(|params| params.get("universe").unwrap_or_default()));
    let once = Resource::new(
        move || universe_id.get(),
        |universe| async move { get_universe_json(universe).await },
    );

    view! {
        <Suspense fallback=move || view! { <p class="universe-status">"Loading..."</p> }>
            {move || match once.get() {
                None => view! {}.into_any(),
                Some(Err(_)) => view! { <p class="universe-status">"Could not load universe"</p> }.into_any(),
                Some(Ok(content)) => {
                    match serde_json::from_str::<Universe>(&content) {
                        Ok(universe) => view! {
                            <UniverseEditor
                                universe_id=universe_id.get()
                                initial=universe
                            />
                        }.into_any(),
                        Err(_) => view! { <p class="universe-status">"Invalid universe JSON"</p> }.into_any(),
                    }
                }
            }}
        </Suspense>
    }
}

#[component]
fn UniverseEditor(universe_id: String, initial: Universe) -> impl IntoView {
    let universe = RwSignal::new(Some(initial));
    let selected_course = RwSignal::new(None::<usize>);
    let topbar_title = {
        let universe_id = universe_id.clone();
        Signal::derive(move || {
            if universe_id.is_empty() {
                String::from("Edit universe")
            } else {
                format!("Edit universe / {universe_id}")
            }
        })
    };

    let (new_course_name, set_new_course_name) = signal(String::new());
    let (new_course_id, set_new_course_id) = signal(String::new());
    let (new_course_x, set_new_course_x) = signal(String::from("120"));
    let (new_course_y, set_new_course_y) = signal(String::from("120"));
    let (new_course_color, set_new_course_color) = signal(String::new());

    let (new_dep_from, set_new_dep_from) = signal(String::new());
    let (new_dep_to, set_new_dep_to) = signal(String::new());
    let (new_dep_curve, set_new_dep_curve) = signal(String::new());

    #[cfg(feature = "hydrate")]
    let download_file_name = format!("{universe_id}.json");
    #[cfg(not(feature = "hydrate"))]
    let _ = universe_id;

    let add_course = move |_| {
        let id = new_course_id().trim().to_string();
        let name = new_course_name().trim().to_string();

        if id.is_empty() || name.is_empty() {
            return;
        }

        let x = new_course_x().parse::<f64>().unwrap_or(120.0);
        let y = new_course_y().parse::<f64>().unwrap_or(120.0);
        let color = non_empty_string(new_course_color());

        universe.update(|state| {
            if let Some(universe) = state {
                universe.courses.push(Course {
                    name,
                    id,
                    x,
                    y,
                    color,
                });
            }
        });

        set_new_course_name.set(String::new());
        set_new_course_id.set(String::new());
        set_new_course_color.set(String::new());
    };

    let add_dependency = move |_| {
        let Some((from, to)) = dependency_endpoints(universe, new_dep_from(), new_dep_to()) else {
            return;
        };

        universe.update(|state| {
            if let Some(universe) = state {
                universe.dependencies.push(Dependency {
                    from,
                    to,
                    curve: parse_optional_f64(&new_dep_curve()),
                });
            }
        });

        set_new_dep_curve.set(String::new());
    };

    let download_current = move |_| {
        #[cfg(feature = "hydrate")]
        {
            let Some(universe) = universe.get() else {
                return;
            };
            let Ok(json) = serde_json::to_string_pretty(&universe) else {
                return;
            };
            download_json(&download_file_name, &json);
        }
    };

    view! {
        <div class="universe-editor-page">
            <div class="universe-editor-canvas-panel">
                <div class="universe-page-topbar universe-editor-topbar">
                    <Topbar title=topbar_title />
                </div>

                <UniverseCanvas
                    universe=universe
                    selected_course=selected_course
                    editable=true
                />
            </div>

            <aside class="universe-editor-sidebar">
                <header class="universe-editor-header">
                    <h1>"Universe"</h1>
                    <button type="button" class="editor-primary" on:click=download_current>
                        "Download JSON"
                    </button>
                </header>

                <section class="editor-section">
                    <label class="editor-field">
                        <span>"Title"</span>
                        <input
                            type="text"
                            value=move || universe.get().map(|universe| universe.title).unwrap_or_default()
                            on:input=move |event| {
                                let value = event_target_value(&event);
                                universe.update(|state| {
                                    if let Some(universe) = state {
                                        universe.title = value;
                                    }
                                });
                            }
                        />
                    </label>
                </section>

                <section class="editor-section">
                    <h2>"Add Course"</h2>
                    <div class="editor-grid">
                        <label class="editor-field">
                            <span>"Name"</span>
                            <input
                                type="text"
                                value=move || new_course_name()
                                on:input=move |event| set_new_course_name.set(event_target_value(&event))
                            />
                        </label>
                        <label class="editor-field">
                            <span>"Id"</span>
                            <input
                                type="text"
                                value=move || new_course_id()
                                on:input=move |event| set_new_course_id.set(event_target_value(&event))
                            />
                        </label>
                        <label class="editor-field">
                            <span>"X"</span>
                            <input
                                type="number"
                                value=move || new_course_x()
                                on:input=move |event| set_new_course_x.set(event_target_value(&event))
                            />
                        </label>
                        <label class="editor-field">
                            <span>"Y"</span>
                            <input
                                type="number"
                                value=move || new_course_y()
                                on:input=move |event| set_new_course_y.set(event_target_value(&event))
                            />
                        </label>
                    </div>
                    <label class="editor-field">
                        <span>"Color"</span>
                        <div class="editor-color-row">
                            <input
                                type="color"
                                value=move || color_value(new_course_color())
                                on:change=move |event| set_new_course_color.set(event_target_value(&event))
                            />
                            <input
                                type="text"
                                placeholder="#3498db"
                                value=move || new_course_color()
                                on:input=move |event| set_new_course_color.set(event_target_value(&event))
                            />
                        </div>
                    </label>
                    <button type="button" on:click=add_course>"Add Course"</button>
                </section>

                <section class="editor-section">
                    <h2>"Courses"</h2>
                    <div class="editor-list">
                        {move || {
                            let Some(universe_data) = universe.get() else {
                                return view! {}.into_any();
                            };

                            universe_data.courses.into_iter()
                                .enumerate()
                                .map(|(index, course)| {
                                    view! {
                                        <CourseEditorRow
                                            universe=universe
                                            selected_course=selected_course
                                            index=index
                                            course=course
                                        />
                                    }
                                })
                                .collect_view()
                                .into_any()
                        }}
                    </div>
                </section>

                <section class="editor-section">
                    <h2>"Add Dependency"</h2>
                    <div class="editor-grid">
                        <label class="editor-field">
                            <span>"From"</span>
                            <CourseSelect
                                universe=universe
                                value=new_dep_from
                                set_value=set_new_dep_from
                            />
                        </label>
                        <label class="editor-field">
                            <span>"To"</span>
                            <CourseSelect
                                universe=universe
                                value=new_dep_to
                                set_value=set_new_dep_to
                            />
                        </label>
                    </div>
                    <label class="editor-field">
                        <span>"Curve"</span>
                        <input
                            type="number"
                            placeholder="0"
                            value=move || new_dep_curve()
                            on:input=move |event| set_new_dep_curve.set(event_target_value(&event))
                        />
                    </label>
                    <button type="button" on:click=add_dependency>"Add Dependency"</button>
                </section>

                <section class="editor-section">
                    <h2>"Dependencies"</h2>
                    <div class="editor-list">
                        {move || {
                            let Some(universe_data) = universe.get() else {
                                return view! {}.into_any();
                            };

                            universe_data.dependencies.into_iter()
                                .enumerate()
                                .map(|(index, dependency)| {
                                    view! {
                                        <DependencyEditorRow
                                            universe=universe
                                            index=index
                                            dependency=dependency
                                        />
                                    }
                                })
                                .collect_view()
                                .into_any()
                        }}
                    </div>
                </section>
            </aside>
        </div>
    }
}

#[component]
fn CourseEditorRow(
    universe: RwSignal<Option<Universe>>,
    selected_course: RwSignal<Option<usize>>,
    index: usize,
    course: Course,
) -> impl IntoView {
    let selected = move || selected_course.get() == Some(index);
    let id_for_remove = course.id.clone();

    view! {
        <div class="editor-card" class:selected=selected>
            <button
                type="button"
                class="editor-card-title"
                on:click=move |_| selected_course.set(Some(index))
            >
                {course.name.clone()}
            </button>
            <label class="editor-field">
                <span>"Name"</span>
                <input
                    type="text"
                    value=course.name
                    on:input=move |event| {
                        update_course(universe, index, |course| {
                            course.name = event_target_value(&event);
                        });
                    }
                />
            </label>
            <label class="editor-field">
                <span>"Id"</span>
                <input
                    type="text"
                    value=course.id
                    on:input=move |event| {
                        update_course(universe, index, |course| {
                            course.id = event_target_value(&event);
                        });
                    }
                />
            </label>
            <div class="editor-grid">
                <label class="editor-field">
                    <span>"X"</span>
                    <input
                        type="number"
                        value=course.x.to_string()
                        on:input=move |event| {
                            if let Ok(value) = event_target_value(&event).parse::<f64>() {
                                update_course(universe, index, |course| course.x = value);
                            }
                        }
                    />
                </label>
                <label class="editor-field">
                    <span>"Y"</span>
                    <input
                        type="number"
                        value=course.y.to_string()
                        on:input=move |event| {
                            if let Ok(value) = event_target_value(&event).parse::<f64>() {
                                update_course(universe, index, |course| course.y = value);
                            }
                        }
                    />
                </label>
            </div>
            <label class="editor-field">
                <span>"Color"</span>
                <div class="editor-color-row">
                    <input
                        type="color"
                        value=color_value(course.color.clone().unwrap_or_default())
                        on:change=move |event| {
                            update_course(universe, index, |course| {
                                course.color = non_empty_string(event_target_value(&event));
                            });
                        }
                    />
                    <input
                        type="text"
                        placeholder="#3498db"
                        value=course.color.unwrap_or_default()
                        on:input=move |event| {
                            update_course(universe, index, |course| {
                                course.color = non_empty_string(event_target_value(&event));
                            });
                        }
                    />
                </div>
            </label>
            <button
                type="button"
                class="editor-danger"
                on:click=move |_| remove_course(universe, index, &id_for_remove)
            >
                "Remove"
            </button>
        </div>
    }
}

#[component]
fn DependencyEditorRow(
    universe: RwSignal<Option<Universe>>,
    index: usize,
    dependency: Dependency,
) -> impl IntoView {
    view! {
        <div class="editor-card dependency-card">
            <div class="editor-grid">
                <label class="editor-field">
                    <span>"From"</span>
                    <DependencyCourseSelect
                        universe=universe
                        index=index
                        current=dependency.from.clone()
                        update_from=true
                    />
                </label>
                <label class="editor-field">
                    <span>"To"</span>
                    <DependencyCourseSelect
                        universe=universe
                        index=index
                        current=dependency.to.clone()
                        update_from=false
                    />
                </label>
            </div>
            <label class="editor-field">
                <span>"Curve"</span>
                <input
                    type="number"
                    placeholder="0"
                    value=dependency.curve.map(|curve| curve.to_string()).unwrap_or_default()
                    on:input=move |event| {
                        let value = parse_optional_f64(&event_target_value(&event));
                        update_dependency(universe, index, |dependency| {
                            dependency.curve = value;
                        });
                    }
                />
            </label>
            <button
                type="button"
                class="editor-danger"
                on:click=move |_| {
                    universe.update(|state| {
                        if let Some(universe) = state {
                            if index < universe.dependencies.len() {
                                universe.dependencies.remove(index);
                            }
                        }
                    });
                }
            >
                "Remove"
            </button>
        </div>
    }
}

#[component]
fn CourseSelect(
    universe: RwSignal<Option<Universe>>,
    value: ReadSignal<String>,
    set_value: WriteSignal<String>,
) -> impl IntoView {
    view! {
        <select
            on:change=move |event| set_value.set(event_target_value(&event))
        >
            <option value="" selected=move || value().is_empty()>""</option>
            {move || {
                let current = value();
                course_ids(universe)
                    .into_iter()
                    .map(|id| {
                        let selected = id == current;
                        view! { <option value=id.clone() selected=selected>{id.clone()}</option> }
                    })
                    .collect_view()
            }}
        </select>
    }
}

#[component]
fn DependencyCourseSelect(
    universe: RwSignal<Option<Universe>>,
    index: usize,
    current: String,
    update_from: bool,
) -> impl IntoView {
    view! {
        <select
            on:change=move |event| {
                let value = event_target_value(&event);
                update_dependency(universe, index, |dependency| {
                    if update_from {
                        dependency.from = value;
                    } else {
                        dependency.to = value;
                    }
                });
            }
        >
            {move || course_ids(universe)
                .into_iter()
                .map(|id| {
                    let selected = id == current;
                    view! {
                        <option value=id.clone() selected=selected>{id.clone()}</option>
                    }
                })
                .collect_view()}
        </select>
    }
}

fn course_ids(universe: RwSignal<Option<Universe>>) -> Vec<String> {
    universe
        .get()
        .map(|universe| {
            universe
                .courses
                .into_iter()
                .map(|course| course.id)
                .collect()
        })
        .unwrap_or_default()
}

fn dependency_endpoints(
    universe: RwSignal<Option<Universe>>,
    selected_from: String,
    selected_to: String,
) -> Option<(String, String)> {
    let ids = course_ids(universe);
    let from = non_empty_string(selected_from).or_else(|| ids.first().cloned())?;
    let to =
        non_empty_string(selected_to).or_else(|| ids.iter().find(|id| **id != from).cloned())?;

    if from == to {
        None
    } else {
        Some((from, to))
    }
}

fn update_course<F>(universe: RwSignal<Option<Universe>>, index: usize, update: F)
where
    F: FnOnce(&mut Course),
{
    universe.update(|state| {
        if let Some(universe) = state {
            if let Some(course) = universe.courses.get_mut(index) {
                update(course);
            }
        }
    });
}

fn remove_course(universe: RwSignal<Option<Universe>>, index: usize, id: &str) {
    universe.update(|state| {
        if let Some(universe) = state {
            if index < universe.courses.len() {
                universe.courses.remove(index);
            }
            universe
                .dependencies
                .retain(|dependency| dependency.from != id && dependency.to != id);
        }
    });
}

fn update_dependency<F>(universe: RwSignal<Option<Universe>>, index: usize, update: F)
where
    F: FnOnce(&mut Dependency),
{
    universe.update(|state| {
        if let Some(universe) = state {
            if let Some(dependency) = universe.dependencies.get_mut(index) {
                update(dependency);
            }
        }
    });
}

fn non_empty_string(value: String) -> Option<String> {
    let value = value.trim().to_string();
    if value.is_empty() {
        None
    } else {
        Some(value)
    }
}

fn parse_optional_f64(value: &str) -> Option<f64> {
    let value = value.trim();
    if value.is_empty() {
        None
    } else {
        value.parse::<f64>().ok()
    }
}

fn color_value(value: String) -> String {
    let value = value.trim();
    if value.starts_with('#') && value.len() == 7 {
        value.to_string()
    } else {
        String::from("#3498db")
    }
}
