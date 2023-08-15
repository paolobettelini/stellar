const BEGIN_DOCUMENT: &str = r"\begin{document}";
const NOTEPIECE_PACKAGE: &str = r"\usepackage{snippetformat}";
const END_DOCUMENT: &str = r"\end{document}";
const SECTION: &str = r"\section{";
const SUBSECTION: &str = r"\subsection{";
const SUBSUBSECTION: &str = r"\subsubsection{";
const PAGEBREAK: &str = r"\pagebreak";
const NEWPAGE: &str = r"\newpage";

pub struct TeXPage {
    pub title: String,
    pub snippets: Vec<TeXSnippet>,
}

pub struct TeXSnippet {
    pub title: String,
    pub level: u8,
    pub id: String,
    pub tex: Option<String>,
}

#[derive(Debug, PartialEq, PartialOrd)]
enum SectionType {
    Section = 1,
    Subsection = 2,
    Subsubsection = 3,
}

pub fn parse_latex(content: &str, filename: &str) -> TeXPage {
    let filename = strip_filename(filename);
    let file_id = name_to_id(&filename);

    let mut content = content.replace(PAGEBREAK, "").replace(NEWPAGE, "");

    let mut begin_index_before = content.find(BEGIN_DOCUMENT).unwrap();
    let mut begin_index_after = begin_index_before + BEGIN_DOCUMENT.len();

    // load "notepiece.sty" as last in the preamble
    content.insert_str(begin_index_before, NOTEPIECE_PACKAGE);
    begin_index_before += NOTEPIECE_PACKAGE.len();
    begin_index_after += NOTEPIECE_PACKAGE.len();

    let preamble = &content[..begin_index_before];

    let mut snippets = vec![];

    let mut section_id = None;
    let mut section_type = None;
    let mut section_name: Option<&str> = None;

    let mut last_section_id = String::from("");
    let mut last_subsection_id = String::from("");

    let mut current_index_start = begin_index_after;
    while let Some(section_length) = {
        let remaining = &content[current_index_start..];

        // find first occurence of one of the following
        [SECTION, SUBSECTION, SUBSUBSECTION, END_DOCUMENT]
            .iter()
            .filter_map(|sub| remaining.find(sub)) // filter for found indexes
            .min_by_key(|index| *index) // take minimum value
    } {
        // index before the next "\section{..." or such
        let section_index_end = current_index_start + section_length;
        let section_content = &content[current_index_start..section_index_end].trim();

        if let Some(ref id) = &section_id {
            if let Some(section_type) = section_type {
                if let Some(section_name) = section_name {
                    // Construct filename as "<last_sec>-<last_subsec>-sec"
                    // Don't put dashed if not needed
                    let snippet_name = format!(
                        "{}{}{}",
                        if section_type > SectionType::Section && !last_section_id.is_empty() {
                            format!("{last_section_id}-")
                        } else {
                            "".to_string()
                        },
                        if section_type > SectionType::Subsection && !last_section_id.is_empty() {
                            format!("{last_subsection_id}-")
                        } else {
                            "".to_string()
                        },
                        id
                    );

                    let snippet_name = format!("{file_id}-{snippet_name}");

                    if section_content.is_empty() {
                        snippets.push(TeXSnippet {
                            title: section_name.to_owned(),
                            level: section_type as u8,
                            id: snippet_name,
                            tex: None,
                        });
                    } else {
                        let document = make_full_document(preamble, section_content);

                        snippets.push(TeXSnippet {
                            title: section_name.to_owned(),
                            level: section_type as u8,
                            id: snippet_name,
                            tex: Some(document),
                        });
                    }
                }
            }
        }

        let remaining = &content[section_index_end..];

        // set next section name
        section_id = get_section_id(remaining);
        section_type = get_section_type(remaining);
        section_name = get_section_name(remaining);

        // length of "\section{...}" and such
        let section_separator_length = remaining.find('\n');
        let section_separator_length = if let Some(v) = section_separator_length {
            v
        } else {
            break;
        };

        // set last_section_name and last_subsection_name
        if let Some(ref section_type) = section_type {
            if let Some(ref section_id) = section_id {
                match section_type {
                    SectionType::Section => {
                        last_section_id = section_id.to_string();
                        last_subsection_id = String::from("");
                    }
                    SectionType::Subsection => last_subsection_id = section_id.to_string(),
                    SectionType::Subsubsection => {}
                }
            }
        }

        current_index_start = section_index_end + section_separator_length;
    }

    TeXPage {
        title: filename,
        snippets,
    }
}

/// \subsubsection{Hello} % custom-id
/// -> "custom-id"
///
/// \subsection{World's Hello}
/// -> "world-hello"
fn get_section_id(content: &str) -> Option<String> {
    let next_comment_index = content.find('%');
    let next_line_index = content.find('\n');

    // Try reading the comment
    if let Some(next_comment_index) = next_comment_index {
        if let Some(next_line_index) = next_line_index {
            // A comment % is specified
            if next_line_index > next_comment_index {
                let name = &content[next_comment_index + 1..next_line_index];

                return Some(name.trim().to_owned());
            }
        }
    }

    // Construct from section name
    let section_name = get_section_name(content)?;

    Some(name_to_id(section_name))
}

fn name_to_id(value: &str) -> String {
    value
        .replace("\'s", "")
        .replace('\'', "")
        .replace(' ', "-")
        .replace('ô', "o") // maybe remove this
        .to_lowercase()
}

/// \subsubsection{Hello} % custom-id
/// -> "Hello"
///
/// \subsection{World's Hello}
/// -> "World's Hello"
fn get_section_name(content: &str) -> Option<&str> {
    let section_name_start = content.find('{')? + 1;
    let section_name_end = content.find('}')?;
    let section_name = &content[section_name_start..section_name_end];

    Some(section_name)
}

fn get_section_type(content: &str) -> Option<SectionType> {
    let section_type_start = content.find('\\')? + 1;
    let section_type_end = content.find('{')?;
    let section_type = &content[section_type_start..section_type_end];

    match section_type {
        "section" => Some(SectionType::Section),
        "subsection" => Some(SectionType::Subsection),
        "subsubsection" => Some(SectionType::Subsubsection),
        _ => None,
    }
}

fn make_full_document(preamble: &str, section: &str) -> String {
    format!(
        r"{preamble}
\begin{{document}}
{section}
\end{{document}}"
    )
}

// "/path/to/Document.tex" -> "Document"
fn strip_filename(path: &str) -> String {
    let mut components: Vec<&str> = path.split('/').collect();
    if let Some(last_component) = components.pop() {
        let mut filename = last_component.to_string();
        if let Some(dot_idx) = filename.rfind('.') {
            filename.truncate(dot_idx);
        }
        return filename;
    }
    panic!("File name could not be retrieved")
}
