pub use clap::{ArgGroup, Parser};
use std::path::PathBuf;

/// Notes parser CLI
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
pub struct Args {
    /// Generate data from a LaTex file
    #[arg(short = 'i', long, requires = "data_output")]
    pub latex_input: Option<PathBuf>,

    /// Output for generated data (uncompiled .tex files)
    #[arg(short = 'o', long, requires = "latex_input")]
    pub data_output: Option<PathBuf>,

    /// MongoDB connection URL
    pub connection_url: Option<String>,

    /// Import data folder
    #[arg(requires = "connection_url")]
    pub import_data: Option<PathBuf>,

    /// Import snippets folder
    #[arg(requires = "connection_url")]
    pub import_snippets: Option<PathBuf>,

    /// Import pages folder
    #[arg(requires = "connection_url")]
    pub import_pages: Option<PathBuf>,

    /// Import courses folder
    #[arg(requires = "connection_url")]
    pub import_courses: Option<PathBuf>,
}
