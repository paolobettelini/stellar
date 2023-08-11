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
    Generator(GeneratorArgs),
    /// Help message for import.
    Import(ImportArgs),
    /// Help message for web.
    Web(WebArgs),
}

#[derive(Debug, Args)]
pub struct ImportArgs {
    /// MongoDB connection URL
    #[arg(short = 'u', long)]
    pub connection_url: String,

    /// Import data/snippets/pages/courses folder or single snippet/page/course
    #[arg(long)]
    pub import: Option<Vec<PathBuf>>,
}

#[derive(Debug, Args)]
pub struct GeneratorArgs {
    /// Generate data from a LaTex file
    #[arg(short = 'i', long)]
    pub latex_input: PathBuf,

    /// Output for generated data (uncompiled .tex files)
    #[arg(short = 'o', long)]
    pub data_output: PathBuf,
}

#[derive(Debug, Args)]
pub struct WebArgs {
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
