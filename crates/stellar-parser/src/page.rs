use std::fs::read_to_string;
use std::path::Path;
use anyhow::Result;
use html_parser::{Dom, Node};

// TODO: put "stellar-snippet" in a global variable

pub fn parse_page_snippets(snippet_path: &Path) -> Result<Vec<String>> {
    let html_content = read_to_string(snippet_path)?;
    let dom = Dom::parse(&html_content)?;
    let mut snippets = Vec::new();

    for node in dom.children {
        extract_snippets(&node, &mut snippets);
    }

    Ok(snippets)
}

fn extract_snippets(node: &Node, snippets: &mut Vec<String>) {
    if let Node::Element(element) = node {
        if element.name == "stellar-snippet" {
            if let Some(node) = element.children.first() {
                if let Node::Text(text) = node {
                    snippets.push(text.clone());
                }
            }
        }
    }

    // Recursive
    if let Some(element) = node.element() {
        for child in element.children.iter() {
            extract_snippets(child, snippets);
        }
    }
}