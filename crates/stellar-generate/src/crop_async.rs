use stellar_parser::pdf_parser::*;
use stellar_parser::{Cmd::*, *};
use std::process::{Command, Stdio};
use std::{
    fs,
    path::{Path, PathBuf},
};

use std::sync::{Arc, Mutex};
use std::thread;
use std::thread::JoinHandle;
use std::time::Duration;
use std::sync::mpsc::Receiver;

pub struct CropPdfData {
    pub input: PathBuf,
    pub output: PathBuf,
    pub page_num: u16,
    pub y1: f64,
    pub y2: f64,
    pub left_margin: Option<f64>,
    pub right_margin: Option<f64>,
    pub snippet_id: String,
}

pub fn crop_worker(rx: Arc<Mutex<Receiver<CropPdfData>>>) {
    loop {
        let data = {
            let rx = rx.lock().unwrap();
            rx.recv()
        };

        match data {
            Ok(data) => {
                crop_pdf(&data);
            }
            Err(_) => {
                // Channel is closed, break the loop
                break;
            }
        }
    }
}

pub fn crop_pdf(data: &CropPdfData) {
    let input = &data.input.to_str().map(|s| s.to_string()).unwrap_or_default();
    let output = &data.output.to_str().map(|s| s.to_string()).unwrap_or_default();
    
    log::info!("Cropping snippet: {}", &data.snippet_id);

    let right_margin = if let Some(v) = data.right_margin { v } else { 0.0 };
    let left_margin = if let Some(v) = data.left_margin { v } else { 0.0 };

    let res = Command::new("pdfcrop.py")
        .arg(input)
        .arg(output)
        .arg(data.y1.to_string())
        .arg(data.y2.to_string())
        .arg(right_margin.to_string())
        .arg(left_margin.to_string())
        .arg(data.page_num.to_string())
        .stdout(Stdio::piped())
        .stderr(Stdio::inherit())
        .status();

    if let Err(e) = res {
        log::error!("pdfcrop error: {e:?}");
    }
}