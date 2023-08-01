# Progress so far

https://github.com/paolobettelini/notes-v2/assets/59686810/4fd20827-c80c-477b-b0d3-f3f16391a0ff

# Data structure
The content is put in the following folder structure
- `data/`
    + `courses/`
        + `course1.json`
        + `course2.json`
        + ...
    + `pages/`
        + `page1.html`
        + `page2.html`
        + ...
    + `snippets/`
        + `snippet1`
            + `snippet1.pdf`
        + `snippet2`
            + `snippet2.html`
        + `snippet3`
            + `snippet3.html`
            + `complementary_file.js`
        + ...

A MongoDB server needs to be initialized with this data using the `stellar-cli` tool.
The webserver can then connect to the database and use it for various queries.
The tool `stellar-cli` can be used to initialize data dynamically.

# Compile everything
```bash
cd notes-parser
cargo b --release
sudo mv target/release/notes-parser /usr/local/bin
cd ../notes-server
cargo b --release
sudo mv target/release/notes-server /usr/local/bin
cd ..
```

# Generate PDF snippets from a LaTeX document
```bash
notes-parser -i SomeDocument.tex -o data/
```
This will also generate the `data` folder with the required subdirectories.
Compile the snippets
```bash
cd data/snippets
find . -type f -name "*.tex" -exec tectonic {} \;
cd ../..
```

# Start the server
```bash
notes-server --www static/ --data data/
```
Visit `localhost:8080`

# API

## POST `/course/<id>`
Returns the course `JSON` file.

## POST `/page/<id>`
Returns the course `HTML` file.

## POST `/snippet/<id>`
Returns the primary file in the snippet folder, which is in `data/snippets/<id>`. <br>
The primary file has one of the following forms:
- `<id>.pdf`
- `<id>.html`
- `<id>.png`

## GET `/snippet/<id>/<file>`
The snippet folder may contain other files that will be requested by the main file.
These files can be accessed using this route.

Note that only the primary file needs to use `/snippet/<id>/<file>` for complementary files,
the complementary files themselves can just use `<file>` to retrieve other complementary files
in the same snippet.

## GET `/private/{.*}`
Returns 404.

## GET `/course/<id>`
Returns `/private/course.html`.

## (TODO) GET `/page/<id>`
Returns `/private/page.html`.

## (TODO) GET `/snippet/<id>`
Returns `/private/snippet.html`.

## GET `/search`
Returns `/private/search.html`.

## GET `/<file>`
Returns a static file.