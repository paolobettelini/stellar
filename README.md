# Progress so far

https://github.com/paolobettelini/notes-v2/assets/59686810/4fd20827-c80c-477b-b0d3-f3f16391a0ff

# Compile
```bash
cd stellar
cargo b -r -p stellar-cli
mv target/release/stellar-cli /usr/local/bin

# Needed scripts
chmod +x scripts/*
mv scripts/* /usr/local/bin

pacman -S python-pdfminer
pacman -S pdfcrop # in texlive-binextra
pacman -S bc

```