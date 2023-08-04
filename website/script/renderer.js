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

                    // Typeset with MathJax3
                    MathJax.typesetPromise([container]);
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