# VS Code configuration

You can install the `Action Buttons` extension and add the following command:
```json
{
    "name": "$(triangle-right) Run Notes",
    "color": "green",
    "singleInstance": true,
    "command": "notes ${fileBasename}",
}
```
This will provide a button to compile the current file.