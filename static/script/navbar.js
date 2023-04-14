let navbarWidth = 200;
let navbar = document.getElementById('navbar');
/*let isResizing = false;
const navbarToggle = document.getElementById('navbar-toggle');
const resizeHandle = document.getElementById('resize-handle');

resizeHandle.addEventListener('mousedown', function(e) {
    isResizing = true;
});

document.addEventListener('mousemove', function(e) {
    if (isResizing) {
        navbarWidth = e.clientX;
        navbar.style.width = navbarWidth + 'px';
    }
});

document.addEventListener('mouseup', function() {
    isResizing = false;
});*/

document.getElementById('navbar-toggle').addEventListener('click', function() {
    navbar.classList.toggle('retracted');
    document.getElementById('navbar-toggle').classList.toggle('retracted');
    document.getElementById('content').classList.toggle('retracted');
});