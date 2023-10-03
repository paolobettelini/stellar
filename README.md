# Progress so far

https://github.com/paolobettelini/notes-v2/assets/59686810/4fd20827-c80c-477b-b0d3-f3f16391a0ff

# Compile
```bash
cd stellar
cargo b -r -p stellar-cli
mv target/release/stellar-cli /usr/local/bin

# These python scripts are needed to generate the snippets
cd scripts
chmod +x pdfcrop.py
chmod +x pdfextract.py
mv pdfcrop.py /usr/local/bin
mv pdfextract.py /usr/local/bin
pacman -S python-pypdf2 python-pdfminer

```