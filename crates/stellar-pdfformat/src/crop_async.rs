use std::process::{Command, Stdio};
use std::{
    fs,
    path::{Path, PathBuf},
};
use mupdf::{
    pdf::{PdfAnnotationType, PdfDocument, PdfPage, PdfWriteOptions},
    Rect,
};
use std::sync::mpsc::Receiver;
use anyhow::Context;
use anyhow::{anyhow, bail};
use std::sync::{Arc, Mutex};
use std::thread;
use std::thread::JoinHandle;
use std::time::Duration;

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
    if let Err(e) = crop_pdf_inner(data) {
        log::error!("pdfcrop error for snippet {}: {e:?}", data.snippet_id);
    }
}

fn crop_pdf_inner(data: &CropPdfData) -> anyhow::Result<()> {
    log::info!("Cropping snippet: {}", &data.snippet_id);

    let input = path_to_str(&data.input)
        .with_context(|| format!("Invalid input path: {:?}", data.input))?;

    let output = path_to_str(&data.output)
        .with_context(|| format!("Invalid output path: {:?}", data.output))?;

    let right_margin = data.right_margin.unwrap_or(0.0) as f32;
    let left_margin = data.left_margin.unwrap_or(0.0) as f32;

    let mut doc = PdfDocument::open(input)
        .with_context(|| format!("Cannot open PDF: {input}"))?;

    let page_index = i32::from(data.page_num);
    let page_count = doc.page_count()?;

    if page_index < 0 || page_index >= page_count {
        bail!(
            "Page index {} out of range. Document has {} pages",
            page_index,
            page_count
        );
    }

    let mut page = doc.load_pdf_page(page_index)?;

    /*
     * MuPDF coordinate system:
     * - origin at the top left
     * - y grows downwards
     */
    let crop_box = page.crop_box()?;
    let page_original_width = crop_box.width();
    let page_original_height = crop_box.height();

    let x1 = left_margin;
    let x2 = page_original_width - right_margin;

    if x1 >= x2 {
        bail!("Invalid horizontal crop: x1={x1}, x2={x2}");
    }

    let top = (data.y1 as f32).min(data.y2 as f32);
    let bottom = (data.y1 as f32).max(data.y2 as f32);

    if top >= bottom {
        bail!("Invalid vertical crop: top={top}, bottom={bottom}");
    }

    let redact_top_offset = 4.0_f32;
    let redact_top_limit = (top - redact_top_offset).max(0.0);

    // above the snippet
    add_redact_annot(
        &mut page,
        Rect::new(
            0.0,
            0.0,
            page_original_width,
            redact_top_limit,
        ),
    )?;

    // below the snippet
    add_redact_annot(
        &mut page,
        Rect::new(
            0.0,
            bottom,
            page_original_width,
            page_original_height,
        ),
    )?;

    // right margin
    add_redact_annot(
        &mut page,
        Rect::new(
            x2,
            0.0,
            page_original_width,
            page_original_height,
        ),
    )?;

    // left margin
    add_redact_annot(
        &mut page,
        Rect::new(
            0.0,
            0.0,
            x1,
            page_original_height,
        ),
    )?;

    page.update()?;
    page.redact()?;

    let keep_rect_mupdf = Rect::new(x1, top, x2, bottom);

    set_page_boxes_like_set_mediabox(
        &doc,
        &page,
        keep_rect_mupdf,
        page_original_height,
    )?;

    page.update()?;

    let mut options = PdfWriteOptions::default();
    options
        .set_garbage_level(4)
        .set_compress(true);

    doc.save_with_options(output, options)
        .with_context(|| format!("Cannot save PDF: {output}"))?;

    Ok(())
}

fn path_to_str(path: &Path) -> anyhow::Result<&str> {
    path.to_str()
        .ok_or_else(|| anyhow!("Path is not valid UTF-8: {:?}", path))
}

fn add_redact_annot(page: &mut PdfPage, rect: Rect) -> anyhow::Result<()> {
    if rect.width() <= 0.0 || rect.height() <= 0.0 {
        return Ok(());
    }

    let mut annot = page.create_annotation(PdfAnnotationType::Redact)?;
    annot.set_rect(rect)?;

    Ok(())
}

fn set_page_boxes_like_set_mediabox(
    doc: &PdfDocument,
    page: &PdfPage,
    rect_mupdf: Rect,
    original_page_height: f32,
) -> anyhow::Result<()> {
    let mut page_obj = page.object();

    let media_box = rect_mupdf_to_pdf_box(doc, rect_mupdf, original_page_height)?;
    let crop_box = rect_mupdf_to_pdf_box(doc, rect_mupdf, original_page_height)?;

    page_obj.dict_put("MediaBox", media_box)?;
    page_obj.dict_put("CropBox", crop_box)?;

    let _ = page_obj.dict_delete("TrimBox");
    let _ = page_obj.dict_delete("BleedBox");
    let _ = page_obj.dict_delete("ArtBox");

    Ok(())
}

fn rect_mupdf_to_pdf_box(
    doc: &PdfDocument,
    rect: Rect,
    page_height: f32,
) -> anyhow::Result<mupdf::pdf::PdfObject> {
    let pdf_x0 = rect.x0;
    let pdf_y0 = page_height - rect.y1;
    let pdf_x1 = rect.x1;
    let pdf_y1 = page_height - rect.y0;

    let mut array = doc.new_array_with_capacity(4)?;

    array.array_push(doc.new_real(pdf_x0)?)?;
    array.array_push(doc.new_real(pdf_y0)?)?;
    array.array_push(doc.new_real(pdf_x1)?)?;
    array.array_push(doc.new_real(pdf_y1)?)?;

    Ok(array)
}