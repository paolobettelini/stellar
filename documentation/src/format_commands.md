# Format Commands

| Command                      | Description                                           |
| ---------------------------- | ----------------------------------------------------- |
| `!id <ID>`                   | Set the ID of this page.                              |
| `!snippet <ID>`              | Start a PDF snippet here.                             |
| `!endsnippet <JSON meta>`     | End the current snippet here. The JSON metadata is optional. |
| `!gen-page <bool>`           | Set to true to generate the HTML page for this PDF.   |
| `!include <ID> <Params>`     | Include a snippet here given its ID. The parameters string is optional. |
| `!plain`                     | Write plain HTML to the page here.                    |
| `!section`                   | Add a level 1 heading `<h1>`.                         |
| `!subsection`                | Add a level 2 heading `<h2>`.                         |
| `!subsubsection`             | Add a level 3 heading `<h3>`.                         |

Furthermore, it is possible to reference another snippet by adding an annotation with a link of the form `/snippet/snippet-id` or `/snippet/snippet-id|Label`.

Stellar will crop the PDF between `!snippet` and `!endsnippet`.
