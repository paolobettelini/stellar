use std::fs;
use std::path::Path;
mod args;
use args::*;

const BEGIN_DOCUMENT: &str = r"\begin{document}";
const NOTEPIECE_PACKAGE: &str = r"\usepackage{notepiece}";
const END_DOCUMENT: &str = r"\end{document}";
const SECTION: &str = r"\section{";
const SUBSECTION: &str = r"\subsection{";
const SUBSUBSECTION: &str = r"\subsubsection{";
const PAGEBREAK: &str = r"\pagebreak";
const NEWPAGE: &str = r"\newpage";

fn main() {
    let args = Args::parse();

    let out_folder = Path::new(&args.output);

    let mut content = fs::read_to_string(args.input)
        .unwrap()
        .replace(PAGEBREAK, "")
        .replace(NEWPAGE, "");

    let mut begin_index_before = content.find(BEGIN_DOCUMENT).unwrap();
    let mut begin_index_after = begin_index_before + BEGIN_DOCUMENT.len();

    // load "notepiece" as last in the preamble
    content.insert_str(begin_index_before, NOTEPIECE_PACKAGE);
    begin_index_before += NOTEPIECE_PACKAGE.len();
    begin_index_after += NOTEPIECE_PACKAGE.len();

    let preamble = &content[..begin_index_before];

    let mut notes_list = vec![];

    let mut section_name = None;
    let mut section_type = None;

    let mut last_section_name = String::from("");
    let mut last_subsection_name = String::from("");

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

        if let Some(name) = section_name {
            if let Some(section_type) = section_type {
                if !section_content.is_empty() {
                    // Construct filename as "<last_sec>-<last_subsec>-sec"
                    // Don't put dashed if not needed
                    let note_name = format!(
                        "{}{}{name}",
                        if section_type > SectionType::Section && !last_section_name.is_empty() {
                            format!("{last_section_name}-")
                        } else {
                            "".to_string()
                        },
                        if section_type > SectionType::Subsection && !last_section_name.is_empty() {
                            format!("{last_subsection_name}-")
                        } else {
                            "".to_string()
                        },
                    );

                    notes_list.push(note_name.clone());
                    let file_name = format!("{note_name}.tex");

                    // Save file
                    let document = make_full_document(&preamble, &section_content);
                    fs::write(out_folder.join(file_name), document.as_bytes())
                        .expect("Couldn't write to file");
                }
            }
        }

        let remaining = &content[section_index_end..];

        // set next section name
        section_name = get_section_name(remaining);
        section_type = get_section_type(remaining);

        // length of "\section{...}" and such
        let section_separator_length = remaining.find('\n');
        let section_separator_length = if let Some(v) = section_separator_length {
            v
        } else {
            break;
        };

        // set last_section_name and last_subsection_name
        if let Some(ref section_type) = section_type {
            if let Some(ref section_name) = section_name {
                match section_type {
                    SectionType::Section => {
                        last_section_name = section_name.to_string();
                        last_subsection_name = String::from("");
                    }
                    SectionType::Subsection => last_subsection_name = section_name.to_string(),
                    SectionType::Subsubsection => {}
                }
            }
        }

        current_index_start = section_index_end + section_separator_length;
    }

    for note_name in notes_list {
        println!("{note_name}");
    }
}

#[derive(Debug, PartialEq, PartialOrd)]
enum SectionType {
    Section = 1,
    Subsection = 2,
    Subsubsection = 3,
}

/// Gets the section name from the
/// % {name}
/// comment, otherwise it constructs it from the section name
fn get_section_name(content: &str) -> Option<&str> {
    let next_comment_index = content.find('%')?;
    let next_line_index = content.find('\n')?;

    if next_line_index < next_comment_index {
        return None;
    }

    let name = &content[next_comment_index + 1..next_line_index];

    Some(name.trim())
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
