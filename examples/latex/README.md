# Compile the example
```bash
# Compile the PDF (source)
tectonic stellar.tex -Z search-path=../../latex-packages/
# Generate the snippet folders
stellar-cli generate snippets --input stellar.pdf --data-output ./data --bottom-offset 9.5 --top-offset=-20
```