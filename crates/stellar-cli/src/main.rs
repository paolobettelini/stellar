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
        Command::Generate(args) => parse_generate_args(&args).await?,
        Command::Import(args) => parse_import_args(&args).await?,
        Command::Web(args) => parse_web_args(&args).await?,
        Command::Compile(args) => parse_compile_args(&args)?,
    }

    Ok(())
}

pub async fn parse_generate_args(args: &GenerateArgs) -> anyhow::Result<()> {
    let input = &args.latex_input;
    let output = &args.data_output;
    let gen_page = !args.no_gen_page;
    let gen_course = args.gen_course;

    let compile = if let Some(search_path) = &args.search_path {
        if args.compile {
            Some(search_path)
        } else {
            None
        }
    } else {
        None
    };

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

    generate::generate_from_latex(input, output, gen_page, gen_course, client, compile).await;

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
    compile::compile(&args.path, &args.search_path)?;

    Ok(())
}
