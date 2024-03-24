async function postData(url = '', data = {}) {
    const response = await fetch('/api' + url, {
        method: 'POST',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response;
}

// Taken from https://stackoverflow.com/questions/1197575/can-scripts-be-inserted-with-innerhtml
// Replaces <script> so they work after doing .innerHTML = ...

function nodeScriptReplace(node) {
    if ( nodeScriptIs(node) === true ) {
            node.parentNode.replaceChild( nodeScriptClone(node) , node );
    }
    else {
            var i = -1, children = node.childNodes;
            while ( ++i < children.length ) {
                  nodeScriptReplace( children[i] );
            }
    }

    return node;
}
function nodeScriptClone(node){
    var script  = document.createElement("script");
    script.text = node.innerHTML;

    var i = -1, attrs = node.attributes, attr;
    while ( ++i < attrs.length ) {                                    
          script.setAttribute( (attr = attrs[i]).name, attr.value );
    }
    return script;
}

function nodeScriptIs(node) {
    return node.tagName === 'SCRIPT';
}

// Same thing but for style

function nodeStyleReplace(node) {
    if ( nodeStyleIs(node) === true ) {
            node.parentNode.replaceChild( nodeStyleClone(node) , node );
    }
    else {
            var i = -1, children = node.childNodes;
            while ( ++i < children.length ) {
                  nodeStyleReplace( children[i] );
            }
    }

    return node;
}
function nodeStyleClone(node){
    var style  = document.createElement("style");
    style.innerHTML = node.innerHTML;

    var i = -1, attrs = node.attributes, attr;
    while ( ++i < attrs.length ) {                                    
          style.setAttribute( (attr = attrs[i]).name, attr.value );
    }
    return style;
}

function nodeStyleIs(node) {
    return node.tagName === 'STYLE';
}