# Usage

To use the package, use the following document class:

```latex
\documentclass[preview]{standalone}
```
and import the stellar package:
```latex
\usepackage{stellar}
```
The command `\title` needs to be inserted within the document. The commands `\section`, `\subsection`, and `\subsubsection` can be used normally as their behavior is overwritten by the package.

Available commands:
    - `\id`
    - `\genpage`
    - `\plain`

You can reference another snippet using:
```latex
\snippetref[snippet-identifier][Some text].
```
To include a snippet:
```latex
\includesnpt{snippet-identifier}
\includesnpt[param1=value1|param2=value2]{snippet-identifier}
```
Create snippets using environments:
```latex
\begin{snippet}{snippet-identifier}
    % snippet content
\end{snippet}
```
Other types of snippets:
```latex
\begin{snippetdefinition}{snippet-definition1}{Definition 1}
    % snippet content
\end{snippetdefinition}

\begin{snippettheorem}{snippet-theorem1}{Theorem 1}
    % snippet content
\end{snippettheorem}

\begin{snippetproof}{snippet-proof1}{snippet-theorem1}{Proof 1}
    % snippet content
\end{snippetproof}
```