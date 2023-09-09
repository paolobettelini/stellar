let themeList = document.getElementById('theme-list');
let themeListDisplay = false;

document.getElementById('topbar-theme').onclick = openThemeList;

// Go to /search when pressing the search button
document.getElementById('topbar-search').onclick = () => {
    window.location = '/search';
}

function openThemeList() {
    themeList.style.display = themeListDisplay ? 'none' : 'block';
    themeListDisplay = !themeListDisplay;
}

function setTheme(theme) {
    console.log(`Setting theme :${theme}`);

    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
}

// Set theme initially
(function () {
    let theme = localStorage.getItem('theme');
    
    if (theme == null) {
        setTheme('theme-light');
    } else {
        setTheme(theme)
    }
})();