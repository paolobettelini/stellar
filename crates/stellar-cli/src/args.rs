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
    /// Help message for check.
    Check(CheckArgs),
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
    #[arg(short, long)]
    pub address: Option<IpAddr>,

    /// Listening port
    #[arg(short, long)]
    pub port: Option<u16>,

    /// Data folder
    #[arg(short, long)]
    pub data: Option<PathBuf>,

    /// MongoDB Connection URL
    #[arg(short, long)]
    pub connection_url: Option<String>,

    /// Config file
    #[arg(long)]
    pub config: Option<PathBuf>,
}

#[derive(Debug, Args)]
pub struct CheckArgs {
    /// MongoDB connection URL
    #[arg(short, long)]
    pub connection_url: String,

    /// Check only existance of references
    /// E.g. existance for courses checks whether the pages exist
    #[arg(short, long)]
    pub existences: bool,

    /// Check only snippets self-reference
    #[arg(short, long)]
    pub autoreferentiality: bool,

    /// Check only snippets linearity
    #[arg(short, long)]
    pub linearity: bool,
}
