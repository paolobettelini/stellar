# Progress so far

https://github.com/paolobettelini/notes-v2/assets/59686810/4fd20827-c80c-477b-b0d3-f3f16391a0ff

# Compile everything
```bash
cd stellar-cli
cargo b --release
sudo mv target/release/stellar-cli /usr/local/bin
cd ../web-server
cargo b --release
sudo mv target/release/web-server /usr/local/bin
cd ..
```

# Start the server
```bash
web-server --www static/ --data data/
```
Visit `localhost:8080`