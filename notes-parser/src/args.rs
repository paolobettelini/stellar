pub use clap::{ArgGroup, Parser};
use std::path::PathBuf;

/// Notes parser CLI
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
pub struct Args {
    /// LaTex file
    #[arg(short = 'i', long)]
    pub input: PathBuf,

    /// Output director for .tex files
    #[arg(short = 'o', long)]
    pub output: PathBuf,
}
