use clap::{Args, Parser, Subcommand};
use std::{
    net::{IpAddr, Ipv4Addr},
    path::PathBuf,
};

/// Stellar CLI
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
pub struct App {
    #[clap(subcommand)]
    pub command: Command,
}

#[derive(Debug, Subcommand)]
pub enum Command {
    /// Help message for generator.
    Generate(GenerateArgs),
    /// Help message for import.
    Import(ImportArgs),
    /// Help message for web.
    Web(WebArgs),
}

#[derive(Debug, Args)]
pub struct ImportArgs {
    /// MongoDB connection URL
    #[arg(short, long)]
    pub connection_url: String,

    /// Import data/snippets/pages/courses folder or single snippet/page/course
    #[arg(short, long, value_delimiter = ' ', num_args = 1..)]
    pub import: Option<Vec<PathBuf>>,
}

#[derive(Debug, Args)]
pub struct GenerateArgs {
    /// Generate data from a PDF file
    #[arg(short = 'i', long)]
    pub input: PathBuf,

    /// Output for generated data
    #[arg(short = 'o', long)]
    pub data_output: PathBuf,

    /// Import the generated snippets
    #[arg(long, default_value_t = false, requires = "connection_url")]
    pub import: bool,

    /// MongoDB connection URL
    #[arg(short, long)]
    pub connection_url: Option<String>,

    /// Snippet cut top offset
    #[arg(long, default_value_t = -20.0)]
    pub top_offset: f64,

    /// Snippet cut bottom offset
    #[arg(long, default_value_t = 2.5)]
    pub bottom_offset: f64,

    /// Snippet cut left margin
    #[arg(long)]
    pub left_margin: Option<f64>,

    /// Snippet cut right margin
    #[arg(long)]
    pub right_margin: Option<f64>,
}

#[derive(Debug, Args)]
pub struct WebArgs {
    /// Listening address
    #[arg(short, long, default_value_t = default_address())]
    pub address: IpAddr,

    /// Listening port
    #[arg(short, long, default_value_t = 8080)]
    pub port: u16,

    /// Data folder
    #[arg(short, long)]
    pub data: PathBuf,

    /// MongoDB Connection URL
    #[arg(short, short, long)]
    pub connection_url: String,
}

fn default_address() -> IpAddr {
    IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0))
}
