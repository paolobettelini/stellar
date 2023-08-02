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
        if let Some(paths) = &args.import {
            for path in paths {
                // TODO check error
                import::import(url, path).await?;
            }
        }
    }

    Ok(())
}

fn generate_from_latex(input: &PathBuf, output: &PathBuf) {
    latex::generate_from_latex(input, output);
    // TOOD check result
    log::info!("Remember to compile the snippets");
}
