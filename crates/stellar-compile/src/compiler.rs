use std::fs;
use std::path::Path;
use std::process::Command;
use stellar_utils::pathbuf_type::{get_path_type, PathBufType};

pub fn compile_latex(tex_path: &Path) {
    let output = Command::new("tectonic")
        .arg(tex_path)
        .status();

    match output {
        Ok(status) => {
            if !status.success() {
                log::error!("Could not compile {tex_path:?}");
            }
        }
        Err(_) => {
            log::error!("Error executing tectonic");
        }
    }
}

pub fn compile(path: &Path) -> anyhow::Result<()> {
    todo!()
    
    /*let path_type = get_path_type(&path);

    match path_type {
        PathBufType::SnippetsFile => {
            compile_snippet(&path, &search_path, recompile);
        }
        PathBufType::SnippetsFolder => {
            compile_snippets(&path, &search_path, recompile)?;
        }
        _ => {
            log::error!("Invalid path provided");
        }
    }

    Ok(())*/
}

/*
pub fn compile_snippets(path: &Path, search_path: &Path, recompile: bool) -> anyhow::Result<()> {
    for entry in fs::read_dir(&path)? {
        let entry_path = entry?.path();

        if entry_path.is_dir() {
            compile_snippet(&entry_path, &search_path, recompile);
        }
    }

    Ok(())
}

pub fn compile_snippet(path: &Path, search_path: &Path, recompile: bool) {
    if let Some(folder_name) = path.file_name().and_then(|n| n.to_str()) {
        let tex_path = path.join(format!("{folder_name}.tex"));

        if tex_path.exists() {
            compile_tex_snippet(&path, &folder_name, &tex_path, &search_path, recompile);
        } else {
            log::error!("Snippet type compilation not supported: {path:?}");
        }
    }
}

fn compile_tex_snippet(
    path: &Path,
    folder_name: &str,
    tex_path: &Path,
    search_path: &Path,
    recompile: bool,
) {
    let search_path = search_path.to_string_lossy();

    if recompile || !is_tex_compiled(&path, &folder_name, &tex_path) {
        log::info!("Compiling snippet {folder_name}");

        let output = Command::new("tectonic")
            .arg(tex_path)
            .arg("-Z")
            .arg(format!("search-path={search_path}"))
            .status();

        match output {
            Ok(status) => {
                if !status.success() {
                    log::error!("Could not compile {folder_name}");
                }
            }
            Err(_) => {
                log::error!("Error executing tectonic");
            }
        }
    } else {
        log::info!("Snippet {folder_name} is already compiled");
    }
}

/// Returns true if the folder contains a compiled .pdf
/// with a "last modified" field greater then the .tex file
fn is_tex_compiled(path: &Path, folder_name: &str, tex_path: &Path) -> bool {
    match (|| -> std::io::Result<_> {
        let pdf_path = path.join(format!("{folder_name}.pdf"));

        if !pdf_path.exists() {
            return Ok(false);
        }

        let tex_metadata = std::fs::metadata(&tex_path)?;
        let pdf_metadata = std::fs::metadata(&pdf_path)?;

        let tex_modified = tex_metadata.modified()?;
        let pdf_modified = pdf_metadata.modified()?;

        Ok(pdf_modified > tex_modified)
    })() {
        Ok(result) => result,
        Err(_) => false,
    }
}
*/