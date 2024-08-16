# Installation

Install [stellar](https://github.com/paolobettelini/stellar)
and clone the repository
```bash
git clone https://github.com/paolobettelini/notes
```
Set the necessary enviromental variables:
```bash
NOTESPATH # pointing to the notes/ directory
MONGO_CONNECTION_URL # connection URL to mongodb
```
Install the required libraries (some snippets require `npm` and `wasm-pack` to compile)
```bash
pacman -S tectonic npm wasm-pack git
```
Compile the compiler or download it from the [releases](https://github.com/paolobettelini/notes/releases/tag/v0.1.0)
```bash
cd notes/compiler
cargo build --release
mv target/release/compile /usr/local/bin/notes
```

# Compiling everything and starting the server
```bash
cd source
notes # compiles everything
cd ..
```

It is advisable to set the `CARGO_TARGET_DIR` variable so that
the rust projects share the same target folder.

Then, start the web server
```bash
stellar web --data data/ --connection-url $MONGO_CONNECTION_URL
```
Go to [localhost:8080/search](http://localhost:8080/search).