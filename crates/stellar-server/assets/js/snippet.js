var snippet_index_counter = 0;

class SnippetElement extends HTMLElement {
    static observedAttributes = [];
  
    constructor() {
        super();
    }
  
    /* TODO:
        <ref snippet="text1">text2</ref>
        ->
        <a href="/snippet/text1" class="....">text2</a>
    */

    connectedCallback() {
        // Render snippet
        setTimeout(() => { // the /snippet page doesn't work without this 0 delay. Why?

        let snippetName = this.innerHTML;
        this.innerHTML = "";
        let index = ++snippet_index_counter;

        postData(`/snippet/${snippetName}`)
            .then(response => {
                if (!response.ok) {
                    // Display error
                    let p = document.createElement('p');
                    p.innerHTML = `Error while loading snippet {<b>${snippetName}</b>}. Status: ${response.status}`;
                    p.style.padding = '20px';
                    p.style.backgroundColor = 'red'
                    this.appendChild(p);
                    // throw new Error('Request failed with status: ' + response.status);
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

                        this.appendChild(canvas);
                        this.appendChild(textLayer);
                        loadPDF(buffer, canvasId, textLayerId,
                            () => {
                                // Apply filter
                                let theme = localStorage.getItem('theme');
                                applyFilter(canvas, theme);
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
            });
        }, 0);
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

customElements.define("stellar-snippet", SnippetElement);