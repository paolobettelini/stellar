use std::path::PathBuf;
use stellar_database::*;
#[derive(Debug, Clone)]
pub(crate) struct ServerData {
    pub client: ClientHandler,
    pub data_folder: PathBuf,
}
