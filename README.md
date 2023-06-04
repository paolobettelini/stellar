# Progress so far

https://github.com/paolobettelini/notes-v2/assets/59686810/4fd20827-c80c-477b-b0d3-f3f16391a0ff

# How to use
Compile everything
```bash
cd notes-parser
cargo b --release
sudo mv target/release/notes-parser /usr/local/bin
cd ../notes-server
cargo b --release
sudo mv target/release/notes-server /usr/local/bin
cd ..
```
Parse a document
```bash
notes-parser -i SomeDocument.tex -o data/
```
This will generate a `data` folder.
Compile the snippets
```bash
cd data/snippets
find . -type f -name "*.tex" -exec tectonic {} \;
cd ../..
```
Start the server
```bash
notes-server --www static/ --data data/
```
Visit `localhost:8080`
