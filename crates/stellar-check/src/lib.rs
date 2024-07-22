#![feature(let_chains)]

use futures::TryStreamExt;
use std::collections::{HashMap, HashSet};
use std::rc::Rc;
use stellar_database as database;
use stellar_database::model::*;
use stellar_database::ClientHandler;

pub async fn check_autoreferentiality(client: &ClientHandler) -> anyhow::Result<u32> {
    log::debug!("Checking autoreferentiality in snippets");

    let mut cursor = client.query_snippets(".*").await?;
    let mut self_references = 0;

    while let Some(snippet) = cursor.try_next().await? {
        if let Some(references) = snippet.references {
            for reference in references {
                if reference == snippet.id {
                    self_references += 1;
                    log::warn!("Snippet {} has a self reference!", &snippet.id);
                    break;
                }
            }
        }
    }

    Ok(self_references)
}

pub async fn check_snippet_existences(client: &ClientHandler) -> anyhow::Result<u32> {
    log::debug!("Checking existence of snippets in snippets references");

    let mut cursor = client.query_snippets(".*").await?;
    let mut not_existent_count = 0;

    while let Some(snippet) = cursor.try_next().await? {
        if let Some(references) = snippet.references {
            for reference in references {
                if !client.snippet_exists(&reference).await.unwrap_or(false) {
                    not_existent_count += 1;
                    log::warn!(
                        "Snippet {} references {}, but it does not exist!",
                        &snippet.id,
                        &reference
                    );
                    break;
                }
            }
        }
    }

    Ok(not_existent_count)
}

pub async fn check_page_existences(client: &ClientHandler) -> anyhow::Result<u32> {
    log::debug!("Checking existence of snippet in pages");

    let mut cursor = client.query_pages(".*").await?;
    let mut not_existent_count = 0;

    while let Some(page) = cursor.try_next().await? {
        for snippet in page.snippets {
            if !client.snippet_exists(&snippet).await.unwrap_or(false) {
                not_existent_count += 1;
                log::warn!(
                    "Page {} contains {}, but it does not exist!",
                    &page.id,
                    &snippet
                );
                break;
            }
        }
    }

    Ok(not_existent_count)
}

pub async fn check_course_existences(client: &ClientHandler) -> anyhow::Result<u32> {
    log::debug!("Checking existence of pages in courses");

    let mut cursor = client.query_courses(".*").await?;
    let mut not_existent_count = 0;

    while let Some(course) = cursor.try_next().await? {
        for page in course.pages {
            if !client.page_exists(&page).await.unwrap_or(false) {
                not_existent_count += 1;
                log::warn!(
                    "Course {} contains {}, but it does not exist!",
                    &course.id,
                    &page
                );
                break;
            }
        }
    }

    Ok(not_existent_count)
}

pub async fn check_universe_existences(client: &ClientHandler) -> anyhow::Result<u32> {
    log::debug!("Checking existence of courses in universes");

    let mut cursor = client.query_universes(".*").await?;
    let mut not_existent_count = 0;

    while let Some(universe) = cursor.try_next().await? {
        for course in universe.courses {
            if !client.course_exists(&course).await.unwrap_or(false) {
                not_existent_count += 1;
                log::warn!(
                    "Universe {} contains {}, but it does not exist!",
                    &universe.id,
                    &course
                );
                break;
            }
        }
    }

    Ok(not_existent_count)
}

pub async fn check_linearity(client: &ClientHandler) -> anyhow::Result<u32> {
    let mut cursor = client.query_universes(".*").await?;
    let mut not_linear_count = 0;

    // These two sets are used to store nonlinear snippets
    // that are only nonlinear in the context of a single page or course.
    // (So, if multiple universes have the same courses, of courses have the same pages,
    // we avoid printing the warning multiple times).
    // The values are (snippet id, course/page id).
    let mut global_page_only_nonlinear_set = HashSet::new();
    let mut global_course_only_nonlinear_set = HashSet::new();

    while let Some(current_universe) = cursor.try_next().await? {
        log::debug!("Checking linearity of universe {}", &current_universe.id);

        // This map is used to check whether a course is a dependency (in the universe tree)
        // of another course. The values are in a `Rc<T>` to save some memory.
        let universe_dependency_map = get_universe_dependency_map(&current_universe);

        for current_course_id in &current_universe.courses {
            log::debug!("Checking linearity of course {}", &current_course_id);

            if let Ok(Some(current_course)) = client.query_course(&current_course_id).await {
                // Used to check whether a page appears before another
                let course_indexed_map = get_course_indexed_map(&current_course);

                for (current_page_index, current_page_id) in current_course.pages.iter().enumerate()
                {
                    log::debug!("Checking linearity of page {}", &current_page_id);

                    if let Ok(Some(current_page)) = client.query_page(&current_page_id).await {
                        // Used to check whether a snippet appears before another
                        let page_indexed_map = get_page_indexed_map(&current_page);

                        for (current_snippet_index, current_snippet_id) in
                            current_page.snippets.iter().enumerate()
                        {
                            log::debug!("Checking linearity of snippet {}", &current_snippet_id);

                            if let Ok(Some(current_snippet)) =
                                client.query_snippet(&current_snippet_id).await
                            {
                                if let Some(references) = &current_snippet.references {
                                    for reference in references {
                                        let linear = check_reference_linearity(
                                            client,
                                            &current_universe,
                                            &current_course,
                                            &current_page,
                                            &current_snippet,
                                            &reference,
                                            &universe_dependency_map,
                                            &course_indexed_map,
                                            &page_indexed_map,
                                            current_page_index,
                                            current_snippet_index,
                                            &mut global_page_only_nonlinear_set,
                                            &mut global_course_only_nonlinear_set,
                                        )
                                        .await?;

                                        // Update counter
                                        not_linear_count += !linear as u32;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    Ok(not_linear_count)
}

/// <Course, Dependencies>
fn get_universe_dependency_map(universe: &Universe) -> HashMap<String, HashSet<String>> {
    let mut map = HashMap::new();

    for course in &universe.courses {
        let mut dependencies = HashSet::new();

        // Recursively add the dependencies
        fn recursive_add(set: &mut HashSet<String>, list: &[Dependency], current_course_id: &str) {
            // find all the dependencies with "to": current_course_id
            // and recall the function with the "from" value of the same dependency.
            let dependencies: Vec<&Dependency> = list
                .into_iter()
                .filter(|d| d.to == current_course_id)
                .collect();
            for dependency in dependencies {
                set.insert(dependency.from.clone());
                recursive_add(set, list, &dependency.from);
            }
        }
        recursive_add(&mut dependencies, &universe.dependencies, &course);

        map.insert(course.clone(), dependencies);
    }

    map
}

fn get_course_indexed_map(course: &Course) -> HashMap<String, usize> {
    let mut map = HashMap::new();

    for (index, page) in course.pages.iter().enumerate() {
        map.insert(page.clone(), index);
    }

    map
}

fn get_page_indexed_map(page: &Page) -> HashMap<String, usize> {
    let mut map = HashMap::new();

    for (index, snippet) in page.snippets.iter().enumerate() {
        map.insert(snippet.clone(), index);
    }

    map
}

async fn check_reference_linearity(
    client: &ClientHandler,
    universe: &Universe,
    course: &Course,
    page: &Page,
    snippet: &Snippet,
    reference: &str,
    universe_dependency_map: &HashMap<String, HashSet<String>>,
    course_indexed_map: &HashMap<String, usize>,
    page_indexed_map: &HashMap<String, usize>,
    current_page_index: usize,
    current_snippet_index: usize,
    global_page_only_nonlinear_set: &mut HashSet<(String, String)>,
    global_course_only_nonlinear_set: &mut HashSet<(String, String)>,
) -> anyhow::Result<bool> {
    let mut defined_after_in_page = false;
    let mut defined_after_in_course = false;
    let mut defined_after_in_universe = false;

    // Get the index of the snippet in the current page (if present)
    if let Some(index) = page_indexed_map.get(reference) {
        if *index <= current_snippet_index {
            // The snippet has been defined before the current snippet, so it's fine
            // (or it's a self-refernece, but we don't care)
            return Ok(true);
        } else {
            defined_after_in_page = true;
        }
    }

    // Now, the snippet that is referenced is defined after the
    // referencing snippet, or not in this page.
    // We must now check whether is it defined after in the course.

    // Get the index of the page in the current course (if present)
    let pages = client
        .get_pages_containing_snippet(&reference, &course.id)
        .await?;
    for page in pages {
        if let Some(index) = course_indexed_map.get(&page.id) {
            if *index <= current_page_index {
                // The snippet has been defined before the current page, so it's fine
                return Ok(true);
            } else {
                defined_after_in_course = true;
            }
        }
    }

    // Now, the snippet that is referenced is defined after the
    // referencing snippet, or not in this course.
    // We must now check whether is it defined after in the universe dependencies.

    let dependencies = universe_dependency_map
        .get(&course.id)
        .expect("This should never happen. Please report this error");

    let courses = client
        .get_courses_containing_snippet(&reference, &universe.id)
        .await?;
    for course in courses {
        if dependencies.contains(&course.id) {
            return Ok(true);
        } else if universe_dependency_map.contains_key(&course.id) {
            defined_after_in_universe = true;
        }
    }

    /* === log === */

    if defined_after_in_universe || defined_after_in_course || defined_after_in_page {
        if defined_after_in_page {
            let key = (reference.to_string(), page.id.clone());
            if global_page_only_nonlinear_set.contains(&key) {
                global_page_only_nonlinear_set.insert(key);

                return Ok(true); // ignore
            }
            global_page_only_nonlinear_set.insert(key);
        }

        if defined_after_in_course {
            let key = (reference.to_string(), course.id.clone());
            if global_course_only_nonlinear_set.contains(&key) {
                global_course_only_nonlinear_set.insert(key);

                return Ok(true); // ignore
            }
            global_course_only_nonlinear_set.insert(key);
        }

        if defined_after_in_universe {
            log::warn!(
                "Universe {}: snippet {} is referenced by {} before being defined in another course",
                &universe.id,
                &reference,
                &snippet.id,
            );
        } else if defined_after_in_course {
            log::warn!(
                "Course {}: snippet {} is referenced by {} before being defined in another page",
                &course.id,
                &reference,
                &snippet.id,
            );
        } else if defined_after_in_page {
            log::warn!(
                "Page {}: snippet {} is referenced by {} before being defined in the same page",
                &page.id,
                &reference,
                &snippet.id,
            );
        }

        return Ok(false);
    }

    // Snippet was not found entirely
    Ok(true)
}
