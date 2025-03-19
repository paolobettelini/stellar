# Installation

The `stellar-cli` contains everything needed to manage the `stellar` ecosystem.
It contains the tools to manage the contents of the courses
as well as the server.

You can either download the executable from the [releases](https://github.com/paolobettelini/stellar/releases) or compile it yourself. Regardless, you still need to install the python scripts
as described below.

# Compile the CLI

The webserver uses [leptos](https://github.com/leptos-rs/leptos/). 
```bash
git clone https://github.com/paolobettelini/stellar
cd stellar
cargo leptos build --release
mv target/release/stellar-cli /usr/local/bin
```

# Development
```bash
cargo leptos watch -- web ...
```
Do not use `--port` or `--address` in development,
set those values in the `Cargo.toml` instead.

# MongoDB

```bash
paru -S mongodb-bin
systemctl enable mongodb
systemctl start mongodb
```

# Necessary scripts

The following steps are absolutely crucial if you plan on generating
pages and snippets from PDFs. The plan for the future is to
write the following scripts directly in rust and avoid extra steps like these.

```bash
chmod +x scripts/*
mv scripts/* /usr/local/bin

# Install pdfminer and pymupdf
# Arch:
pacman -S python-pdfminer python-pymupdf
```

<!-- Should be solved
**Issues with cropping PDFs**:
Unfortunately, there are some cropping problems with the `mupdf` package.
The problems arise from version `1.24` onwards.
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
In order to use the correct `python` version, you can replace the shebang in `pdfcrop.py`
with `#!/bin/python3.11`. The other script does not need it.
-->