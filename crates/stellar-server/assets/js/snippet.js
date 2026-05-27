(() => {
if (window.stellarSnippetReady) {
    return;
}
window.stellarSnippetReady = true;
window.stellarSnippetIndexCounter = window.stellarSnippetIndexCounter || 0;

const PDFJS_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.min.mjs";
const PDFJS_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.mjs";

function ensurePdfJs() {
    if (window.pdfjsLib) {
        return Promise.resolve(window.pdfjsLib);
    }

    if (!window.stellarPdfJsPromise) {
        window.stellarPdfJsPromise = import(PDFJS_URL)
            .then((pdfjsLib) => {
                pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
                window.pdfjsLib = pdfjsLib;
                return pdfjsLib;
            });
    }

    return window.stellarPdfJsPromise;
}

class SnippetElement extends HTMLElement {
    static observedAttributes = [];
  
    constructor() {
        super();
        this.renderToken = 0;
    }
  
    /* TODO:
        <stellar-ref snippet="text1">text2</stellar-ref>
        ->
        <a href="/snippet/text1" class="....">text2</a>
    */

    connectedCallback() {
        this.scheduleRender(5);
    }

    scheduleRender(retries = 0) {
        const token = ++this.renderToken;

        requestAnimationFrame(() => {
            if (!this.isConnected || token !== this.renderToken) {
                return;
            }

            this.renderSnippet(token, retries);
        });
    }

    renderSnippet(token, retries) {
        const snippetName = this.getSnippetName();
        if (!snippetName) {
            if (retries > 0) {
                this.scheduleRender(retries - 1);
            }
            return;
        }

        this.dataset.snippetName = snippetName;
        this.textContent = "";
        let index = ++window.stellarSnippetIndexCounter;

        postData(`/snippet/${encodeURIComponent(snippetName)}`)
            .then(response => {
                if (!this.isConnected || token !== this.renderToken) {
                    return;
                }

                if (!response.ok) {
                    // Display error
                    let p = document.createElement('p');
                    p.innerHTML = `Error while loading snippet {<b>${snippetName}</b>}. Status: ${response.status}`;
                    p.style.padding = '20px';
                    p.style.backgroundColor = 'red'
                    this.appendChild(p);
                    return;
                }

                let arrayBuffer = response.arrayBuffer();
                arrayBuffer.then(buffer => {
                    if (!this.isConnected || token !== this.renderToken) {
                        return;
                    }

                    //let buffer = new Uint8Array(arrayBuffer);
                    let contentType = response.headers.get('content-type');
            
                    if (contentType == 'application/pdf') {
                        ensurePdfJs()
                            .then(() => {
                                if (!this.isConnected || token !== this.renderToken) {
                                    return;
                                }

                                // Load PDF
                                let canvas = document.createElement('canvas');
                    
                                let textLayer = document.createElement('div');
                                textLayer.classList.add('textLayer');

                                let canvasId = `pdf${index}`;
                                let textLayerId = `tl${index}`;
                                canvas.id = canvasId;
                                textLayer.id = textLayerId;

                                this.appendChild(canvas);
                                this.appendChild(textLayer);
                                loadPDF(buffer, canvasId, textLayerId,
                                    () => {
                                        // Apply filter
                                        let theme = localStorage.getItem('theme');
                                        applyFilter(canvas, theme);
                                    });
                            })
                            .catch(error => {
                                if (!this.isConnected || token !== this.renderToken) {
                                    return;
                                }

                                console.error(error);
                                let p = document.createElement('p');
                                p.innerHTML = `Error while loading PDF.js for snippet {<b>${snippetName}</b>}.`;
                                p.style.padding = '20px';
                                p.style.backgroundColor = 'red';
                                this.appendChild(p);
                            });
                    } else if (contentType == 'text/html') {
                        const decoder = new TextDecoder();
                        let content = decoder.decode(buffer);

                        let paramsRaw = this.getAttribute('params');
                        if (paramsRaw != null) {
                            let paramMap = extractParameterMap(paramsRaw);
                            content = injectParameters(paramMap, content);
                        }

                        this.innerHTML = content;

                        // Handle <script> because they dont't work
                        nodeScriptReplace(this);
                        nodeStyleReplace(this);
                    }
                });
            })
            .catch(error => {
                if (!this.isConnected || token !== this.renderToken) {
                    return;
                }

                console.error(error);
                let p = document.createElement('p');
                p.innerHTML = `Error while loading snippet {<b>${snippetName}</b>}.`;
                p.style.padding = '20px';
                p.style.backgroundColor = 'red';
                this.appendChild(p);
            });
    }

    getSnippetName() {
        if (this.dataset.snippetName) {
            return this.dataset.snippetName.trim();
        }

        return this.textContent.trim();
    }
}

function extractParameterMap(paramsRaw) {
    // Example: "param1=Hello World!|param2|Hello World 2|width=500px"

    let parts = paramsRaw.split('|');
    let paramMap = {};

    parts.forEach((part) => {
        const keyValueIndex = part.indexOf('=');
    
        if (keyValueIndex !== -1) {
            const key = part.slice(0, keyValueIndex).trim();
            const value = part.slice(keyValueIndex + 1).trim();

            paramMap[key] = value;

            // TODO: consider escape char '\' for '=' and '|'
            // Note that this is going to break the injection
            // Also, the " characters should be escaped
        }
    });

    return paramMap;
}

function injectParameters(paramMap, content) {
    // Example: popoulate with parameters #{param1|fallback_value}

    const placeholderPattern = /#\{([^|]+)\|([^\}]+)\}/g;

    return content.replace(placeholderPattern, (_match, key, fallback) => {
      return paramMap.hasOwnProperty(key) ? paramMap[key] : fallback;
    });
}

if (!customElements.get("stellar-snippet")) {
    customElements.define("stellar-snippet", SnippetElement);
}
})();
