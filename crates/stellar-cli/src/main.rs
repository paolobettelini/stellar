use args::*;
use clap::Parser;
use std::{
    path::{PathBuf},
};

use stellar_import as import;
use stellar_generator as generator;

mod args;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize logging
    env_logger::init();

    let args = App::parse();

    match args.command {
        Command::Generator(args) => parse_generator_args(&args),
        Command::Import(args) => parse_import_args(&args).await?,
    }

    Ok(())
}

pub fn parse_generator_args(args: &GeneratorArgs) {
    let input = &args.latex_input;
    let output = &args.data_output;
    generator::generate_from_latex(input, output);
}

pub async fn parse_import_args(args: &ImportArgs) -> anyhow::Result<()> {
    if let Some(paths) = &args.import {
        for path in paths {
            // TODO check error
            let url = &args.connection_url;
            import::import(url, path).await?;
        }
    }

    Ok(())
}