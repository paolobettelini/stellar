"use strict";

const API_URL = window.location.href.substring(0, 8 + window.location.href.substring(8).indexOf('/'));
let navbarContent = document.getElementById('navbar-content');

async function postData(url = '', data = {}) {
    url = API_URL + url;

    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            //'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response;
}

let container = document.getElementById('inner-content');

// Hardcoded action
renderCourse('analysis', 'limits-definition');

function renderCourse(courseName, pageToRender = undefined) {
    postData(`/course/${courseName}`)
        .then(v => v.json())
        .then(course => {
            course.pages.forEach(page => {
                addPageToNavbar(page[0], page[1], page[2]);
            });

            let page = pageToRender || course.pages[0].file;
            renderPage(page);
        });
}

function renderPage(pageName) {
    //container.innerHTML = ''; // only for the JSON version
    console.log("Rendering page: " + pageName);

    postData(`/page/${pageName}`)
        .then(v => v.text())
        .then(content => {
            let snippets = extractSnippetNames(content);

            snippets.forEach((snippetName, index) => {
                // replace <snippet>VALUE</snippet>
                // with <div id="wrapperID"></div>
                content = content.replace(`<snippet>${snippetName}</snippet>`,
                    `<div id="wrapper${index}"></div>`);
            });

            console.log(content)

            // parse everything
            container.innerHTML = content;
            
            // Retrieve the snippet wrapper via getElementById
            snippets.forEach((snippetName, index) => {                
                let wrapper = document.getElementById(`wrapper${index}`);
                wrapper.classList.add('wrapper');
                wrapper.style.position = 'relative';
    
                let canvas = document.createElement('canvas');
                
                let textLayer = document.createElement('div');
                textLayer.classList.add('textLayer');

                let canvasId = `pdf${index}`;
                let textLayerId = `tl${index}`;
                canvas.id = canvasId;
                textLayer.id = textLayerId;
            
                wrapper.appendChild(canvas);
                wrapper.appendChild(textLayer);
                loadPDF(`/note/${snippetName}`, canvasId, textLayerId,
                    () => {
                        // Apply filter
                        applyFilter(canvas, "#161923");
                    });
            });
        });
}

function extractSnippetNames(content) {
    let values = [];

    let index = content.indexOf('<snippet>', 0);
    while (index != -1) {
        // Extract <snippet>VALUE</snippet>
        index += 9;
        let end = content.indexOf('</snippet>', index);
        if (end == -1) {
            break;
        }
        let snippetName = content.substring(index, end);
        index = end + 10;
        index = content.indexOf('<snippet>', index);
        
        values.push(snippetName)
    }

    return values;
}

function addPageToNavbar(level, title, file) {
    let el = document.createElement(`span`);
    el.classList.add('nav-title')
    el.classList.add(`nav-title-level-${level}`);
    el.innerHTML = title; // Allow HTML tags
    navbarContent.appendChild(el);

    if (file != undefined) {
        el.onclick = _ => {
            renderPage(file);
        }
    }
}