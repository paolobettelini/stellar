pub use clap::{ArgGroup, Parser};
use std::path::PathBuf;

pub use std::net::{IpAddr, Ipv4Addr};

/// Notes Server
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
pub struct Args {
    /// Listening address
    #[arg(short, long, default_value_t = default_address())]
    pub address: IpAddr,

    /// Listening port
    #[arg(short, long, default_value_t = 8080)]
    pub port: u16,

    /// WWW static files folder
    #[arg(short, long)]
    pub www: PathBuf,

    /// Data folder
    #[arg(short, long)]
    pub data: PathBuf,

    /// MongoDB Connection URL
    #[arg(short, long)]
    pub connection_url: String,
}

fn default_address() -> IpAddr {
    IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0))
}
