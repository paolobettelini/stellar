use serde::Deserialize;
use std::{fs, path::Path};
use std::error::Error;
use std::net::IpAddr;
use std::path::PathBuf;

#[derive(Clone, Debug, Deserialize)]
pub struct StellarConfig {
    pub server: StellarServerConf,
    pub ogp: StellarOPGConf,
}

#[derive(Clone, Debug, Deserialize)]
pub struct StellarServerConf {
    pub address: IpAddr,
    pub port: u16,
    #[serde(rename(deserialize = "connection-url"))]
    pub connection_url: String,
    #[serde(rename(deserialize = "data-folder"))]
    pub data_folder: PathBuf,
}

#[derive(Clone, Debug, Deserialize)]
pub struct StellarOPGConf {
    pub title: Option<String>,
    pub description: Option<String>,
    #[serde(default = "default_false")]
    #[serde(rename(deserialize = "data-folder"))]
    pub requires_https: bool,
    pub url: Option<String>,
}

impl Default for StellarConfig {
    fn default() -> Self {
        let default_config = include_str!("../default_config.toml");
        toml::from_str(&default_config).unwrap()
    }
}

pub fn parse_toml_config<P: AsRef<Path>, ConfigType: for<'a> Deserialize<'a>>(
    config_path: P,
) -> Result<Box<ConfigType>, Box<dyn Error>> {
    let content = fs::read_to_string(config_path)?;

    let config = toml::from_str(&content)?;

    Ok(Box::new(config))
}

fn default_false() -> bool {
    false
}