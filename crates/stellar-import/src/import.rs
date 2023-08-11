use std::{fs, path::PathBuf};
use stellar_database::{model::*, *};
use crate::{PathBufType, get_path_type};

pub async fn import(url: &str, path: &PathBuf) -> anyhow::Result<()> {
    let data_type = get_path_type(path);

    match data_type {
        PathBufType::DataFolder => import_data(url, path).await?,
        PathBufType::SnippetsFolder => import_snippets(url, path).await?,
        PathBufType::PagesFolder => import_pages(url, path).await?,
        PathBufType::CoursesFolder => import_courses(url, path).await?,
        PathBufType::SnippetsFile => import_snippet(url, path).await?,
        PathBufType::PagesFile => import_page(url, path).await?,
        PathBufType::CoursesFile => import_course(url, path).await?,
        PathBufType::Other => log::error!("Path does not point to valid data"),
    }

    Ok(())
}

pub async fn import_data(connection_url: &str, folder: &PathBuf) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    log::info!("Importing data");

    import_snippets_with_client(&client, &folder.join("snippets")).await?;
    import_pages_with_client(&client, &folder.join("pages")).await?;
    import_courses_with_client(&client, &folder.join("courses")).await?;

    Ok(())
}

pub async fn import_snippets(connection_url: &str, folder: &PathBuf) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    log::info!("Importing snippets");

    import_snippets_with_client(&client, folder).await?;

    Ok(())
}

pub async fn import_pages(connection_url: &str, folder: &PathBuf) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    log::info!("Importing pages");

    import_pages_with_client(&client, folder).await?;

    Ok(())
}

pub async fn import_courses(connection_url: &str, folder: &PathBuf) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    log::info!("Importing courses");

    import_courses_with_client(&client, folder).await?;

    Ok(())
}

pub async fn import_snippet(connection_url: &str, file: &PathBuf) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    import_snippet_with_client(&client, file).await?;

    Ok(())
}

pub async fn import_page(connection_url: &str, file: &PathBuf) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    import_page_with_client(&client, file).await?;

    Ok(())
}

pub async fn import_course(connection_url: &str, file: &PathBuf) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    import_course_with_client(&client, file).await?;

    Ok(())
}

async fn import_snippets_with_client(
    client: &ClientHandler,
    folder: &PathBuf,
) -> anyhow::Result<()> {
    if let Ok(entries) = fs::read_dir(folder) {
        for entry in entries {
            if let Ok(file) = entry {
                import_snippet_with_client(client, &file.path()).await?;
            }
        }
    }

    Ok(())
}

async fn import_pages_with_client(client: &ClientHandler, folder: &PathBuf) -> anyhow::Result<()> {
    if let Ok(entries) = fs::read_dir(folder) {
        for entry in entries {
            if let Ok(file) = entry {
                import_page_with_client(client, &file.path()).await?;
            }
        }
    }

    Ok(())
}

async fn import_courses_with_client(
    client: &ClientHandler,
    folder: &PathBuf,
) -> anyhow::Result<()> {
    if let Ok(entries) = fs::read_dir(folder) {
        for entry in entries {
            if let Ok(file) = entry {
                import_course_with_client(client, &file.path()).await?;
            }
        }
    }

    Ok(())
}

async fn import_snippet_with_client(
    client: &ClientHandler,
    file: &PathBuf,
) -> anyhow::Result<()> {
    if let Some(file_name) = file.file_name() {
        if let Some(file_name) = file_name.to_str() {
            let file_name = remove_extension(file_name);
            log::info!("Importing snippet: {file_name}");
            let snippet = Snippet {
                id: file_name.to_string(),
            };
            client.insert_snippet(&snippet, None).await?;
        }
    }

    Ok(())
}

async fn import_page_with_client(
    client: &ClientHandler,
    file: &PathBuf,
) -> anyhow::Result<()> {
    if let Some(file_name) = file.file_name() {
        if let Some(file_name) = file_name.to_str() {
            let file_name = remove_extension(file_name);
            log::info!("Importing page: {file_name}");
            let page = Page {
                id: file_name.to_string(),
            };
            client.insert_page(&page, None).await?;
        }
    }

    Ok(())
}

async fn import_course_with_client(
    client: &ClientHandler,
    file: &PathBuf,
) -> anyhow::Result<()> {
    if let Some(file_name) = file.file_name() {
        if let Some(file_name) = file_name.to_str() {
            let file_name = remove_extension(file_name);
            log::info!("Importing course: {file_name}");
            let course = Course {
                id: file_name.to_string(),
            };
            client.insert_course(&course, None).await?;
        }
    }

    Ok(())
}

async fn get_client(connection_url: &str) -> anyhow::Result<ClientHandler> {
    let client = ClientHandler::new(connection_url).await?;
    //client.create_indexes();
    Ok(client)
}

fn remove_extension(file_name: &str) -> &str {
    match file_name.rfind('.') {
        Some(index) => &file_name[..index],
        None => file_name,
    }
}
