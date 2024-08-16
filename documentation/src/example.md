# Example

```latex
\documentclass[preview]{standalone}

\usepackage{stellar}

\begin{document}

\id{page-identifier}
\genpage

\section{Section 1}

\subsection{Subsection 1}

\begin{snippetdefinition}{snippet1-definition}{Some definition}
    This is some definition.
\end{snippetdefinition}

\subsection{Subsection 2}

\section{Section 2}

\begin{snippetdefinition}{snippet2-definition}{Some definition}
    This is some definition, the sequel.
\end{snippetdefinition}

\includesnpt{snippet2-definition}

\begin{snippet}{text-snippet}[\{"meta": "json"\}] % will add a meta.json file
    Some text as a snippet!
\end{snippet}

\end{document}
```