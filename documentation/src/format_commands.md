# Format Commands

There following commands are to be written as text in the PDF.

| Command                      | Description                                           |
| ---------------------------- | ----------------------------------------------------- |
| `!id <ID>`                   | Set the ID of this page.                              |
| `!snippet <ID> [<JSON object> ...]` | Start a PDF snippet here, optionally with one or more metadata objects. |
| `!endsnippet`                | End the current snippet here.                         |
| `!gen-page <bool>`           | Set to true to generate the HTML page for this PDF.   |
| `!include <ID> <Params>`     | Include a snippet here given its ID. The parameters string is optional. |
| `!plain`                     | Write plain HTML to the page here.                    |
| `!section`                   | Add a level 1 heading `<h1>`.                         |
| `!subsection`                | Add a level 2 heading `<h2>`.                         |
| `!subsubsection`             | Add a level 3 heading `<h3>`.                         |

Furthermore, it is possible to reference another snippet by adding an annotation with a link of the form `/snippet/snippet-id` or `/snippet/snippet-id|Label`.

Stellar will crop the PDF between `!snippet` and `!endsnippet` commands (margins can be adjusted in the CLI parameters).

When `!snippet` contains multiple metadata objects, Stellar merges them from left to right.
Fields in later objects replace fields with the same name in earlier objects. For example:

```text
!snippet example {"type":"Exercise"} {"difficulty":"introductory"}
```

The merged object is written to the snippet's `meta.json` file. Every metadata fragment must be a JSON object.
