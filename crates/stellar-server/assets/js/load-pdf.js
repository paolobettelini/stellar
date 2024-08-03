// Loaded via <script> tag, create shortcut to access PDF.js exports.
//var pdfjsLib = window['pdfjs-dist/build/pdf'];

//console.log(PDFViewerApplication);
//pdfjsLib.preferences.set('enableWebGL', true)

const scale = 2.75;

// Asynchronous download of PDF
function loadPDF(buffer, canvasId, textLayerId, postRender = function () {}) {
    let loadingTask = pdfjsLib.getDocument({ data: buffer });

    loadingTask.promise.then(function(pdf) {
        // Fetch the first page
        let pageNumber = 1;

        pdf.getPage(pageNumber).then(function(page) {
            document.querySelector(':root').style.setProperty('--scale-factor', scale);

            // This line breaks interactivity on the animation canvas
            let viewport = page.getViewport({scale: scale});
            // Prepare canvas using PDF page dimensions

            let canvas = document.getElementById(canvasId);
            let context = canvas.getContext('2d');
            
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);
            
            let textLayerDiv = document.getElementById(textLayerId);
            //let annotationLayerDiv = document.getElementById(annotationLayerId);
            renderTask.promise
                // Render annotations
                .then(postRender);

            // Render text
            page.getTextContent().then(function(textContent) {
                // Render text layer
                textLayerDiv.style.left = canvas.offsetLeft + 'px';
                textLayerDiv.style.top = canvas.offsetTop + 'px';

                const textLayer = new pdfjsLib.TextLayer({
                    textContentSource: textContent,
                    container: textLayerDiv,
                    viewport: viewport,
                });
                /*await*/ textLayer.render();
            })

            // Render annotations on textLayer
            setupAnnotations(page, viewport, textLayerDiv)
        });
    }, function (reason) {
        // PDF loading error
        console.error(reason);
    });

    return loadingTask;
}


function setupAnnotations(page, viewport, container) {
    let promise = page.getAnnotations().then(function (annotationsData) {
        viewport = viewport.clone({});

        annotationsData.forEach(function(data) {
            let element = document.createElement('a');

            let rect = pdfjsLib.Util.normalizeRect(
                viewport.convertToViewportRectangle(data.rect)
            );

            element.style.left = `${rect[0]}px`;
            // No clue as to why this should work
            element.style.top = `${rect[1]}px`;
            element.style.width = `${(rect[2] - rect[0])}px`;
            element.style.height = `${(rect[3] - rect[1])}px`;

            element.style.position = 'absolute';
            element.classList.add('snippet-link');
            
            // DEBUG:
            //element.style.border = "1px solid green";

            // floating snippet on hover
            console.log(data.unsafeUrl);
            if (data.url == undefined) {
                if (data.unsafeUrl.startsWith("/snippet/")) {
                    let str = data.unsafeUrl.split('.pdf')[0];
                    let url = str.split('|')[0];
                    let title = str.split('|')[1];
                    let id = url.split('/').pop();
    
                    data.url = url;
    
                    element.href = data.url;
    
                    if (title == undefined) {
                        element.title = `ID: ${id}\nClick to see source`;
                    } else {
                        element.title = `${title}\nID: ${id}\nClick to see source`;
                    }
                } else if (data.unsafeUrl.startsWith("|")) {
                    let str = data.unsafeUrl.split('.pdf')[0];
                    let label = str.substr(1);
                    element.title = label;
                    element.href = "";
                }
            }

            // Normal link
            else if (data.subtype === 'Link' && data.url) {
                element.style.cursor = 'pointer';
                element.onclick = () => window.open(data.url);
                element.title = data.url;
                element.href = data.url;
            }

            container.appendChild(element);
        });
    });

    return promise;
}