use crate::config::StellarConfig;
use stellar_database::*;

#[derive(Debug, Clone)]
pub(crate) struct ServerData {
    pub client: ClientHandler,
    pub config: StellarConfig,
}
