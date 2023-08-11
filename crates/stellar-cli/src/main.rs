use args::*;
use clap::Parser;
use std::{
    path::{PathBuf},
};

mod args;
mod import;
mod generator;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize logging
    env_logger::init();

    let args = App::parse();

    match args.command {
        Command::Generator(args) => parse_generator_args(&args),
        Command::Database(args) => parse_database_args(&args).await?,
    }

    Ok(())
}

pub fn parse_generator_args(args: &GeneratorArgs) {
    let input = &args.latex_input;
    let output = &args.data_output;
    generator::generate_from_latex(input, output);
}

pub async fn parse_database_args(args: &DatabaseArgs) -> anyhow::Result<()> {
    if let Some(paths) = &args.import {
        for path in paths {
            // TODO check error
            let url = &args.connection_url;
            import::import(url, path).await?;
        }
    }

    Ok(())
}