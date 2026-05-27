# Installation

The `stellar-cli` contains everything needed to manage the `stellar` ecosystem.
It contains the tools to manage the contents of the courses
as well as the server.

You can either download the executable from the [releases](https://github.com/paolobettelini/stellar/releases) or compile it yourself.

# Compile the CLI

The webserver uses [leptos](https://github.com/leptos-rs/leptos/). 
```bash
git clone https://github.com/paolobettelini/stellar
cd stellar

# In release mode the static files are embedded in the executable
# These commands ensure it works properly
cargo clean -p stellar-server -p stellar-cli
cargo leptos build --release --frontend-only
cargo clean -p stellar-server -p stellar-cli
cargo build --release --package stellar-cli --bin stellar-cli --no-default-features

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