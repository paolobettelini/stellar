# Progress so far

https://github.com/paolobettelini/notes-v2/assets/59686810/4fd20827-c80c-477b-b0d3-f3f16391a0ff

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