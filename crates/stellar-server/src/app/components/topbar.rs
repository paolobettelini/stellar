use leptos::prelude::*;
use wasm_bindgen::prelude::*;

#[component]
fn Icon(icon: icondata::Icon) -> impl IntoView {
    let view_box = icon.view_box.unwrap_or("0 0 24 24");
    let width = icon.width.unwrap_or("1em");
    let height = icon.height.unwrap_or("1em");
    let fill = icon.fill.unwrap_or("currentColor");

    view! {
        <svg
            aria-hidden="true"
            focusable="false"
            viewBox=view_box
            width=width
            height=height
            fill=fill
            style="display: inline-block; width: 1em; height: 1em; vertical-align: -0.125em;"
            inner_html=icon.data
        />
    }
}

#[wasm_bindgen(inline_js = r#"
export function setBodyClass(className) {
    document.body.className = className;
}
"#)]
extern "C" {
    fn setBodyClass(className: &str);
}

#[wasm_bindgen(inline_js = r#"
export function setLocalStorageTheme(theme) {
    localStorage.setItem('theme', theme);
}
"#)]
extern "C" {
    fn setLocalStorageTheme(theme: &str);
}

#[component]
pub fn Topbar(title: ReadSignal<String>, set_navbar_hidden: WriteSignal<bool>) -> impl IntoView {
    let (themes_hidden, set_themes_hidden) = signal(true);

    let set_theme = |theme| {
        setLocalStorageTheme(theme);
        setBodyClass(theme);
    };

    // https://carloskiki.github.io/icondata/

    view! {
        <div id="top-bar">
            <div id="top-bar-icons">
                <i id="topbar-hamburger" on:click=move |_| set_navbar_hidden.update(|v| *v = !*v)>
                    <a href=""><Icon icon=icondata::FaBarsSolid/></a>
                </i>
                <i id="topbar-search">
                    <a
                        style="color: inherit"
                        href="/search" >
                        <Icon icon=icondata::ImSearch/>
                    </a>
                </i>
                <i
                    id="topbar-theme"
                    on:click=move |_| {
                        set_themes_hidden.update(|v| *v = !*v)
                    }
                >
                    <a href=""><Icon icon=icondata::FaPaintbrushSolid/></a>
                </i>
                <ul
                    id="theme-list"
                    style:display=move || if themes_hidden() { "none" } else { "block" }
                >
                    // TODO: set LocalStorage and re-render page
                    <button type="button" on:click=move |_| set_theme("theme-light")>"Light"</button>
                    <button type="button" on:click=move |_| set_theme("theme-dark")>"Dark"</button>
                </ul>
                <i id="topbar-github">
                    <a
                        style="color: inherit"
                        href="https://github.com/paolobettelini/notes" >
                        <Icon icon=icondata::BsGithub/>
                    </a>
                </i>
            </div>

            <div id="top-bar-title">{title}</div>
        </div>
    }
}
