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
    #[arg(short = 'w', long)]
    pub www: PathBuf,

    /// Courses folder
    #[arg(short = 'c', long)]
    pub courses: PathBuf,

    /// Pages folder
    #[arg(short = 'p', long)]
    pub pages: PathBuf,

    /// Snippets folder
    #[arg(short = 's', long)]
    pub snippets: PathBuf,
}

fn default_address() -> IpAddr {
    IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0))
}

macro_rules! path_str {
    ($v:expr) => {
        String::from($v.to_string_lossy())
    };
}

pub(crate) use path_str;
