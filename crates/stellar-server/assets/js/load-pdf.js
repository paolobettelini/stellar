// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js';

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

                pdfjsLib.renderTextLayer({
                    textContentSource: textContent,
                    container: textLayerDiv,
                    viewport: viewport,
                    textDivs: []
                });
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
        viewport = viewport.clone({ dontFlip: true });

        annotationsData.forEach(function(data) {
            let element = document.createElement('a');

            let rect = pdfjsLib.Util.normalizeRect(
                viewport.convertToViewportRectangle(data.rect)
            );

            element.style.left = `${rect[0]}px`;
            // No clue as to why I have to multiply this one
            // The 13.5 comes from page_renderer.css
            // but it seems to be wrong
            element.style.top = `${rect[1] * viewport.scale - 13.5}px`;
            element.style.width = `${rect[2] - rect[0]}px`;
            element.style.height = `${rect[3] - rect[1]}px`;
            element.style.position = 'absolute';
            element.style.border = "5px solid green";

            // Add specific handling based on annotation type
            /*if (data.subtype === 'Link' && data.url) {
                element.style.cursor = 'pointer';
                element.onclick = () => window.open(data.url);
                element.title = data.url;
            }*/

            // floating snippet on hover
            console.log(data);
            if (data.url == undefined && data.unsafeUrl.includes("/snippet/")) {
                let url = data.unsafeUrl.split('.pdf')[0];
                data.url = url;

                console.log(url)
                element.classList.add("floating-snippet")
            }

            element.href = data.url;

            container.appendChild(element);
        });
    });

    return promise;
}