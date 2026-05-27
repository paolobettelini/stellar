#[cfg(feature = "ssr")]
use super::models::SnippetReferenceTree;
use leptos::prelude::*;
#[cfg(feature = "ssr")]
use std::path::Path;

#[cfg(feature = "ssr")]
const MAX_ID_LEN: usize = 128;
#[cfg(feature = "ssr")]
const MAX_SEARCH_QUERY_LEN: usize = 128;
#[cfg(feature = "ssr")]
const MAX_REGEX_QUERY_LEN: usize = 80;
#[cfg(feature = "ssr")]
const SEARCH_RESULTS_LIMIT: i64 = 80;

// POST /course/{course}
#[server]
pub async fn get_course_json(course: String) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    let course = validate_id(course, "course")?;
    let data = expect_context::<ServerData>();

    let file_name = format!("{course}.json");
    log::info!("Reading file: {file_name:?}"); // debug
    // TODO pre-create path
    let file = &Path::new(&data.config.server.data_folder)
        .join("courses")
        .join(&file_name);

    let json = {
        if let Ok(v) = std::fs::read_to_string(file) {
            v
        } else {
            log::warn!("Could not find course: {file_name}");
            return Err(ServerFnError::new(format!("Course not found: {course}")));
        }
    };

    Ok(json)
}

#[server]
pub async fn get_snippet_exists(snippet: String) -> Result<bool, ServerFnError> {
    use crate::data::ServerData;
    let snippet = validate_id(snippet, "snippet")?;
    let data = expect_context::<ServerData>();

    data.client
        .snippet_exists(&snippet)
        .await
        .map_err(ServerFnError::new)
}

#[server]
pub async fn get_snippet_references(snippet: String) -> Result<Option<Vec<String>>, ServerFnError> {
    use crate::data::ServerData;
    let snippet = validate_id(snippet, "snippet")?;
    let data = expect_context::<ServerData>();

    let res = data
        .client
        .query_snippet(&snippet)
        .await
        .map_err(ServerFnError::new)?;

    if let Some(snippet) = res {
        return Ok(snippet.references);
    }

    Ok(None)
}

#[server]
pub async fn get_snippet_reference_tree(snippet: String) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    use futures::TryStreamExt;
    use std::collections::HashMap;

    let snippet = validate_id(snippet, "snippet")?;
    let data = expect_context::<ServerData>();
    let mut cursor = data
        .client
        .query_snippets(".*")
        .await
        .map_err(ServerFnError::new)?;

    let mut snippets = HashMap::new();
    while let Some(document) = cursor.try_next().await.map_err(ServerFnError::new)? {
        snippets.insert(document.id, document.references.unwrap_or_default());
    }

    let tree = build_snippet_reference_tree(&snippet, &snippets, &mut Vec::new())
        .map_err(ServerFnError::new)?;
    serde_json::to_string(&tree).map_err(ServerFnError::new)
}

#[cfg(feature = "ssr")]
fn build_snippet_reference_tree(
    snippet: &str,
    snippets: &std::collections::HashMap<String, Vec<String>>,
    stack: &mut Vec<String>,
) -> Result<SnippetReferenceTree, String> {
    if let Some(position) = stack.iter().position(|current| current == snippet) {
        let mut cycle = stack[position..].to_vec();
        cycle.push(snippet.to_string());
        return Err(format!(
            "Circular snippet reference detected: {}",
            cycle.join(" -> ")
        ));
    }

    let references = snippets
        .get(snippet)
        .ok_or_else(|| format!("Snippet not found: {snippet}"))?;

    stack.push(snippet.to_string());
    let references = references
        .iter()
        .map(|reference| build_snippet_reference_tree(reference, snippets, stack))
        .collect::<Result<Vec<_>, _>>()?;
    stack.pop();

    Ok(SnippetReferenceTree {
        id: snippet.to_string(),
        references,
    })
}

#[server]
pub async fn get_snippet_meta_json(snippet: String) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    let snippet = validate_id(snippet, "snippet")?;
    let data = expect_context::<ServerData>();

    let file_name = format!("{snippet}.json");
    log::info!("Reading file: {file_name:?}"); // debug
    // TODO pre-create path
    let file = &Path::new(&data.config.server.data_folder)
        .join("snippets")
        .join(&snippet)
        .join("meta.json");

    let json = {
        if let Ok(v) = std::fs::read_to_string(file) {
            v
        } else {
            log::debug!("Could not find meta file: {file_name}");
            String::from("")
        }
    };

    Ok(json)
}

// POST /universe/{universe}
#[server]
pub async fn get_universe_json(universe: String) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    let universe = validate_id(universe, "universe")?;
    let data = expect_context::<ServerData>();

    let file_name = format!("{universe}.json");
    log::info!("Reading file: {file_name:?}"); // debug
    // TODO pre-create path
    let file = &Path::new(&data.config.server.data_folder)
        .join("universes")
        .join(&file_name);

    let json = {
        if let Ok(v) = std::fs::read_to_string(file) {
            v
        } else {
            log::warn!("Could not find universe: {file_name}");
            return Err(ServerFnError::new(format!(
                "Universe not found: {universe}"
            )));
        }
    };

    Ok(json)
}

// POST /page/{page}
#[server]
pub async fn get_page_html(page: String) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    if page.is_empty() {
        return Ok(String::from(""));
    }
    let page = validate_id(page, "page")?;

    let file_name = format!("{page}.html");
    log::info!("Reading file: {file_name:?}");

    let data = expect_context::<ServerData>();

    // TODO pre-create path
    let file = &Path::new(&data.config.server.data_folder)
        .join("pages")
        .join(&file_name);
    let content = {
        if let Ok(v) = std::fs::read_to_string(file) {
            v
        } else {
            log::warn!("Could not find page: {file_name}");
            return Err(ServerFnError::new(format!("Page not found: {page}")));
        }
    };

    Ok(content)
}

// POST /query/snippet/{keyword}
#[server]
pub async fn query_snippet(keyword: String, regex: bool) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    use futures::TryStreamExt;

    let keyword = validate_search_query(keyword, regex)?;
    let data = expect_context::<ServerData>();

    let mut cursor = data
        .client
        .search_snippets(&keyword, regex, SEARCH_RESULTS_LIMIT)
        .await
        .map_err(ServerFnError::new)?;

    let mut vec = Vec::new();
    while let Some(document) = cursor.try_next().await.map_err(ServerFnError::new)? {
        vec.push(document);
    }
    let json = serde_json::to_string(&vec).map_err(ServerFnError::new)?;

    Ok(json)
}

// POST /query/page/{keyword}
#[server]
pub async fn query_page(keyword: String, regex: bool) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    use futures::TryStreamExt;

    let keyword = validate_search_query(keyword, regex)?;
    let data = expect_context::<ServerData>();

    let mut cursor = data
        .client
        .search_pages(&keyword, regex, SEARCH_RESULTS_LIMIT)
        .await
        .map_err(ServerFnError::new)?;

    let mut vec = Vec::new();
    while let Some(document) = cursor.try_next().await.map_err(ServerFnError::new)? {
        vec.push(document);
    }
    let json = serde_json::to_string(&vec).map_err(ServerFnError::new)?;

    Ok(json)
}

// POST /query/course/{keyword}
#[server]
pub async fn query_course(keyword: String, regex: bool) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    use futures::TryStreamExt;

    let keyword = validate_search_query(keyword, regex)?;
    let data = expect_context::<ServerData>();

    let mut cursor = data
        .client
        .search_courses(&keyword, regex, SEARCH_RESULTS_LIMIT)
        .await
        .map_err(ServerFnError::new)?;

    let mut vec = Vec::new();
    while let Some(document) = cursor.try_next().await.map_err(ServerFnError::new)? {
        vec.push(document);
    }
    let json = serde_json::to_string(&vec).map_err(ServerFnError::new)?;

    Ok(json)
}

// POST /query/universe/{keyword}
#[server]
pub async fn query_universe(keyword: String, regex: bool) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    use futures::TryStreamExt;

    let keyword = validate_search_query(keyword, regex)?;
    let data = expect_context::<ServerData>();

    let mut cursor = data
        .client
        .search_universes(&keyword, regex, SEARCH_RESULTS_LIMIT)
        .await
        .map_err(ServerFnError::new)?;

    let mut vec = Vec::new();
    while let Some(document) = cursor.try_next().await.map_err(ServerFnError::new)? {
        vec.push(document);
    }
    let json = serde_json::to_string(&vec).map_err(ServerFnError::new)?;

    Ok(json)
}

#[cfg(feature = "ssr")]
fn validate_id(value: String, kind: &str) -> Result<String, ServerFnError> {
    let value = value.trim().to_string();

    if is_safe_id(&value) {
        Ok(value)
    } else {
        Err(ServerFnError::new(format!("Invalid {kind} id")))
    }
}

#[cfg(feature = "ssr")]
fn is_safe_id(id: &str) -> bool {
    !id.is_empty()
        && id != "."
        && id != ".."
        && id.len() <= MAX_ID_LEN
        && id.bytes().all(|byte| {
            byte.is_ascii_alphanumeric() || byte == b'-' || byte == b'_' || byte == b'.'
        })
}

#[cfg(feature = "ssr")]
fn validate_search_query(keyword: String, regex: bool) -> Result<String, ServerFnError> {
    let keyword = keyword.trim().to_string();
    let max_len = if regex {
        MAX_REGEX_QUERY_LEN
    } else {
        MAX_SEARCH_QUERY_LEN
    };

    if keyword.len() > max_len {
        return Err(ServerFnError::new(format!(
            "Search query is too long. Maximum length is {max_len} characters."
        )));
    }

    Ok(keyword)
}
