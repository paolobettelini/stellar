// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

//console.log(PDFViewerApplication);
//pdfjsLib.preferences.set('enableWebGL', true)

// Asynchronous download of PDF
function loadPDF(buffer, canvasId, textLayerId, annotationLayerId, postRender = function () {}) {
    let loadingTask = pdfjsLib.getDocument(buffer);

    loadingTask.promise.then(function(pdf) {
        // Fetch the first page
        let pageNumber = 1;
        let scale = 2.75;

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

            let annotationLayerDiv = document.getElementById(annotationLayerId);
            renderTask.promise
                .then(_ => setupAnnotations(page, viewport, canvas, annotationLayerDiv))
                .then(postRender);

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


function setupAnnotations(page, viewport, canvas, annotationLayerDiv) {
    // TODO
    /*
    let canvasOffsetLeft = canvas.offsetLeft;
    let canvasOffsetTop = canvas.offsetTop;

    let promise = page.getAnnotations().then(function (annotationsData) {
        viewport = viewport.clone({ dontFlip: true });

        console.log(annotationsData);

        for (let i = 0; i < annotationsData.length; i++) {
            var data = annotationsData[i];
            var annotation = pdfjsLib.Annotation.fromData(data);
            if (!(annotation & annotation.hasHtml())) {
                continue;
            }

            let element = annotation.getHtmlElement(page.commonObjs);
            data = annotation.getData();
            let rect = data.rect;
            let view = page.view;
            rect = pdfjsLib.Util.normalizeRect([
                rect[0],
                view[3] - rect[1] + view[1],
                rect[2],
                view[3] - rect[3] + view[1]]);
            element.style.left = (canvasOffsetLeft + rect[0]) + 'px';
            element.style.top = (canvasOffsetTop + rect[1]) + 'px';
            element.style.position = 'absolute';

            let transform = viewport.transform;
            let transformStr = 'matrix(' + transform.join(',') + ')';
            CustomStyle.setProp('transform', element, transformStr);
            let transformOriginStr = -rect[0] + 'px ' + -rect[1] + 'px';
            CustomStyle.setProp('transformOrigin', element, transformOriginStr);

            if (data.subtype == 'Link' && !data.url) {
                // In this example,  I do not handle the `Link` annotations without url.
                // If you want to handle those annotations, see `web/page_view.js`.
                continue;
            }
            annotationLayerDiv.append(element);
        }
    });
    return promise;
    */
}
