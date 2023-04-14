// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// Asynchronous download of PDF
function loadPDF(url, canvasId, textLayerId, postRender = function () {}) {
    let loadingTask = pdfjsLib.getDocument(url);

    loadingTask.promise.then(function(pdf) {
        // Fetch the first page
        let pageNumber = 1;
        let scale = 2.5;

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

            renderTask.promise.then(postRender);

            // Render text
            page.getTextContent().then(function(textContent) {
                // Render text layer
                let textLayerDiv = document.getElementById(textLayerId);
                
                let height = canvas.height;
                let width = canvas.width;

                textLayerDiv.style.width = width;
                textLayerDiv.style.height = height;
                textLayerDiv.style.left = canvas.offsetLeft;
                textLayerDiv.style.top = canvas.offsetTop;

                pdfjsLib.renderTextLayer({
                    textContentSource: textContent,
                    container: textLayerDiv,
                    viewport: viewport,
                    textDivs: []
                });
            })
        });
    }, function (reason) {
        // PDF loading error
        console.error(reason);
    });

    return loadingTask;
}