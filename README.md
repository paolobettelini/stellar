# Progress so far
![preview](https://i.imgur.com/m1UK7ZY.gif)

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