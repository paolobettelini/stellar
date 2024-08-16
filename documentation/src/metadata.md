# Metadata

A snippet may contain a `metadata.json` file with some metadata properties.

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
}```