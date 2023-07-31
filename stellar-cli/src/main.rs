mod args;
mod latex;

use std::{path::Path, fs};
use args::*;

use serde_json::{json, Value};

fn main() {
    let args = Args::parse();

    if let Some(input) = &args.input {
        if let Some(output) = &args.output {
            latex::generate_from_latex(input, output);
        }
    }
}
