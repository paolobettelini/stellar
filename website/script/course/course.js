"use strict";

// This is the entry point of the course page.
// Read the course from the URL and load it using AJAX
// E.g. "http://localhost:8080/course/calculus";
let href = window.location.href;
let value = "/course/";
let courseName = href.substring(value.length + href.indexOf(value));
console.log(courseName)
renderCourse(courseName);

let navbarContent = document.getElementById('navbar-content');
let currentPage = undefined;

async function postData(url = '', data = {}) {
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
let topBarTitle = document.getElementById('top-bar-title');

function renderCourse(courseName, pageToRender = undefined) {
    postData(`/course/${courseName}`)
        .then(v => v.json())
        .then(course => {
            course.pages.forEach(page => {
                addPageToNavbar(page[0], page[1], page[2]);
            });

            topBarTitle.innerText = course.title;

            let page = pageToRender || course.pages[0][2];
            renderPage(page);
        });
}

function renderPage(pageName) {
    console.log("Rendering page: " + pageName);

    // Toggle active class (color)
    if (currentPage != undefined) {
        currentPage.classList.remove('active')
    }
    currentPage = document.getElementById(`nav-title-${pageName}`);
    currentPage.classList.add('active')

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

            // parse everything
            container.innerHTML = content;

            // Does not work
            //let col2 = document.querySelector(':root').style.getPropertyValue('--col2');
            //console.log(col2);
            
            // Retrieve the snippet wrapper via getElementById
            snippets.forEach((snippetName, index) => {                
                let wrapper = document.getElementById(`wrapper${index}`);
                wrapper.classList.add('wrapper');
                wrapper.style.position = 'relative';
    
                postData(`/snippet/${snippetName}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Request failed with status: ' + response.status);
                        }

                        let arrayBuffer = response.arrayBuffer();
                        arrayBuffer.then(buffer => {
                            //let buffer = new Uint8Array(arrayBuffer);
                            let contentType = response.headers.get('content-type');
                    
                            if (contentType == 'application/pdf') {
                                // Load PDF
                                let canvas = document.createElement('canvas');
                    
                                let textLayer = document.createElement('div');
                                textLayer.classList.add('textLayer');
                
                                let canvasId = `pdf${index}`;
                                let textLayerId = `tl${index}`;
                                canvas.id = canvasId;
                                textLayer.id = textLayerId;
                            
                                wrapper.appendChild(canvas);
                                wrapper.appendChild(textLayer);
                                loadPDF(buffer, canvasId, textLayerId,
                                    () => {
                                        // Apply filter
                                        //if (col2 != "#FFFFFF") {
                                            //applyFilter(canvas, "#161923");
                                        //}
                                    });
                            } else if (contentType == 'text/html') {
                                const decoder = new TextDecoder();
                                let content = decoder.decode(buffer);
                                wrapper.innerHTML = content;

                                // Typeset with MathJax3
                                MathJax.typesetPromise([wrapper]);
                            }
                        });
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

function addPageToNavbar(level, title, page) {
    let el = document.createElement(`span`);
    el.classList.add('nav-title')
    el.classList.add(`nav-title-level-${level}`);
    el.id = `nav-title-${page}`;

    el.innerHTML = title; // Allow HTML tags
    navbarContent.appendChild(el);

    if (page != undefined) {
        el.onclick = _ => {
            renderPage(page);
        }
    } else {
        el.classList.add('empty-nav-title');
    }
}