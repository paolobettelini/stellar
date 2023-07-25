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

## course
The route `/course/<id>` returns the course `JSON` file.

## page
The route `/page/<id>` returns the course `HTML` file.

## snippet
The route `/snippet/<id>` returns the primary file in the snippet folder, which is `data/snippets/<id>`. <br>
The primary file has one of the following forms:
- `<id>.pdf`
- `<id>.html`
- `<id>.png`
The snippet folder may contain other files that will be requested by the main file.
These files can be accessed using the route `/snippet/<id>/<file>`.

## static
The route `/<file>` retrieves a static file.