use crate::app::{CourseDocument, CoursePageEntry, LoadingIndicator, Topbar, get_course_json};
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
pub fn EditCoursePage() -> impl IntoView {
    let params = use_params_map();
    let course_id =
        Signal::derive(move || params.with(|params| params.get("course").unwrap_or_default()));
    let once = Resource::new(
        move || course_id.get(),
        |course| async move { get_course_json(course).await },
    );

    view! {
        <Suspense fallback=move || view! {
            <div class="stellar-loading-page">
                <LoadingIndicator />
            </div>
        }>
            {move || match once.get() {
                None => view! {}.into_any(),
                Some(Err(_)) => view! {
                    <CourseEditor
                        course_id=course_id.get()
                        initial=empty_course(&course_id.get())
                    />
                }.into_any(),
                Some(Ok(content)) => {
                    match serde_json::from_str::<CourseDocument>(&content) {
                        Ok(course) => view! {
                            <CourseEditor
                                course_id=course_id.get()
                                initial=course
                            />
                        }.into_any(),
                        Err(_) => view! { <p class="course-editor-status">"Invalid course JSON"</p> }.into_any(),
                    }
                }
            }}
        </Suspense>
    }
}

#[component]
fn CourseEditor(course_id: String, initial: CourseDocument) -> impl IntoView {
    let course = RwSignal::new(initial);
    let selected_page = RwSignal::new(None::<usize>);
    let topbar_title = {
        let course_id = course_id.clone();
        Signal::derive(move || {
            if course_id.is_empty() {
                String::from("Edit course")
            } else {
                format!("Edit course / {course_id}")
            }
        })
    };

    #[cfg(feature = "hydrate")]
    let download_file_name = format!("{course_id}.json");
    #[cfg(not(feature = "hydrate"))]
    let _ = course_id;

    let add_section = move |_| {
        let index = course.with(|course| course.pages.len());

        course.update(|course| {
            course
                .pages
                .push(CoursePageEntry::Empty((1, String::from("New section"))));
        });
        selected_page.set(Some(index));
    };

    let download_current = move |_| {
        #[cfg(feature = "hydrate")]
        {
            let Ok(json) = serde_json::to_string_pretty(&course.get()) else {
                return;
            };
            download_json(&download_file_name, &json);
        }
    };

    view! {
        <div class="course-editor-page">
            <section class="course-editor-preview">
                <div class="course-editor-topbar">
                    <Topbar title=topbar_title show_home=true />
                </div>

                <div class="course-editor-preview-shell">
                    <aside id="navbar" class="course-editor-navbar">
                        <a class="navbar-home" href="/">
                            <img src="/assets/logo.png" width="64px" height="64px" alt="Home" />
                        </a>
                        <div id="navbar-content">
                            {move || {
                                let course_data = course.get();

                                if course_data.pages.is_empty() {
                                    return view! {
                                        <p class="course-editor-empty-preview">
                                            "No sections yet"
                                        </p>
                                    }.into_any();
                                }

                                course_data.pages.into_iter()
                                    .enumerate()
                                    .map(|(index, page)| {
                                        let level = entry_level(&page);
                                        let title = entry_title(&page);
                                        let id = entry_page_id(&page);
                                        let id_is_none = id.is_none();
                                        let level_class = format!("nav-title-level-{level}");
                                        let id_attr = id
                                            .as_ref()
                                            .map(|id| format!("nav-title-{id}"))
                                            .unwrap_or_default();
                                        let selected = move || selected_page.get() == Some(index);

                                        view! {
                                            <a
                                                class=format!("nav-title {level_class}")
                                                class=("empty-nav-title", id_is_none)
                                                class=("active", selected)
                                                href="#"
                                                id=id_attr
                                                on:click=move |event| {
                                                    event.prevent_default();
                                                    selected_page.set(Some(index));
                                                }
                                            >
                                                {title}
                                            </a>
                                        }
                                    })
                                    .collect_view()
                                    .into_any()
                            }}
                        </div>
                    </aside>

                    <div class="course-editor-preview-content">
                        <h1>{move || course.get().title}</h1>
                    </div>
                </div>
            </section>

            <aside class="universe-editor-sidebar course-editor-sidebar">
                <header class="universe-editor-header">
                    <h1>"Course"</h1>
                    <button type="button" class="editor-primary" on:click=download_current>
                        "Download JSON"
                    </button>
                </header>

                <section class="editor-section">
                    <label class="editor-field">
                        <span>"Title"</span>
                        <input
                            type="text"
                            value=move || course.get().title
                            on:input=move |event| {
                                let value = event_target_value(&event);
                                course.update(|course| course.title = value);
                            }
                        />
                    </label>
                </section>

                <section class="editor-section">
                    <h2>"Sections"</h2>
                    <button type="button" on:click=add_section>
                        "Add Section"
                    </button>
                    <div class="editor-list">
                        {move || {
                            let course_data = course.get();

                            course_data.pages.into_iter()
                                .enumerate()
                                .map(|(index, page)| {
                                    view! {
                                        <CourseSectionEditorRow
                                            course=course
                                            selected_page=selected_page
                                            index=index
                                            page=page
                                        />
                                    }
                                })
                                .collect_view()
                        }}
                    </div>
                </section>
            </aside>
        </div>
    }
}

#[component]
fn CourseSectionEditorRow(
    course: RwSignal<CourseDocument>,
    selected_page: RwSignal<Option<usize>>,
    index: usize,
    page: CoursePageEntry,
) -> impl IntoView {
    let level = entry_level(&page);
    let title = entry_title(&page);
    let card_title = if title.trim().is_empty() {
        String::from("Untitled section")
    } else {
        title.clone()
    };
    let page_id = entry_page_id(&page).unwrap_or_default();
    let selected = move || selected_page.get() == Some(index);

    view! {
        <div class="editor-card" class:selected=selected>
            <button
                type="button"
                class="editor-card-title"
                on:click=move |_| selected_page.set(Some(index))
            >
                {card_title}
            </button>

            <p class="course-section-meta">{format!("Level {level}")}</p>

            <label class="editor-field">
                <span>"Title"</span>
                <input
                    type="text"
                    value=title
                    on:input=move |event| {
                        let value = event_target_value(&event);
                        update_page_entry(course, index, |page| set_entry_title(page, value));
                    }
                />
            </label>

            <label class="editor-field">
                <span>"Page id"</span>
                <input
                    type="text"
                    placeholder="optional-page-id"
                    value=page_id
                    on:input=move |event| {
                        let value = event_target_value(&event);
                        update_page_entry(course, index, |page| set_entry_page_id(page, value));
                    }
                />
            </label>

            <div class="course-section-actions">
                <button
                    type="button"
                    on:click=move |_| {
                        update_page_entry(course, index, |page| {
                            let level = entry_level(page).saturating_sub(1);
                            set_entry_level(page, level);
                        });
                    }
                >
                    "Outdent"
                </button>
                <button
                    type="button"
                    on:click=move |_| {
                        update_page_entry(course, index, |page| {
                            let level = entry_level(page).saturating_add(1);
                            set_entry_level(page, level);
                        });
                    }
                >
                    "Indent"
                </button>
                <button
                    type="button"
                    class="editor-danger"
                    on:click=move |_| remove_page_entry(course, selected_page, index)
                >
                    "Remove"
                </button>
            </div>
        </div>
    }
}

fn empty_course(course_id: &str) -> CourseDocument {
    CourseDocument {
        title: if course_id.is_empty() {
            String::from("New course")
        } else {
            course_id.to_string()
        },
        pages: Vec::new(),
    }
}

fn entry_level(entry: &CoursePageEntry) -> u8 {
    match entry {
        CoursePageEntry::Empty((level, _)) | CoursePageEntry::Ref((level, _, _)) => {
            (*level).clamp(1, 3)
        }
    }
}

fn entry_title(entry: &CoursePageEntry) -> String {
    match entry {
        CoursePageEntry::Empty((_, title)) | CoursePageEntry::Ref((_, title, _)) => title.clone(),
    }
}

fn entry_page_id(entry: &CoursePageEntry) -> Option<String> {
    match entry {
        CoursePageEntry::Empty(_) => None,
        CoursePageEntry::Ref((_, _, id)) => Some(id.clone()),
    }
}

fn set_entry_level(entry: &mut CoursePageEntry, level: u8) {
    let level = level.clamp(1, 3);

    match entry {
        CoursePageEntry::Empty((current, _)) | CoursePageEntry::Ref((current, _, _)) => {
            *current = level;
        }
    }
}

fn set_entry_title(entry: &mut CoursePageEntry, title: String) {
    match entry {
        CoursePageEntry::Empty((_, current)) | CoursePageEntry::Ref((_, current, _)) => {
            *current = title;
        }
    }
}

fn set_entry_page_id(entry: &mut CoursePageEntry, page_id: String) {
    let level = entry_level(entry);
    let title = entry_title(entry);
    let page_id = page_id.trim().to_string();

    *entry = if page_id.is_empty() {
        CoursePageEntry::Empty((level, title))
    } else {
        CoursePageEntry::Ref((level, title, page_id))
    };
}

fn update_page_entry<F>(course: RwSignal<CourseDocument>, index: usize, update: F)
where
    F: FnOnce(&mut CoursePageEntry),
{
    course.update(|course| {
        if let Some(page) = course.pages.get_mut(index) {
            update(page);
        }
    });
}

fn remove_page_entry(
    course: RwSignal<CourseDocument>,
    selected_page: RwSignal<Option<usize>>,
    index: usize,
) {
    course.update(|course| {
        if index < course.pages.len() {
            course.pages.remove(index);
        }
    });

    let page_count = course.with(|course| course.pages.len());
    selected_page.set(if page_count == 0 {
        None
    } else {
        Some(index.min(page_count - 1))
    });
}
