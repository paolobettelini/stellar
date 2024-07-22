use args::*;
use clap::Parser;

use stellar_check as check;
use stellar_import as import;
use stellar_pdfformat as pdfformat;
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
        Command::Check(args) => parse_check_args(&args).await?,
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
        client.as_ref(),
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

pub async fn parse_check_args(args: &CheckArgs) -> anyhow::Result<()> {
    let client = import::get_client(&args.connection_url).await?;

    let all_operations = !(args.existences || args.autoreferentiality || args.linearity);

    let mut self_reference_count = 0;
    let mut not_existent_snippets_count = 0;
    let mut not_existent_pages_count = 0;
    let mut not_existent_courses_count = 0;
    let mut not_linear_count = 0;

    if args.existences || all_operations {
        not_existent_snippets_count += check::check_snippet_existences(&client).await?;
        not_existent_snippets_count += check::check_page_existences(&client).await?;
        not_existent_pages_count += check::check_course_existences(&client).await?;
        not_existent_courses_count += check::check_universe_existences(&client).await?;
    }

    if args.autoreferentiality || all_operations {
        self_reference_count += check::check_autoreferentiality(&client).await?;
    }

    if args.linearity || all_operations {
        not_linear_count += check::check_linearity(&client).await?;
    }

    /* === LOG === */

    if args.autoreferentiality || all_operations {
        log::info!("Found {} self-reference(s)", self_reference_count);
    }

    if all_operations || args.existences {
        log::info!(
            "Found {} non-existent snippets",
            not_existent_snippets_count
        );

        log::info!("Found {} non-existent pages", not_existent_pages_count);

        log::info!("Found {} non-existent courses", not_existent_courses_count);
    }

    if all_operations || args.linearity {
        log::info!(
            "Found {} non-linear snippets",
            not_linear_count
        );
    }

    Ok(())
}
