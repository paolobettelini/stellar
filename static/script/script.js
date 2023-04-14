"use strict";

const API_URL = window.location.href.substring(0, 8 + window.location.href.substring(8).indexOf('/'));
let navbarContent = document.getElementById('navbar-content');

async function postData(url = '', data = {}) {
    url = API_URL + url;

    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return await response.json();
}

let container = document.getElementById('inner-content');

// Hardcoded action
renderCourse('analysis', 'limits-definition');

function renderCourse(courseName, pageToRender = undefined) {
    postData(`/course/${courseName}`)
        .then(course => {
            course.pages.forEach(page => {
                addPageToNavbar(page.title, page.level, page.file);
            });

            let page = pageToRender || course.pages[0].file;
            renderPage(page);
        });
}

function renderPage(pageName) {
    container.innerHTML = '';
    console.log("Rendering page: " + pageName);

    postData(`/page/${pageName}`)
        .then(page => {
            page.notes.forEach(note => {
                renderPiece(note);
            });
        });
}

var counter = 0;
function renderPiece(note) {
    // <h1 id="page"><a href="#page">Title</a></h1>
    // l'<a> non va perché lo genera dopo
    let title = document.createElement(`h${note.level}`);
    title.id = note.file;
    let titleText = document.createTextNode(note.title);
    title.appendChild(titleText);

    container.appendChild(title);

    console.log(note.file)
    if (note.file != undefined) {
        let canvas = document.createElement('canvas');
        
        let textLayer = document.createElement('div');
        textLayer.classList.add('textLayer');

        let wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        wrapper.style.position = 'relative';

        ++counter;
        let canvasId = `pdf${counter}`;
        let textLayerId = `tl${counter}`;
        canvas.id = canvasId;
        textLayer.id = textLayerId;
    
        wrapper.appendChild(canvas);
        wrapper.appendChild(textLayer);
        container.appendChild(wrapper);
        loadPDF(`/note/${note.file}`, canvasId, textLayerId);
    }
}

function addPageToNavbar(title, level, file) {
    let el = document.createElement(`span`);
    el.classList.add('nav-title')
    el.classList.add(`nav-title-level-${level}`);
    el.innerHTML = title; // Allow HTML tags
    navbarContent.appendChild(el);

    el.onclick = _ => {
        renderPage(file);
    }
}