use args::*;
use clap::Parser;


use stellar_generator as generator;
use stellar_import as import;
use stellar_web as web;

mod args;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize logging
    env_logger::init();

    let args = App::parse();

    match args.command {
        Command::Generator(args) => parse_generator_args(&args),
        Command::Import(args) => parse_import_args(&args).await?,
        Command::Web(args) => parse_web_args(&args).await?,
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

pub async fn parse_web_args(args: &WebArgs) -> anyhow::Result<()> {
    web::start_server(
        args.address,
        args.port,
        &args.connection_url,
        args.data.clone(),
        args.www.clone(),
    )
    .await?;

    Ok(())
}
