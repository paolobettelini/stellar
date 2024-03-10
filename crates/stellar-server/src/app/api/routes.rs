use leptos::*;
use std::path::Path;

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
    let file = &Path::new(&data.data_folder)
        .join("pages")
        .join(&file_name);
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
