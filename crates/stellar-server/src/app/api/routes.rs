use leptos::*;
use std::path::Path;

// POST /course/{course}
#[server]
pub async fn get_course_json(course: String) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    let data = expect_context::<ServerData>();

    let file_name = format!("{course}.json");
    log::info!("Reading file: {file_name:?}"); // debug
                                               // TODO pre-create path
    let file = &Path::new(&data.data_folder)
        .join("courses")
        .join(&file_name);

    let json = {
        if let Ok(v) = std::fs::read_to_string(file) {
            v
        } else {
            log::warn!("Could not find course: {file_name}");
            panic!("sad");
        }
    };

    Ok(json)
}

// POST /universe/{universe}
#[server]
pub async fn get_universe_json(universe: String) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    let data = expect_context::<ServerData>();

    let file_name = format!("{universe}.json");
    log::info!("Reading file: {file_name:?}"); // debug
                                               // TODO pre-create path
    let file = &Path::new(&data.data_folder)
        .join("universes")
        .join(&file_name);

    let json = {
        if let Ok(v) = std::fs::read_to_string(file) {
            v
        } else {
            log::warn!("Could not find universe: {file_name}");
            panic!("sad");
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

    let data = expect_context::<ServerData>();

    let file_name = format!("{page}.html");
    log::info!("Reading file: {file_name:?}");
    // TODO pre-create path
    let file = &Path::new(&data.data_folder).join("pages").join(&file_name);
    let content = {
        if let Ok(v) = std::fs::read_to_string(file) {
            v
        } else {
            log::warn!("Could not find page: {file_name}");
            panic!("Could not find {file:?}");
        }
    };

    Ok(content)
}

// POST /query/snippet/{keyword}
#[server]
pub async fn query_snippet(keyword: String) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    use futures::TryStreamExt;

    let data = expect_context::<ServerData>();

    let mut cursor = data.client.query_snippets(&keyword).await.unwrap();

    let mut vec = Vec::new();
    while let Some(document) = cursor.try_next().await.unwrap() {
        vec.push(document);
    }
    let json = serde_json::to_string(&vec).unwrap();

    Ok(json)
}

// POST /query/page/{keyword}
#[server]
pub async fn query_page(keyword: String) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    use futures::TryStreamExt;

    let data = expect_context::<ServerData>();

    let mut cursor = data.client.query_pages(&keyword).await.unwrap();

    let mut vec = Vec::new();
    while let Some(document) = cursor.try_next().await.unwrap() {
        vec.push(document);
    }
    let json = serde_json::to_string(&vec).unwrap();

    Ok(json)
}

// POST /query/course/{keyword}
#[server]
pub async fn query_course(keyword: String) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    use futures::TryStreamExt;

    let data = expect_context::<ServerData>();

    let mut cursor = data.client.query_courses(&keyword).await.unwrap();

    let mut vec = Vec::new();
    while let Some(document) = cursor.try_next().await.unwrap() {
        vec.push(document);
    }
    let json = serde_json::to_string(&vec).unwrap();

    Ok(json)
}

// POST /query/universe/{keyword}
#[server]
pub async fn query_universe(keyword: String) -> Result<String, ServerFnError> {
    use crate::data::ServerData;
    use futures::TryStreamExt;

    let data = expect_context::<ServerData>();

    let mut cursor = data.client.query_universes(&keyword).await.unwrap();

    let mut vec = Vec::new();
    while let Some(document) = cursor.try_next().await.unwrap() {
        vec.push(document);
    }
    let json = serde_json::to_string(&vec).unwrap();

    Ok(json)
}
