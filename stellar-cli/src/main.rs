mod args;
mod latex;

use std::{path::Path, fs};
use args::*;

use serde_json::{json, Value};

fn main() {
    // Initialize logging
    env_logger::init();

    let args = Args::parse();

    if let Some(input) = &args.latex_input {
        if let Some(output) = &args.data_output {
            latex::generate_from_latex(input, output);
            // TOOD check result
            log::info!("Remember to compile the snippets");
        }
    }
}
