use clap::{Args, Parser, Subcommand};
use std::path::PathBuf;

/// Stellar CLI
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
pub struct App {
    #[clap(subcommand)]
    pub command: Command,
}

#[derive(Debug, Subcommand)]
pub enum Command {
    Generator(GeneratorArgs),
    Import(ImportArgs),
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
