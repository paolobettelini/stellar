const BEGIN_DOCUMENT: &str = r"\begin{document}";
const NOTEPIECE_PACKAGE: &str = r"\usepackage{snippetformat}";
const END_DOCUMENT: &str = r"\end{document}";
const SECTION: &str = r"\section{";
const SUBSECTION: &str = r"\subsection{";
const SUBSUBSECTION: &str = r"\subsubsection{";
const INCLUDE_CMD: &str = r"%!snippet";
const PAGEBREAK: &str = r"\pagebreak";
const NEWPAGE: &str = r"\newpage";

#[derive(Debug, PartialEq, PartialOrd)]
pub struct TeXPage {
    pub title: String,
    pub id: String,
    pub preamble: String,
    pub elements: Vec<TeXElement>,
}

#[derive(Debug, PartialEq, PartialOrd)]
pub enum TeXElement {
    Section(Section),
    TeXContent(String),
    IncludeCmd(String),
}

#[derive(Debug, PartialEq, PartialOrd)]
pub struct Section {
    pub section_type: SectionType,
    pub title: String,
    pub id: String,
}

#[derive(Debug, PartialEq, PartialOrd, Clone, Copy)]
pub enum SectionType {
    Section = 1,
    Subsection = 2,
    Subsubsection = 3,
}

pub fn parse_latex(content: &str, filename: &str) -> TeXPage {
    let filename = strip_filename(filename);
    let file_id = title_to_id(&filename);

    // Remove pagebreaks and newpages.
    let mut content = content.replace(PAGEBREAK, "").replace(NEWPAGE, "");

    let mut begin_index_before = content.find(BEGIN_DOCUMENT).unwrap();
    let mut begin_index_after = begin_index_before + BEGIN_DOCUMENT.len();

    // load "notepiece.sty" as last in the preamble
    content.insert_str(begin_index_before, NOTEPIECE_PACKAGE);
    begin_index_before += NOTEPIECE_PACKAGE.len();
    begin_index_after += NOTEPIECE_PACKAGE.len();

    let preamble = &content[..begin_index_before];
    let document = &content[begin_index_after..];

    let elements = parse_elements(document);

    TeXPage {
        title: filename,
        id: file_id,
        preamble: preamble.to_string(),
        elements,
    }
}

fn parse_elements(content: &str) -> Vec<TeXElement> {
    let mut elements = vec![];

    let mut current_index = 0;
    while let Some(section_length) = {
        let remaining = &content[current_index..];

        // find first occurence of one of the following
        [SECTION, SUBSECTION, SUBSUBSECTION, INCLUDE_CMD, END_DOCUMENT]
            .iter()
            .filter_map(|sub| remaining.find(sub)) // filter for found indexes
            .min_by_key(|index| *index) // take minimum value
    } {
        let section_index_end = current_index + section_length;

        // Extract content
        let section_content = &content[current_index..section_index_end].trim();
        let element = TeXElement::TeXContent(section_content.to_string());
        elements.push(element);

        // Extract next separator
        let remaining = &content[section_index_end..];

        let section_separator_length = remaining.find('\n');
        let section_separator_length = if let Some(v) = section_separator_length {
            v
        } else {
            break;
        };

        let separator_content = &remaining[..section_separator_length];

        if let Some(id) = get_include_cmd_snippet(&separator_content) {
            // Extract include command
            let element = TeXElement::IncludeCmd(id);
            elements.push(element);
        } else {
            // Extract heading
            let section_id = get_section_id(separator_content);
            let section_type = get_section_type(separator_content);
            let section_name = get_section_name(separator_content);

            if let Some(section_type) = section_type {
                if let Some(id) = section_id {
                    if let Some(name) = section_name {
                        let section = Section { section_type, title: name.to_string(), id };
            
                        let element = TeXElement::Section(section);
                        elements.push(element);
                    }
                }
            }
        }

        current_index = section_index_end + section_separator_length;
    }

    elements
}

fn get_include_cmd_snippet(content: &str) -> Option<String> {
    let id_start = content.find(INCLUDE_CMD)? + INCLUDE_CMD.len();

    let id = content[id_start..].trim().to_string();

    Some(id)
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

    Some(title_to_id(section_name))
}

fn title_to_id(value: &str) -> String {
    value
        .replace("\'s", "")
        .replace('\'', "")
        .replace(' ', "-")
        .replace('ô', "o") // maybe remove this
        .to_lowercase()
}
