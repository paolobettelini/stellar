# Stellar

Welcome to `stellar`. Stellar is a framework to build organized courses or notes.
There are many different ways to use stellar.
If you want to see an example of this framework being used,
check out my [notes](https://github.com/paolobettelini/notes) repository,
which is extensively based on LaTex and contains (interactive) animations or 3D models.

# Compile the CLI
The `stellar-cli` contains everything needed to manage the `stellar` ecosystem.
It contains the tools to manage the contents of the courses
as well as the server.
The webserver uses [leptos](https://github.com/leptos-rs/leptos/). 
```bash
cd stellar
cargo leptos build --release
mv target/release/stellar-cli /usr/local/bin

# Needed scripts
chmod +x scripts/*
mv scripts/* /usr/local/bin

# Install pdfminer and pymupdf
# Arch:
pacman -S python-pdfminer python-pymupdf
```

# Development
```bash
cargo leptos watch -- web ...
```
Do not use `--port` or `--address` in development,
set those values in the `Cargo.toml` instead.