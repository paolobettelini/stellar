"use strict";

let navbarContent = document.getElementById('navbar-content');
let innerContent = document.getElementById('inner-content');
let topBarTitle = document.getElementById('top-bar-title');

// This is the entry point of the course page.
// Read the course from the URL and load it using AJAX
// E.g. "http://localhost:8080/course/calculus";
let href = window.location.href;
let value = "/course/";
let courseName = href.substring(value.length + href.indexOf(value));
renderCourse(innerContent, navbarContent, topBarTitle, courseName);


// Go to /search when pressing the search button
document.getElementById('topbar-search').onclick = () => {
    window.location = '/search';
}