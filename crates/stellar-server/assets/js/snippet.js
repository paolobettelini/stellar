(() => {
if (window.stellarSnippetReady) {
    return;
}
window.stellarSnippetReady = true;
window.stellarSnippetIndexCounter = window.stellarSnippetIndexCounter || 0;

const PDFJS_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.min.mjs";
const PDFJS_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.mjs";
const MAX_SNIPPET_LOAD_RETRIES = 2;

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

        loadSnippetPayload(snippetName, MAX_SNIPPET_LOAD_RETRIES)
            .then(({ response, buffer }) => {
                if (!this.isConnected || token !== this.renderToken) {
                    return;
                }

                //let buffer = new Uint8Array(arrayBuffer);
                const contentType = (response.headers.get('content-type') || '')
                    .split(';', 1)[0]
                    .trim()
                    .toLowerCase();

                if (contentType == 'application/pdf') {
                    return ensurePdfJs()
                        .then(() => {
                            if (!this.isConnected || token !== this.renderToken) {
                                return;
                            }

                            // Load PDF
                            let pdfPage = document.createElement('div');
                            pdfPage.classList.add('snippet-pdf-page');

                            let canvas = document.createElement('canvas');

                            let textLayer = document.createElement('div');
                            textLayer.classList.add('textLayer');

                            let canvasId = `pdf${index}`;
                            let textLayerId = `tl${index}`;
                            canvas.id = canvasId;
                            textLayer.id = textLayerId;

                            pdfPage.appendChild(canvas);
                            pdfPage.appendChild(textLayer);
                            this.appendChild(pdfPage);
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
                            appendSnippetError(this, `Error while loading PDF.js for snippet {${snippetName}}.`);
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
            })
            .catch(error => {
                if (!this.isConnected || token !== this.renderToken) {
                    return;
                }

                console.error(error);
                let status = error.status ? ` Status: ${error.status}.` : "";
                appendSnippetError(this, `Error while loading snippet {${snippetName}}.${status}`);
            });
    }

    getSnippetName() {
        if (this.dataset.snippetName) {
            return this.dataset.snippetName.trim();
        }

        return this.textContent.trim();
    }
}

function loadSnippetPayload(snippetName, retriesLeft) {
    return postData(`/snippet/${encodeURIComponent(snippetName)}`)
        .then(response => {
            if (!response.ok) {
                let error = new Error(`Snippet request failed with status ${response.status}`);
                error.status = response.status;
                throw error;
            }

            return response.arrayBuffer()
                .then(buffer => ({ response, buffer }))
                .catch(cause => {
                    const error = new Error(`Could not read snippet response body (status ${response.status})`);
                    error.status = response.status;
                    error.responseBodyFailed = true;
                    error.cause = cause;
                    throw error;
                });
        })
        .catch(error => {
            if (retriesLeft <= 0 || !isTransientSnippetError(error)) {
                throw error;
            }

            return waitBeforeRetry(retriesLeft)
                .then(() => loadSnippetPayload(snippetName, retriesLeft - 1));
        });
}

function isServerError(error) {
    return error.status >= 500 && error.status < 600;
}

function isTransientSnippetError(error) {
    return isServerError(error)
        || error.responseBodyFailed === true
        || error instanceof TypeError;
}

function waitBeforeRetry(retriesLeft) {
    let attempt = MAX_SNIPPET_LOAD_RETRIES - retriesLeft + 1;
    console.log("Retrying to load snippet after a transient response error.");
    return new Promise(resolve => setTimeout(resolve, 150 * attempt));
}

function appendSnippetError(target, message) {
    let p = document.createElement('p');
    p.textContent = message;
    p.style.padding = '20px';
    p.style.backgroundColor = 'red';
    target.appendChild(p);
}

function extractParameterMap(paramsRaw) {
    // Example: "param1=Hello World!&param2=Hello World 2&width=500px"

    let parts = paramsRaw.split('&');
    let paramMap = {};

    parts.forEach((part) => {
        const keyValueIndex = part.indexOf('=');
    
        if (keyValueIndex !== -1) {
            const key = part.slice(0, keyValueIndex).trim();
            const value = part.slice(keyValueIndex + 1).trim();

            paramMap[key] = value;

            // TODO: consider escape char '\' for '=' and '&'
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
