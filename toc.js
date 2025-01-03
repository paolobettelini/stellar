// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="welcome.html"><strong aria-hidden="true">1.</strong> Welcome</a></li><li class="chapter-item expanded affix "><li class="part-title">Stellar</li><li class="chapter-item expanded "><a href="stellar_installation.html"><strong aria-hidden="true">2.</strong> Installation</a></li><li class="chapter-item expanded "><a href="stellar_introduction.html"><strong aria-hidden="true">3.</strong> Introduction</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="stellar_snippets.html"><strong aria-hidden="true">3.1.</strong> Snippets</a></li><li class="chapter-item expanded "><a href="stellar_pages.html"><strong aria-hidden="true">3.2.</strong> Pages</a></li><li class="chapter-item expanded "><a href="stellar_courses.html"><strong aria-hidden="true">3.3.</strong> Courses</a></li><li class="chapter-item expanded "><a href="stellar_universes.html"><strong aria-hidden="true">3.4.</strong> Universes</a></li></ol></li><li class="chapter-item expanded "><a href="pdf_stellar_format.html"><strong aria-hidden="true">4.</strong> PDF Stellar Format</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="format_commands.html"><strong aria-hidden="true">4.1.</strong> Format Commands</a></li><li class="chapter-item expanded "><a href="latex_package.html"><strong aria-hidden="true">4.2.</strong> LaTeX Package</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="usage.html"><strong aria-hidden="true">4.2.1.</strong> Usage</a></li><li class="chapter-item expanded "><a href="example.html"><strong aria-hidden="true">4.2.2.</strong> Example</a></li><li class="chapter-item expanded "><a href="vscode.html"><strong aria-hidden="true">4.2.3.</strong> Visual Studio Code</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="stellar_cli.html"><strong aria-hidden="true">5.</strong> Stellar CLI</a></li><li class="chapter-item expanded affix "><li class="part-title">LaTeX-driven Implementation</li><li class="chapter-item expanded "><a href="notes_installation.html"><strong aria-hidden="true">6.</strong> Installation</a></li><li class="chapter-item expanded "><a href="notes_structure.html"><strong aria-hidden="true">7.</strong> Structure</a></li><li class="chapter-item expanded "><a href="notes_compiler.html"><strong aria-hidden="true">8.</strong> Compiler</a></li><li class="chapter-item expanded "><a href="snippet_build_scripts.html"><strong aria-hidden="true">9.</strong> Snippet Build Scripts</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="example_script.html"><strong aria-hidden="true">9.1.</strong> Example Script</a></li></ol></li><li class="chapter-item expanded "><a href="common_snippets.html"><strong aria-hidden="true">10.</strong> Common snippets</a></li><li class="chapter-item expanded "><a href="mathjax.html"><strong aria-hidden="true">11.</strong> MathJax support</a></li><li class="chapter-item expanded affix "><li class="part-title">Miscellaneous</li><li class="chapter-item expanded "><a href="misc_fish.html"><strong aria-hidden="true">12.</strong> Fish configuration</a></li><li class="chapter-item expanded "><a href="misc_vscode.html"><strong aria-hidden="true">13.</strong> VS Code configuration</a></li><li class="chapter-item expanded "><a href="misc_todo.html"><strong aria-hidden="true">14.</strong> TODO</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
