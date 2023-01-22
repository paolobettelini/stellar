"use strict";

// TODO make dynamic using window.location
const API_URL = 'http://localhost:8080';

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
renderPage('differentiation');

function renderPage(pageName) {
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
    // l'<a> non va
    let title = document.createElement(`h${note.level}`);
    title.id = note.file;
    let titleText = document.createTextNode(note.title);
    title.appendChild(titleText);

    container.appendChild(title);

    if (note.file != undefined) {
        let canvas = document.createElement('canvas');
        let id = `pdf${++counter}`;
        canvas.id = id;
    
        container.appendChild(canvas);
        loadPDF(`/note/${note.file}`, id);
    }
}