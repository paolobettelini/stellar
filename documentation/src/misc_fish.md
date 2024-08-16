# Fish configuration

If you're writing notes using stellar you might find this setup useful (`~/.config/fish/config.fish`):
```bash
set --export MONGO_CONNECTION_URL "mongodb://127.0.0.1" # modify accordingly
set --export NOTES_PATH "/home/user/notes" # modify accordingly

function startstellar
  sudo -v
  sudo stellar web --data "$NOTES_PATH/data" --connection-url $MONGO_CONNECTION_URL --port 80
end

function stopstellar
  sudo -v
  set pid (sudo lsof -t -i :80)
  if test -z "$pid"
    echo "Server was not open"
  else
    sudo kill -9 $pid
    echo "Server was killed"
  end
end

function updatenotes
  sudo -v
  set latest_url (curl -s https://api.github.com/repos/paolobettelini/notes/releases/latest | grep browser_download_url | cut -d '"' -f 4)
  set temp_file /tmp/notes_latest
  curl -L -o $temp_file $latest_url
  chmod +x $temp_file
  sudo mv $temp_file /usr/local/bin/notes
end

function updatestellar
  sudo -v
  set latest_url (curl -s https://api.github.com/repos/paolobettelini/stellar/releases/latest | grep browser_download_url | cut -d '"' -f 4)
  set temp_file /tmp/stellar_latest
  curl -L -o $temp_file $latest_url
  chmod +x $temp_file
  sudo mv $temp_file /usr/local/bin/stellar
end
```