use lopdf::{Document, Object};
use std::path::Path;
use std::collections::HashSet;

pub fn parse_snippet_references(snippet_path: &Path) -> anyhow::Result<Vec<String>> {
    let mut result = HashSet::new();
    
    let doc = Document::load(snippet_path)?;

    for page_id in doc.get_pages().values() {
        for annotation in doc.get_page_annotations(*page_id) {
            // E.g.
            // <</Type /Annot/Subtype /Link/Border [0 0 0]/H /I/C [0 0.5 0.5]/A <</S /GoToR/F (/snippet/logic-biconditional-logical-connective|Biconditional logical connective.pdf)/D [0 /Fit]>>/Rect [288.565 200.289 306.829 202.618]>>
            let annotationstr = format!("{:?}", &annotation);
            let link = extract_substring_within_parentheses(&annotationstr);

            if let Some(mut link) = link {
                // Remove title if present
                if link.contains("|") {
                    link = link.split("|").collect::<Vec<_>>()[0].to_string();
                }

                if link.contains("/snippet/") {
                    let id = link.replace("/snippet/", "");
                    result.insert(id);
                }

            }
        }
    }

    Ok(result.into_iter().collect())
}

pub fn extract_substring_within_parentheses(input: &str) -> Option<String> {
    let start = input.find('(')?;
    let end = input[start..].find(')')?;
    Some(input[start + 1..start + end].to_string())
}
