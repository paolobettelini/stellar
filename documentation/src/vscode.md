# Visual Studio Code

You can `Configure User Snippets` on VS Code (not to be confused with stellar snippets)
in order to access some macro for the `stellar.sty` LaTeX package.

The snippets file is available [here](https://github.com/paolobettelini/stellar/blob/main/utils/vscode/stellar.json.code-snippets).

The file provides some autocompletions such as `sdocument` which will provide a basic template

```latex
\documentclass[preview]{standalone}

\usepackage{amsmath}
\usepackage{amssymb}
\usepackage{stellar}
\usepackage{definitions}

\begin{document}

\id{id}
\genpage

\end{document}
```

and also various macros to define snippets such as `snippet`
```latex
\begin{snippet}{id}
    body
\end{snippet}
```
`sdefinition`
```latex
\begin{snippetdefinition}{id-definition}{name}
    body
\end{snippetdefinition}
```
`sproof`, `stheorem` and such.