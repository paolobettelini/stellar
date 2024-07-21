use futures::TryStreamExt;
use std::collections::HashMap;
use stellar_database::ClientHandler;
use std::rc::Rc;
use stellar_database as database;

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
                    log::warn!("Snippet {} references {}, but it does not exist!", &snippet.id, &reference);
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
                log::warn!("Page {} contains {}, but it does not exist!", &page.id, &snippet);
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
                log::warn!("Course {} contains {}, but it does not exist!", &course.id, &page);
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
                log::warn!("Universe {} contains {}, but it does not exist!", &universe.id, &course);
                break;
            }
        }
    }

    Ok(not_existent_count)
}

pub async fn check_pages_linearity(client: &ClientHandler) -> anyhow::Result<u32> {
    log::debug!("Checking snippets linearity in pages");

    let mut cursor = client.query_pages(".*").await?;
    let mut not_linear_count = 0;

    while let Some(page) = cursor.try_next().await? {
        let mut referenced_snippets = HashMap::new();

        for snippet_id in page.snippets {
            let res = client.query_snippet(&snippet_id).await;

            // if you put this after the hashset insert
            // autoreferences are included
            if let Some(id) = referenced_snippets.get(&snippet_id) {
                log::warn!("Page {}: snippet {} is referenced by {} before defining it",
                &page.id, &snippet_id, &*id);
            }

            // Add references to hashset
            if let Ok(snippet) = res {
                if let Some(snippet) = snippet {
                    if let Some(references) = snippet.references {
                        // allocate less memory
                        let snippet = Rc::new(snippet_id.clone());
                        
                        for reference in references {
                            referenced_snippets.insert(reference, snippet.clone());
                        }
                    }
                }
            }
        }
    }

    Ok(not_linear_count)
}

pub async fn check_courses_linearity(client: &ClientHandler) -> anyhow::Result<u32> {
    log::debug!("Checking snippets linearity in courses");

    //let mut cursor = client.query_pages(".*").await?;
    let mut not_linear_count = 0;

    //while let Some(page) = cursor.try_next().await? {

    //}

    Ok(not_linear_count)
}

pub async fn check_universes_linearity(client: &ClientHandler) -> anyhow::Result<u32> {
    log::debug!("Checking snippets linearity in universes");

    let mut not_linear_count = 0;

    Ok(not_linear_count)
}