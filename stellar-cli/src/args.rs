pub use clap::{ArgGroup, Parser};
use std::path::PathBuf;

/// Notes parser CLI
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
pub struct Args {
    /// LaTex file
    #[arg(short, long, requires = "data_output")]
    #[arg(short = 'i', long)]
    pub latex_input: Option<PathBuf>,

    /// Output director for .tex files
    #[arg(short, long, requires = "latex_input")]
    #[arg(short = 'o', long)]
    pub data_output: Option<PathBuf>,
}
