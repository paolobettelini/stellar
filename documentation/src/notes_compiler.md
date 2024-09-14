# Compiler usage

The `notes` executable is a command used to compile data according to the structure
of this repository.

```
Stellar notes compiler CLI

Usage: notes [OPTIONS] [INPUT]

Arguments:
  [INPUT]  Compile query

Options:
  -r, --regex        Use a regex
  -i, --ignore-case  Ignore case
      --snippets     Check only snippets folder
  -p, --pull         Compile current git status files last pull
      --latex        Check only latex folder
      --pages        Check only pages folder
      --courses      Check only courses folder
      --universes    Check only universes folder
  -h, --help         Print help
  -V, --version      Print version
```

The compiler will automatically handle everything. It will import
the data to the database. You can call `notes` from any directory.

```bash
notes # compiles everything
notes Something # compiles every file name that contains "Something"
notes -r "S|T|N|G" # compiles every file name that matches the regex
notes --latex # compiles all the latex files
notes --snippets # compiles all the universes
notes --pages # compiles all the universes
notes --courses # compiles all the universes
notes --universes # compiles all the universes
notes --universes -r "..." # compiles all the universes that match the regex
notes course1 File1 File2 # compile multiple inputs
notes -r reg1 reg2 # compiles files matching reg1 or reg2
notes "Something" --containing "\command" # compiles every file name that contains "Something" whose content contains "\command"
notes -r "Something.+" --containing "\\command" # like the one above but with regex matching
```