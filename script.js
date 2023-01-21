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

let container = document.getElementById('content');
renderPage('anything-goes');

function renderPage(pageName) {
    postData(`/page/${pageName}`)
        .then(page => {
            page.notes.forEach(note => {
                renderPiece(note.name);
            });
        });
}

var counter = 0;
function renderPiece(noteName) {
    let canvas = document.createElement('canvas');
    let id = `pdf${++counter}`;
    canvas.id = id;

    container.appendChild(canvas);

    loadPDF(`/note/${noteName}`, id);
}