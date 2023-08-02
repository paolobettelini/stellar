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
    #[arg(short = 'u', long)]
    pub connection_url: Option<String>,

    /// Import data/snippets/pages/courses folder or single snippet/page/course
    #[arg(long, requires = "connection_url")]
    pub import: Option<Vec<PathBuf>>,
}
