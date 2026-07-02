# Routes

This page lists non-technical the web routes exposed by the Stellar server.

## General

| Route | Parameters | Description |
| --- | --- | --- |
| `/` | none | Home page. |
| `/home` | none | Home page alias. |
| `/search` | none | Search page for snippets, pages, courses, and universes. |
| `/404` | none | Not found page. |

## Snippets

| Route | Parameters | Description |
| --- | --- | --- |
| `/snippet/:snippet` | `snippet`: snippet ID | Shows a single snippet, its metadata, references, and rendered content. |
| `/snippet/:snippet?<params>` | `snippet`: snippet ID, `<params>`: raw snippet parameters | Shows a snippet with URL-provided parameters applied to the rendered snippet. |
| `/reftree/:id` | `id`: snippet ID | Shows the reference dependency graph for a snippet. |

## Pages

| Route | Parameters | Description |
| --- | --- | --- |
| `/page/:page` | `page`: page ID | Shows a single page. |

## Courses

| Route | Parameters | Description |
| --- | --- | --- |
| `/course/:course` | `course`: course ID | Opens a course and redirects to the first non-empty page. |
| `/course/:course/:page` | `course`: course ID, `page`: page ID | Opens a course directly at a specific page. |
| `/edit-course/:course` | `course`: course ID | Opens the course editor. If the course JSON does not exist, it starts from an empty course that can be exported. |

## Universes

| Route | Parameters | Description |
| --- | --- | --- |
| `/universe/:universe` | `universe`: universe ID | Shows a universe graph. |
| `/edit-universe/:universe` | `universe`: universe ID | Opens the universe editor. If the universe JSON does not exist, it starts from an empty universe that can be exported. |
