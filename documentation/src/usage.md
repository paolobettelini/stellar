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

Plain HTML can be inserted with the `plainhtml` environment described below.

You can reference another snippet using:
```latex
\snippetref[snippet-identifier][Some text].
```
To include a snippet:
```latex
\includesnpt{snippet-identifier}
\includesnpt[width=50\%,src=/snippet/image-id/image.jpg]{snippet-identifier}
```
The include options are regular LaTeX arguments, so reserved characters such as
`%` must still be escaped.
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

## Snippet metadata

Metadata commands can be placed in the optional argument after the required environment arguments:

```latex
\begin{snippetdefinition}{some-definition}{Some definition}[
    \generalizations{some-other-definition}
    \metastring{something1}{stringvalue}
    \metanumber{something2}{1}
    \metabool{something3}{false}
    \metalist{something3}{linear-algebra,manifolds}
]
    % snippet content
\end{snippetdefinition}
```

The following metadata commands are available:

| Command | Generated value |
| ------- | --------------- |
| `\metastring{field}{value}` | JSON string |
| `\metanumber{field}{value}` | JSON number |
| `\metabool{field}{true}` | JSON boolean |
| `\metalist{field}{first,second}` | Array of strings |
| `\generalizations{first,second}` | `generalizations` array |
| `\metajson{{...}}` | Arbitrary JSON object |

For example, nested or otherwise custom JSON can be inserted with:

```latex
\metajson{{"source":{"title":"Example","year":2026}}}
```

Every command produces a separate JSON object. Stellar merges the objects from left to right,
so a later field replaces an earlier field with the same name.

Specialized snippet environments automatically provide the following metadata:

| Environment | Automatic metadata |
| ----------- | ------------------ |
| `snippettheorem` | `"type": "Theorem"` |
| `snippetcorollary` | `"type": "Corollary"` |
| `snippetlemma` | `"type": "Lemma"` |
| `snippetproposition` | `"type": "Proposition"` |
| `snippetdefinition` | `"type": "Definition"` |
| `snippetexample` | `"type": "Example"` |
| `snippetnote` | `"type": "Note"` |
| `snippetaxiom` | `"type": "Axiom"` |
| `snippetproof` | `"type": "Proof"` and `"proves": "<referenced snippet ID>"` |
| `snippetexercise` | `"type": "Exercise"` |
| `snippetsolution` | `"type": "Solution"` |
| `snippetcharacter` | `"type": "Character"` |
| `snippetsummary` | `"type": "Summary"` |

The generic `snippet` environment does not add automatic metadata.

## The plain HTML environment

The `plainhtml` environment is used as follows:
```latex
\begin{plainhtml}
This is some <b data-width="50%">HTML</b> text.
\end{plainhtml}
```
The environment embeds its content into the generated HTML paragraph. Its body is
read verbatim, so characters such as `%`, `&`, `_`, `#`, `{`, `}`, and `\` do not
need LaTeX escaping and LaTeX commands are not expanded. Source line breaks are
converted to spaces so that Stellar can extract the whole `!plain` command from a
single PDF line.
