pub use clap::{ArgGroup, Parser};
use std::path::PathBuf;

/// Notes parser CLI
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
pub struct Args {
    /// LaTex file
    #[arg(short = 'i', long)]
    #[arg(short, long, requires = "output")]
    pub input: Option<PathBuf>,

    /// Output director for .tex files
    #[arg(short = 'o', long)]
    #[arg(short, long, requires = "input")]
    pub output: Option<PathBuf>,
}
