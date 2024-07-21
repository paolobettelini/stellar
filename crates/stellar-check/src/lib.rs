use futures::TryStreamExt;

use stellar_database::ClientHandler;
use stellar_database as database;

pub async fn check_autoreferentiality(client: &ClientHandler) -> anyhow::Result<u32> {
    log::info!("Checking existence of snippet references in snippets");

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

pub async fn check_snippet_existences(client: &ClientHandler) -> anyhow::Result<()> {
    log::info!("Checking existence of snippets in pages");
    Ok(())
}

pub async fn check_page_existences(client: &ClientHandler) -> anyhow::Result<()> {
    log::info!("Checking existence of pages in courses");
    Ok(())
}

pub async fn check_course_existences(client: &ClientHandler) -> anyhow::Result<()> {
    log::info!("Checking existence of courses in universes");
    Ok(())
}

pub async fn check_universe_existences(client: &ClientHandler) -> anyhow::Result<()> {
    log::info!("Checking snippets autoreferentiality");
    Ok(())
}

pub async fn check_pages_linearity(client: &ClientHandler) -> anyhow::Result<()> {
    log::info!("Checking snippets linearity in pages");
    Ok(())
}

pub async fn check_courses_linearity(client: &ClientHandler) -> anyhow::Result<()> {
    log::info!("Checking snippets linearity in courses");
    Ok(())
}

pub async fn check_universes_linearity(client: &ClientHandler) -> anyhow::Result<()> {
    log::info!("Checking snippets linearity in universes");
    Ok(())
}