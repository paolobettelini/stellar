

use stellar_database::*;
use std::path::PathBuf;
#[derive(Debug, Clone)]
pub(crate) struct ServerData {
    pub client: ClientHandler,
    pub data_folder: PathBuf,
}