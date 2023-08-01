use args::*;

use std::{
    path::{PathBuf},
};

mod args;
mod import;
mod latex;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize logging
    env_logger::init();

    let args = Args::parse();

    if let Some(input) = &args.latex_input {
        if let Some(output) = &args.data_output {
            generate_from_latex(input, output);
        }
    }

    if let Some(url) = &args.connection_url {
        if let Some(folder) = &args.import_data {
            import_data(url, folder).await;
        } else if let Some(folder) = &args.import_courses {
            import_snippets(url, folder).await;
        } else if let Some(folder) = &args.import_pages {
            import_pages(url, folder).await;
        } else if let Some(folder) = &args.import_snippets {
            import_courses(url, folder).await;
        }
    }

    Ok(())
}

fn generate_from_latex(input: &PathBuf, output: &PathBuf) {
    latex::generate_from_latex(input, output);
    // TOOD check result
    log::info!("Remember to compile the snippets");
}

async fn import_data(connection_url: &str, folder: &PathBuf) {
    // TODO check error
    let _res = import::import_data(connection_url, folder).await;
}

async fn import_snippets(connection_url: &str, folder: &PathBuf) {
    // TODO check error
    let _res = import::import_snippets(connection_url, folder).await;
}

async fn import_pages(connection_url: &str, folder: &PathBuf) {
    // TODO check error
    let _res = import::import_pages(connection_url, folder).await;
}

async fn import_courses(connection_url: &str, folder: &PathBuf) {
    // TODO check error
    let _res = import::import_courses(connection_url, folder).await;
}
