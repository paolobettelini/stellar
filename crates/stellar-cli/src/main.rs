use args::*;
use clap::Parser;

use stellar_compile as compile;
use stellar_generate as generate;
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
        Command::Generate(args) => parse_generate_cmd(&args.command).await?,
        Command::Import(args) => parse_import_args(&args).await?,
        Command::Web(args) => parse_web_args(&args).await?,
        Command::Compile(args) => parse_compile_args(&args)?,
    }

    Ok(())
}

pub async fn parse_generate_cmd(cmd: &GenerateCommand) -> anyhow::Result<()> {
    match cmd {
        GenerateCommand::Snippets(args) => parse_gen_snippets_args(&args).await?,
        GenerateCommand::Pdf(args) => parse_gen_pdf_args(&args)?,
    }

    Ok(())
}

pub fn parse_gen_pdf_args(args: &GenPdfArgs) -> anyhow::Result<()> {
    let input = &args.input;
    let output = &args.output;
    let data = &args.data;

    generate::generate_pdf(input, output, data)?;

    Ok(())
}

pub async fn parse_gen_snippets_args(args: &GenSnippetsArgs) -> anyhow::Result<()> {
    let input = &args.input;
    let output = &args.data_output;

    let client = if let Some(url) = &args.connection_url {
        if args.import {
            let client = import::get_client(&url).await?;
            Some(client)
        } else {
            None
        }
    } else {
        None
    };

    generate::generate_snippets(input, output, client).await?;

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

pub fn parse_compile_args(args: &CompileArgs) -> anyhow::Result<()> {
    compile::compile(&args.path)?;

    Ok(())
}
