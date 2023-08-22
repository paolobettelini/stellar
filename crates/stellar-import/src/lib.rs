pub use stellar_database::ClientHandler;

mod import;
mod pathbuf_type;

pub use import::*;
pub use pathbuf_type::*;

pub async fn get_client(connection_url: &str) -> anyhow::Result<ClientHandler> {
    let client = ClientHandler::new(connection_url).await?;
    //client.create_indexes();
    Ok(client)
}
