use std::path::PathBuf;
use stellar_database::*;
use crate::config::StellarConfig;

#[derive(Debug, Clone)]
pub(crate) struct ServerData {
    pub client: ClientHandler,
    pub config: StellarConfig,
}
