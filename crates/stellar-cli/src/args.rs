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
    /// Import message for compile.
    Compile(CompileArgs),
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

#[derive(Parser, Debug)]
pub struct GenerateArgs {
    #[clap(subcommand)]
    pub command: GenerateCommand,
}

#[derive(Debug, Subcommand)]
pub enum GenerateCommand {
    /// Help message for snippets
    Snippets(GenSnippetsArgs),

    /// Help message for PDF
    Pdf(GenPdfArgs),
}

#[derive(Debug, Args)]
pub struct GenSnippetsArgs {
    /// Generate data from a PDF file
    #[arg(short = 'i', long)]
    pub input: PathBuf,

    /// Output for generated data (uncompiled .tex files)
    #[arg(short = 'o', long)]
    pub data_output: PathBuf,

    /// Import the generated snippets
    #[arg(long, default_value_t = false, requires = "connection_url")]
    pub import: bool,

    /// MongoDB connection URL
    #[arg(short, long)]
    pub connection_url: Option<String>,

    /// Snippet cut top offset
    #[arg(long, default_value_t = -19.8)]
    pub top_offset: f64,
    
    /// Snippet cut width
    #[arg(long, default_value_t = 451.5)]
    pub width: f64,

    /// Snippet cut bottom offset
    #[arg(long, default_value_t = 3.8)]
    pub bottom_offset: f64,
}

#[derive(Debug, Args)]
pub struct GenPdfArgs {
    /// Generate a PDF with snippets from a PDF file
    #[arg(short = 'i', long)]
    pub input: PathBuf,

    /// Output for the generated PDF
    #[arg(short = 'o', long)]
    pub output: PathBuf,

    /// Data folder to read snippets
    #[arg(short, long)]
    pub data: PathBuf,
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

#[derive(Debug, Args)]
pub struct CompileArgs {
    /// Path to compile
    #[arg(short, long)]
    pub path: PathBuf,
}

fn default_address() -> IpAddr {
    IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0))
}
