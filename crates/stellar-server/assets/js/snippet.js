// import loadPDF from "../utils/load-pdf.js";
//import postData from "../utils/utils.js";
//import nodeScriptReplace from "../utils/utils.js";

class SnippetElement extends HTMLElement {
    static observedAttributes = [];
  
    constructor() {
        super();
    }
  
    connectedCallback() {
        // Render snippet
        let snippetName = this.innerHTML;
        this.innerHTML = "";
        let index = Math.random() + ""; // TODO use a counter

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

                    this.appendChild(canvas);
                    this.appendChild(textLayer);
                    loadPDF(buffer, canvasId, textLayerId,
                        () => {
                            // Apply filter
                            //let theme = localStorage.getItem('theme');
                            //applyFilter(canvas, theme);
                        });
                } else if (contentType == 'text/html') {
                    const decoder = new TextDecoder();
                    let content = decoder.decode(buffer);
                    this.innerHTML = content;

                    // Handle <script> because they dont't work
                    nodeScriptReplace(this);
                }
            });
        });
    }
}

customElements.define("stellar-snippet", SnippetElement);