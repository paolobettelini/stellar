use std::fs;
use std::path::Path;
use std::process::Command;
use stellar_utils::pathbuf_type::{get_path_type, PathBufType};

pub fn compile(path: &Path, search_path: &Path) -> anyhow::Result<()> {
    let path_type = get_path_type(&path);

    match path_type {
        PathBufType::SnippetsFile => {
            compile_snippet(&path, &search_path);
        }
        PathBufType::SnippetsFolder => {
            compile_snippets(&path, &search_path)?;
        }
        _ => {
            log::error!("Invalid path provided");
        }
    }

    Ok(())
}

pub fn compile_snippets(path: &Path, search_path: &Path) -> anyhow::Result<()> {
    for entry in fs::read_dir(&path)? {
        let entry_path = entry?.path();

        if entry_path.is_dir() {
            compile_snippet(&entry_path, &search_path);
        }
    }

    Ok(())
}

pub fn compile_snippet(path: &Path, search_path: &Path) {
    if let Some(folder_name) = path.file_name().and_then(|n| n.to_str()) {
        let tex_path = path.join(format!("{folder_name}.tex"));
        let search_path = search_path.to_string_lossy();

        if tex_path.exists() {
            let output = Command::new("tectonic")
                .arg(tex_path)
                .arg("-Z")
                .arg(format!("search-path={search_path}"))
                .status();

            match output {
                Ok(status) => {
                    if status.success() {
                        log::debug!("Compiled {folder_name}");
                    } else {
                        log::error!("Could not compile {folder_name}");
                    }
                }
                Err(_) => {
                    log::error!("Error executing tectonic");
                }
            }
        }
    }
}
