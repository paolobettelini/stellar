"use strict";

let innerContent = document.getElementById('inner-content');

// This is the entry point of the page page.
// Read the page from the URL and load it using AJAX
// E.g. "http://localhost:8080/page/derivative";
let href = window.location.href;
let value = "/page/";
let pageName = href.substring(value.length + href.indexOf(value));
renderPage(innerContent, pageName);