# Stellar

Check out my [notes](https://github.com/paolobettelini/notes) repository using stellar.

# Compile
```bash
cd stellar
cargo leptos build --release
mv target/release/stellar-cli /usr/local/bin

# Needed scripts
chmod +x scripts/*
mv scripts/* /usr/local/bin

pacman -S python-pdfminer python-pymupdf

```

# Dev
```bash
cargo leptos watch -- web ...
```
Do not use `--port` or `--address` in development,
set those values in the `Cargo.toml` instead.