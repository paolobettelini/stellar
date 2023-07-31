pub use clap::{ArgGroup, Parser};
use std::path::PathBuf;

/// Notes parser CLI
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
#[command(group(
    ArgGroup::new("import")
        .required(false)
        .args([
            "import_data",
            "import_snippets",
            "import_pages",
            "import_courses"
        ]),
))]
pub struct Args {
    /// Generate data from a LaTex file
    #[arg(short = 'i', long, requires = "data_output")]
    pub latex_input: Option<PathBuf>,

    /// Output for generated data (uncompiled .tex files)
    #[arg(short = 'o', long, requires = "latex_input")]
    pub data_output: Option<PathBuf>,

    /// MongoDB connection URL
    #[arg(short = 'u', long, requires = "import")]
    pub connection_url: Option<String>,

    /// Import data folder
    #[arg(long, requires = "connection_url")]
    pub import_data: Option<PathBuf>,

    /// Import snippets folder
    #[arg(long, requires = "connection_url")]
    pub import_snippets: Option<PathBuf>,

    /// Import pages folder
    #[arg(long, requires = "connection_url")]
    pub import_pages: Option<PathBuf>,

    /// Import courses folder
    #[arg(long, requires = "connection_url")]
    pub import_courses: Option<PathBuf>,
}
