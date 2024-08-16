# Snippets

> **<u style="color: #FFAAAA">Definition</u> <b>snippet</b>:** a snippet is
> the most primitive type of information. It might be an image, a PDF
> or simply some HTML data. Every snippet has its own folder named as its ID, which may contain
> multiple files. The **primary file** of the snippet is also named as the ID, but with the
> correct extension (E.g. `snippet-id/snippet-id.pdf`).
> Files other than the primary file are called **secondary files**. Secondary files
> are auxiliary and can be imported by the primary file (or, sometimes, from somewhere else).

The route `/snippet/snippet-id` will render the snippet primary file of the snippet with ID
`snippet-id`, alongside some
additional data.

The route `/snippet/snippet-id/file1.csv` will query for a secondary file within the snippet
with ID `snippet-id`.

# Parameters

A primary file of the HTML form may optionally require parameters.
A parameters can be expressed by the syntax `#{paramName|default}`.
This entire string will be replaced by the given parameter, or by the default value
if no value was provided.

As an example, the following snippet will render an image.
The width, height, source and alt of the images are all parameters.
```html
<div style="text-align: center;">
    <img
        width="#{width|auto}"
        height="#{height|auto}"
        src="#{src|Missing SRC}"
        alt="#{alt|Could not display image}"
    >
</div>
```

Stellar will inject the parameters **only** in the primary HTML file of a snippet.
If you need to setup some JavaScript variables from the parameters, you will need to do it in the
primary file.

# File `meta.json`

A special secondary file is the `meta.json` which contains additional metadata (more information will follow in the book).

## JSON Structure

| Field               | Type                      | Description                     |
| ------------------- | ------------------------- | ------------------------------- |
| `generalizations`   | Array of snippet IDs      | Mathematical generalizations.   |
| `requires`          | Array of snippet IDs      | Necessary libraries.            |
| `default-params`    | Params string             | Default parameters for snippet. |

## Example

```json
{
    "default-params": "width=70%|src=https://youtu.be/dQw4w9WgXcQ&",
    "requires": ["some-lib-snippet"]
}
```