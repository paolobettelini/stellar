use crate::get_client;
use std::{
    fs,
    path::{Path, PathBuf},
};
use stellar_utils::pathbuf_type::{get_path_type, PathBufType};
use stellar_database::{model::*, *};

pub async fn import(url: &str, path: &PathBuf) -> anyhow::Result<()> {
    let data_type = get_path_type(path);

    match data_type {
        PathBufType::DataFolder => import_data(url, path).await?,
        PathBufType::SnippetsFolder => import_snippets(url, path).await?,
        PathBufType::PagesFolder => import_pages(url, path).await?,
        PathBufType::CoursesFolder => import_courses(url, path).await?,
        PathBufType::UniversesFolder => import_universes(url, path).await?,
        PathBufType::SnippetsFile => import_snippet(url, path).await?,
        PathBufType::PagesFile => import_page(url, path).await?,
        PathBufType::CoursesFile => import_course(url, path).await?,
        PathBufType::UniversesFile => import_universe(url, path).await?,
        PathBufType::Other => log::error!("Path does not point to valid data"),
    }

    Ok(())
}

pub async fn import_data(connection_url: &str, folder: &Path) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    log::info!("Importing data");

    import_snippets_with_client(&client, &folder.join("snippets")).await?;
    import_pages_with_client(&client, &folder.join("pages")).await?;
    import_courses_with_client(&client, &folder.join("courses")).await?;
    import_universes_with_client(&client, &folder.join("universes")).await?;

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

pub async fn import_universes(connection_url: &str, folder: &PathBuf) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    log::info!("Importing universes");

    import_universes_with_client(&client, folder).await?;

    Ok(())
}

pub async fn import_snippet(connection_url: &str, file: &Path) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    import_snippet_with_client(&client, file).await?;

    Ok(())
}

pub async fn import_page(connection_url: &str, file: &Path) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    import_page_with_client(&client, file).await?;

    Ok(())
}

pub async fn import_course(connection_url: &str, file: &Path) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    import_course_with_client(&client, file).await?;

    Ok(())
}

pub async fn import_universe(connection_url: &str, file: &Path) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    import_universe_with_client(&client, file).await?;

    Ok(())
}

pub async fn import_with_client(client: &ClientHandler, path: &PathBuf) -> anyhow::Result<()> {
    let data_type = get_path_type(path);

    match data_type {
        PathBufType::DataFolder => import_data_with_client(client, path).await?,
        PathBufType::SnippetsFolder => import_snippets_with_client(client, path).await?,
        PathBufType::PagesFolder => import_pages_with_client(client, path).await?,
        PathBufType::CoursesFolder => import_courses_with_client(client, path).await?,
        PathBufType::UniversesFolder => import_universes_with_client(client, path).await?,
        PathBufType::SnippetsFile => import_snippet_with_client(client, path).await?,
        PathBufType::PagesFile => import_page_with_client(client, path).await?,
        PathBufType::CoursesFile => import_course_with_client(client, path).await?,
        PathBufType::UniversesFile => import_universe_with_client(client, path).await?,
        PathBufType::Other => log::error!("Path does not point to valid data"),
    }

    Ok(())
}

pub async fn import_data_with_client(client: &ClientHandler, folder: &Path) -> anyhow::Result<()> {
    log::info!("Importing data");

    import_snippets_with_client(client, &folder.join("snippets")).await?;
    import_pages_with_client(client, &folder.join("pages")).await?;
    import_courses_with_client(client, &folder.join("courses")).await?;
    import_universes_with_client(client, &folder.join("universes")).await?;

    Ok(())
}

pub async fn import_snippets_with_client(
    client: &ClientHandler,
    folder: &PathBuf,
) -> anyhow::Result<()> {
    if let Ok(entries) = fs::read_dir(folder) {
        for file in entries.flatten() {
            import_snippet_with_client(client, &file.path()).await?;
        }
    }

    Ok(())
}

pub async fn import_pages_with_client(
    client: &ClientHandler,
    folder: &PathBuf,
) -> anyhow::Result<()> {
    if let Ok(entries) = fs::read_dir(folder) {
        for file in entries.flatten() {
            import_page_with_client(client, &file.path()).await?;
        }
    }

    Ok(())
}

pub async fn import_courses_with_client(
    client: &ClientHandler,
    folder: &PathBuf,
) -> anyhow::Result<()> {
    if let Ok(entries) = fs::read_dir(folder) {
        for file in entries.flatten() {
            import_course_with_client(client, &file.path()).await?;
        }
    }

    Ok(())
}

pub async fn import_universes_with_client(
    client: &ClientHandler,
    folder: &PathBuf,
) -> anyhow::Result<()> {
    if let Ok(entries) = fs::read_dir(folder) {
        for file in entries.flatten() {
            import_universe_with_client(client, &file.path()).await?;
        }
    }

    Ok(())
}

pub async fn import_snippet_with_client(client: &ClientHandler, file: &Path) -> anyhow::Result<()> {
    if let Some(file_name) = file.file_name() {
        if let Some(file_name) = file_name.to_str() {
            let id = remove_extension(file_name);
            log::info!("Importing snippet: {file_name}");

            let snippet_path = file.join(format!("{}.pdf", &id));
            let references = stellar_parser::parse_snippet_references(&snippet_path).unwrap_or(vec![]);

            let references = if references.len() == 0 {
                None
            } else {
                Some(references)
            };

            let snippet = Snippet {
                id: id.to_string(),
                references,
            };
            client.insert_snippet(&snippet).await?;
        }
    }

    Ok(())
}

pub async fn import_page_with_client(client: &ClientHandler, file: &Path) -> anyhow::Result<()> {
    if let Some(file_name) = file.file_name() {
        if let Some(file_name) = file_name.to_str() {
            let file_name = remove_extension(file_name);
            log::info!("Importing page: {file_name}");
            let page = Page {
                id: file_name.to_string(),
                snippets: vec![], // TODO
            };
            client.insert_page(&page).await?;
        }
    }

    Ok(())
}

pub async fn import_course_with_client(client: &ClientHandler, file: &Path) -> anyhow::Result<()> {
    if let Some(file_name) = file.file_name() {
        if let Some(file_name) = file_name.to_str() {
            let file_name = remove_extension(file_name);
            log::info!("Importing course: {file_name}");
            let course = Course {
                id: file_name.to_string(),
                pages: vec![], // TODO
            };
            client.insert_course(&course).await?;
        }
    }

    Ok(())
}

pub async fn import_universe_with_client(
    client: &ClientHandler,
    file: &Path,
) -> anyhow::Result<()> {
    if let Some(file_name) = file.file_name() {
        if let Some(file_name) = file_name.to_str() {
            let file_name = remove_extension(file_name);
            log::info!("Importing universe: {file_name}");
            let universe = Universe {
                id: file_name.to_string(),
                courses: vec![], // TODO
                dependencies: vec![], // TODO
            };
            client.insert_universe(&universe).await?;
        }
    }

    Ok(())
}

fn remove_extension(file_name: &str) -> &str {
    match file_name.rfind('.') {
        Some(index) => &file_name[..index],
        None => file_name,
    }
}
