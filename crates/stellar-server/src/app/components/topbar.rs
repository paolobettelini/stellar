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
pub fn Topbar(
    title: Signal<String>,
    #[prop(optional)] set_navbar_hidden: Option<WriteSignal<bool>>,
    #[prop(default = true)] show_search: bool,
    #[prop(optional)] edit_href: Option<Signal<String>>,
) -> impl IntoView {
    let (themes_hidden, set_themes_hidden) = signal(true);

    let set_theme = |theme| {
        setLocalStorageTheme(theme);
        setBodyClass(theme);
    };

    // https://carloskiki.github.io/icondata/

    view! {
        <div id="top-bar">
            <div id="top-bar-icons">
                {set_navbar_hidden.map(|set_navbar_hidden| {
                    view! {
                        <i id="topbar-hamburger" on:click=move |_| set_navbar_hidden.update(|v| *v = !*v)>
                            <a href=""><Icon icon=icondata::FaBarsSolid/></a>
                        </i>
                    }
                })}
                {show_search.then(|| {
                    view! {
                        <i id="topbar-search">
                            <a
                                style="color: inherit"
                                href="/search" >
                                <Icon icon=icondata::ImSearch/>
                            </a>
                        </i>
                    }
                })}
                {edit_href.map(|edit_href| {
                    view! {
                        <i id="topbar-edit">
                            <a
                                style="color: inherit"
                                href=move || edit_href.get() >
                                <Icon icon=icondata::FaPenToSquareSolid/>
                            </a>
                        </i>
                    }
                })}
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
                    // TODO: re-render page)
                    <button type="button" on:click=move |_| set_theme("theme-light")>"Light"</button>
                    <button type="button" on:click=move |_| set_theme("theme-dark")>"Dark"</button>
                    <button type="button" on:click=move |_| set_theme("theme-violet")>"Violet"</button>
                    <button type="button" on:click=move |_| set_theme("theme-mint")>"Mint"</button>
                    <button type="button" on:click=move |_| set_theme("theme-sepia")>"Sepia"</button>
                    <button type="button" on:click=move |_| set_theme("theme-earth")>"Earth"</button>
                    <button type="button" on:click=move |_| set_theme("theme-brutalist")>"Brutalist"</button>
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
