use args::*;
use clap::Parser;

use stellar_pdfformat as pdfformat;
use stellar_import as import;
use stellar_server as web;

mod args;

const LOG_ENV: &str = "RUST_LOG";

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize logging
    if std::env::var(LOG_ENV).is_err() {
        std::env::set_var(LOG_ENV, "info");
    }

    env_logger::init();

    let args = App::parse();

    match args.command {
        Command::Generate(args) => parse_generate_cmd(&args).await?,
        Command::Import(args) => parse_import_args(&args).await?,
        Command::Web(args) => parse_web_args(&args).await?,
    }

    Ok(())
}

pub async fn parse_generate_cmd(args: &GenerateArgs) -> anyhow::Result<()> {
    let input = &args.input;
    let output = &args.data_output;

    let client = if let Some(url) = &args.connection_url {
        if args.import {
            let client = import::get_client(url).await?;
            Some(client)
        } else {
            None
        }
    } else {
        None
    };

    let top_offset = args.top_offset;
    let bottom_offset = args.bottom_offset;
    let left_margin = args.left_margin;
    let right_margin = args.right_margin;

    pdfformat::generate_snippets(
        input,
        output,
        &client,
        top_offset,
        bottom_offset,
        left_margin,
        right_margin,
    )
    .await?;

    Ok(())
}

pub async fn parse_import_args(args: &ImportArgs) -> anyhow::Result<()> {
    if let Some(paths) = &args.import {
        let client = import::get_client(&args.connection_url).await?;

        for path in paths {
            // TODO check error
            import::import_with_client(&client, path).await?;
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
    )
    .await?;

    Ok(())
}