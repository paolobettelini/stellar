# Courses

> **<u style="color: #FFAAAA">Definition</u> <b>course</b>:** a course is a
> collection of ordered pages. Every course is a single JSON file named `ID.json` containing
> the list of pages and headings.

Every course has a title and a list of pages.
Every page is an array of 2 or 3 elements.
The first element is a number (either `1`, `2`, or `3`)
which indicates the level of the heading. The second value is
the title of the heading of the page (string).
The third argument is optional and contains the ID of the page (string).
If no third argument is specified, the title is not clickable.

```json
{
    "title": "Stellar documentation",
    "pages": [
        [
            1,
            "Welcome",
            "welcome-page-id"
        ],
        [
            1,
            "Stellar",
        ],
        [
            1,
            "Introduction",
            "stellar-introduction-page-id"
        ],
        [
            2,
            "Snippets",
            "stellar-snippets-page-id"
        ]
    ]
}
```