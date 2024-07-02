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

# Issues with cropping PDFs
```bash
wget https://archive.archlinux.org/packages/p/python-pymupdf/python-pymupdf-1.23.21-1-x86_64.pkg.tar.zst
sudo pacman -U python-pymupdf-1.23.21-1-x86_64.pkg.tar.zst

wget https://archive.archlinux.org/packages/p/python-mupdf/python-mupdf-1.23.9-4-x86_64.pkg.tar.zst
sudo pacman -U python-mupdf-1.23.9-4-x86_64.pkg.tar.zst

wget https://archive.archlinux.org/packages/l/libmupdf/libmupdf-1.23.9-4-x86_64.pkg.tar.zst
sudo pacman -U libmupdf-1.23.9-4-x86_64.pkg.tar.zst

paru -S python311 # use this version
```
Lock the packages version in `/etc/pacman.conf`
```
IgnorePkg = libmupdf python-mupdf python-pymupdf
```