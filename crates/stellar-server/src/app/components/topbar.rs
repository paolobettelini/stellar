use leptos::*;
use thaw::*;
use wasm_bindgen::prelude::*;
use web_sys::window;

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
pub fn Topbar(title: ReadSignal<String>) -> impl IntoView {
    let (themes_hidden, set_themes_hidden) = create_signal(true);

    let set_theme = |theme| {
        setLocalStorageTheme(theme);
        setBodyClass(theme);
    };

    // https://carlosted.github.io/icondata/

    view! {
        <div id="top-bar">
            <div id="top-bar-icons">
                <i>
                    <Icon icon=icondata::FaBarsSolid/>
                </i>
                <i id="topbar-search">
                    <a
                        style="color: inherit"
                        href="/search"
                        rel="external" >
                        <Icon icon=icondata::ImSearch/>
                    </a>
                </i>
                <i
                    id="topbar-theme"
                    on:click=move |_| {
                        set_themes_hidden.update(|v| *v = !*v)
                    }
                >
                    <Icon icon=icondata::FaPaintbrushSolid/>
                </i>
                <ul
                    id="theme-list"
                    style:display=move || if themes_hidden() { "none" } else { "block" }
                >
                    // TODO: set LocalStorage and re-render page
                    <Button on_click=move |_| set_theme("theme-light")>"Light"</Button>
                    <Button on_click=move |_| set_theme("theme-dark")>"Dark"</Button>
                </ul>
            </div>

            <div id="top-bar-title">{title}</div>
        </div>
    }
}
