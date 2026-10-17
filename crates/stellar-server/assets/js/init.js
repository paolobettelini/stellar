if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'theme-light');
}
document.body.className = localStorage.getItem('theme');

window.stellarBasePath = document.querySelector('meta[name="stellar-base-path"]')?.content || '';
window.stellarPath = (path) => `${window.stellarBasePath}${path}`;

// Imported page and snippet HTML may contain root-relative Stellar links.
const stellarRoute = /^\/(?:snippet|course|page|universe|edit-course|edit-universe|reftree|search|assets|pkg)(?:\/|$|[?#])/;
const rewriteStellarUrls = (root) => {
    if (!window.stellarBasePath || !(root instanceof Element)) return;
    for (const element of [root, ...root.querySelectorAll('[href], [src]')]) {
        for (const attribute of ['href', 'src']) {
            const value = element.getAttribute(attribute);
            if (value && stellarRoute.test(value)) {
                element.setAttribute(attribute, window.stellarPath(value));
            }
        }
    }
};

window.rewriteStellarUrls = rewriteStellarUrls;
new MutationObserver((changes) => {
    for (const change of changes) {
        for (const node of change.addedNodes) rewriteStellarUrls(node);
    }
}).observe(document.body, { childList: true, subtree: true });
rewriteStellarUrls(document.body);
