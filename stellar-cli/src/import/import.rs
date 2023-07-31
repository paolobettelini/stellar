use std::{fs, path::PathBuf};
use stellar_database::{*, model::*};

pub async fn import_data(connection_url: &str, folder: &PathBuf) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    import_snippets_with_client(&client, folder).await?;
    import_pages_with_client(&client, folder).await?;
    import_courses_with_client(&client, folder).await?;

    Ok(())
}

pub async fn import_snippets(connection_url: &str, folder: &PathBuf) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    import_snippets_with_client(&client, folder).await?;

    Ok(())
}

pub async fn import_pages(connection_url: &str, folder: &PathBuf) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    import_pages_with_client(&client, folder).await?;

    Ok(())
}

pub async fn import_courses(connection_url: &str, folder: &PathBuf) -> anyhow::Result<()> {
    let client = get_client(connection_url).await?;

    import_courses_with_client(&client, folder).await?;

    Ok(())
}

async fn import_snippets_with_client(client: &ClientHandler, folder: &PathBuf) -> anyhow::Result<()> {
    let folder = folder.join("snippets");

    if let Ok(entries) = fs::read_dir(folder) {
        for entry in entries {
            if let Ok(entry) = entry {
                if let Some(file_name) = entry.file_name().to_str() {
                    let file_name = remove_extension(file_name);
                    log::info!("Importing snippet: {file_name}");
                    let snippet = Snippet { id: file_name.to_string() };
                    client.insert_snippet(&snippet, None).await?;
                }
            }
        }
    }
    
    Ok(())
}

async fn import_pages_with_client(client: &ClientHandler, folder: &PathBuf) -> anyhow::Result<()> {
    let folder = folder.join("pages");
    
    if let Ok(entries) = fs::read_dir(folder) {
        for entry in entries {
            if let Ok(entry) = entry {
                if let Some(file_name) = entry.file_name().to_str() {
                    let file_name = remove_extension(file_name);
                    log::info!("Importing page: {file_name}");
                    let page = Page { id: file_name.to_string() };
                    let res = client.insert_page(&page, None).await;
                    println!("{:?}", res);
                }
            }
        }
    }

    Ok(())
}

async fn import_courses_with_client(client: &ClientHandler, folder: &PathBuf) -> anyhow::Result<()> {
    let folder = folder.join("courses");
    
    if let Ok(entries) = fs::read_dir(folder) {
        for entry in entries {
            if let Ok(entry) = entry {
                if let Some(file_name) = entry.file_name().to_str() {
                    // It's not really necessary to remove the extension
                    // since they should be folders.
                    let file_name = remove_extension(file_name);
                    log::info!("Importing course: {file_name}");
                    let course = Course { id: file_name.to_string() };
                    client.insert_course(&course, None).await?;
                }
            }
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