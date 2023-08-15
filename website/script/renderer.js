async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response;
}

var currentPage = undefined;
function renderCourse(container, navbarContent, topBarTitle, courseName, pageToRender = undefined) {
    postData(`/course/${courseName}`)
        .then(v => v.json())
        .then(course => {
            course.pages.forEach(page => {
                // from navbar.js
                addPageToNavbar(navbarContent, page[0], page[1], page[2]);
            });

            topBarTitle.innerText = course.title;

            let page = pageToRender || course.pages[0][2];
            
            // Set active class (color)
            currentPage = document.getElementById(`nav-title-${page}`);
            currentPage.classList.add('active')

            // Render page
            renderPage(container, page);
        });
}

function renderPage(container, pageName) {
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

            // Parse everything
            container.innerHTML = content;
            
            snippets.forEach((snippetName, index) => {                
                // Retrieve the snippet wrapper via getElementById
                let wrapper = document.getElementById(`wrapper${index}`);

                renderSnippet(wrapper, snippetName, index);
            });

            let action = () => {
                console.log("executing action");
                // Create floating snippets
                createFloatingSnippets(container);

                // Typeset with MathJax3
                MathJax.typesetPromise([container]);
            }

            // Execute action() when ready
            waitReadyStateComplete(action);   
        });
}

function renderSnippet(container, snippetName, index) {
    container.classList.add('wrapper');
    container.style.position = 'relative';

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

                    // Does not work
                    //let col2 = document.querySelector(':root').style.getPropertyValue('--col2');
                    //console.log(col2);

                    container.appendChild(canvas);
                    container.appendChild(textLayer);
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
                    container.innerHTML = content;

                    // TODO:
                    // Typeset with MathJax3 and floating snippets
                    // only for snippet page
                }
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

function waitReadyStateComplete(action) {
    setTimeout(action, 1000); // :/

    // also try with event DOMContentLoaded

    /*if (document.readyState == "complete") {
        action();
    } else {
        document.addEventListener('load', () => {
            action();
        }, { once: true });
    }


    if (document.readyState != "complete") {
        document.addEventListener("readystatechange", _ => {
            waitReadyStateComplete(action);
        }, { once: true });
    } else {
        action();
    }*/
}

function createFloatingSnippets(container) {
    let elements = container.getElementsByClassName('floating-snippet');
    for (let i = 0; i < elements.length; i++) {
        createFloatingSnippet(elements[i]);
    };
}

var floatingSnippetCounter = 0;
function createFloatingSnippet(element) {
    element.uniqueId = `float-${floatingSnippetCounter}`;
    floatingSnippetCounter++;

    element.onmouseover = _ => {
        let href = element.href;
        
        let container = document.createElement('div');
        container.id = element.uniqueId;
        let snippetName = href.split('/').pop();

        const rect = element.getBoundingClientRect();
        // shift the snippet left to center it with respect to element
        let leftShift = rect.width * 0.5;

        container.style.top = rect.top + rect.height +  'px';
        container.style.left = rect.left + leftShift + 'px';
        container.style.transform = 'translateX(-50%)';
        container.style.display = 'inline-block';
        container.style.border = 'solid 2px black';
        container.style.backgroundColor = 'white';
        container.style.zIndex = '50';
        // TODO remove the space. Set to red to see it

        renderSnippet(container, snippetName, container.id);

        // override the 'relative' set by renderSnippet
        container.style.position = 'absolute';
        
        document.body.appendChild(container);
    }
    
    element.onmouseout = _ => {
        let container = document.getElementById(element.uniqueId)
        document.body.removeChild(container);
    }
}