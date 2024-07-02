if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'theme-light');
}
document.body.className = localStorage.getItem('theme');