# Data Structure

The fundamental types of stellar are four: `snippets`, `pages`, `courses` and `universes`.
These are the building blocks of all the information within a stellar instance.

> **NOTE:** each of these objects have a unique ID,
> which is written in `lower-kebab-case` format.

All the data is stored in a folder named `data`.

```latex
data/
├── snippets/
├── pages/
├── courses/
└── universes/
```

# MongoDB database

A MongoDB database is also required in order to index the data and store some information
about the contents of the website.