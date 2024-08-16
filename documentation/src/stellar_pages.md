# Pages

> **<u style="color: #FFAAAA">Definition</u> <b>page</b>:** a page is an HTML page
> which can contain arbitrary HTML. A page may include other snippets that exist
> in the enviroment. For now, every page is a single HTML file named `<ID>.html` in
> their own folder, but in the future it will have the same primary file/secondary file
> mechanism as snippets.

# Snippets tag

There is a special tag which can be used to include snippets in the page
```html
<stellar-snippet>ID</stellar-snippet>
```
Parameters can be passed as follows:
```html
<stellar-snippet params="param1=v1|param2=v2">ID</stellar-snippet>
```

Here is an example of a page content:
```html
<h1>Welcome to this page<h1>

Here is some normal text which will be displayed

<stellar-snippet params="src=https://...">yt-embed</stellar-snippet>

And here is a snippet
```