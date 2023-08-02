"use strict";

let index = 0;
let wrapper = document.createElement('div');
wrapper.id = `wrapper${index}`;

document.getElementById('inner-content').appendChild(wrapper);

// This is the entry point of the snippet page.
// Read the snippet from the URL and load it using AJAX
// E.g. "http://localhost:8080/snippet/derivative-definition";
let href = window.location.href;
let value = "/snippet/";
let snippetName = href.substring(value.length + href.indexOf(value));

renderSnippet(wrapper, snippetName, index);