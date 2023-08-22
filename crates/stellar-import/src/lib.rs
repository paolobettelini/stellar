pub use stellar_database::ClientHandler;

mod import;

pub use import::*;

// Maybe this should be in stellar-database
pub async fn get_client(connection_url: &str) -> anyhow::Result<ClientHandler> {
    let client = ClientHandler::new(connection_url).await?;
    //client.create_indexes();
    Ok(client)
}
