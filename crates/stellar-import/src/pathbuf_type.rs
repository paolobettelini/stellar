use std::path::{Path, PathBuf};

#[derive(Debug)]
pub enum PathBufType {
    DataFolder,
    SnippetsFolder,
    PagesFolder,
    CoursesFolder,
    SnippetsFile,
    PagesFile,
    CoursesFile,
    Other,
}

pub fn get_path_type(path: &Path) -> PathBufType {
    let path = path.canonicalize().unwrap();
    if path.is_dir() {
        let path_str = path.to_string_lossy();
        
        if path_str.ends_with("/data") {
            PathBufType::DataFolder
        } else if path_str.ends_with("/data/snippets") {
            PathBufType::SnippetsFolder
        } else if path_str.ends_with("/data/pages") {
            PathBufType::PagesFolder
        } else if path_str.ends_with("/data/courses") {
            PathBufType::CoursesFolder
        } else if let Some(parent) = path.parent() {
            // Single snippets are folders
            let path_str = parent.to_string_lossy();
            
            if path_str.ends_with("/data/snippets") {
                PathBufType::SnippetsFile
            } else {
                PathBufType::Other
            }
        } else {
            PathBufType::Other
        }
    } else {
        if let Some(parent) = path.parent() {
            let path_str = parent.to_string_lossy();

            if path_str.ends_with("/data/pages") {
                PathBufType::PagesFile
            } else if path_str.ends_with("/data/courses") {
                PathBufType::CoursesFile
            } else {
                PathBufType::Other
            }
        } else {
            PathBufType::Other
        }
    }
}