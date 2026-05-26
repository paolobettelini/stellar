use leptos::prelude::*;
use std::time::Duration;
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

#[wasm_bindgen(inline_js = r#"
export function getCurrentTheme() {
    return localStorage.getItem('theme') || document.body.className || 'theme-light';
}
"#)]
extern "C" {
    fn getCurrentTheme() -> String;
}

#[wasm_bindgen(inline_js = r#"
export function dispatchThemeChange(theme) {
    window.dispatchEvent(new CustomEvent('stellar-theme-change', { detail: theme }));
}
"#)]
extern "C" {
    fn dispatchThemeChange(theme: &str);
}

#[wasm_bindgen(inline_js = r#"
export function syncThemeButtons(theme) {
    document
        .querySelectorAll('#theme-list button[data-theme]')
        .forEach((button) => {
            button.classList.toggle('active', button.dataset.theme === theme);
        });
}
"#)]
extern "C" {
    fn syncThemeButtons(theme: &str);
}

#[wasm_bindgen(inline_js = r#"
export function copyHrefToClipboard(href) {
    const url = new URL(href, window.location.origin).toString();

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url);
        return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
}
"#)]
extern "C" {
    fn copyHrefToClipboard(href: &str);
}

#[cfg(all(feature = "hydrate", target_arch = "wasm32"))]
fn current_theme_initial_value() -> String {
    getCurrentTheme()
}

#[cfg(not(all(feature = "hydrate", target_arch = "wasm32")))]
fn current_theme_initial_value() -> String {
    String::new()
}

#[cfg(all(feature = "hydrate", target_arch = "wasm32"))]
fn sync_theme_buttons(theme: &str) {
    syncThemeButtons(theme);
}

#[cfg(not(all(feature = "hydrate", target_arch = "wasm32")))]
fn sync_theme_buttons(_theme: &str) {
}

fn theme_button_class(current_theme: String, theme: &str) -> &'static str {
    if current_theme
        .split_whitespace()
        .any(|current| current == theme)
    {
        "active"
    } else {
        ""
    }
}

#[component]
pub fn Topbar(
    title: Signal<String>,
    #[prop(optional)] set_navbar_hidden: Option<WriteSignal<bool>>,
    #[prop(default = true)] show_search: bool,
    #[prop(optional)] edit_href: Option<Signal<String>>,
    #[prop(optional)] share_href: Option<Signal<String>>,
) -> impl IntoView {
    let (themes_hidden, set_themes_hidden) = signal(true);
    let (share_popup_visible, set_share_popup_visible) = signal(false);
    let (current_theme, set_current_theme) = signal(current_theme_initial_value());

    #[cfg(all(feature = "hydrate", target_arch = "wasm32"))]
    Effect::new(move |_| {
        let theme = getCurrentTheme();
        set_current_theme.set(theme.clone());
        sync_theme_buttons(&theme);
    });

    let set_theme = move |theme| {
        setLocalStorageTheme(theme);
        setBodyClass(theme);
        set_current_theme.set(theme.to_string());
        sync_theme_buttons(theme);
        dispatchThemeChange(theme);
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
                {share_href.map(|share_href| {
                    view! {
                        <i id="topbar-share">
                            <a
                                style="color: inherit"
                                href=move || share_href.get()
                                on:click=move |event| {
                                    event.prevent_default();
                                    copyHrefToClipboard(&share_href.get());
                                    set_share_popup_visible.set(true);
                                    let _ = leptos::leptos_dom::helpers::set_timeout(
                                        move || set_share_popup_visible.set(false),
                                        Duration::from_millis(1800),
                                    );
                                }
                            >
                                <Icon icon=icondata::FaCopySolid/>
                            </a>
                        </i>
                    }
                })}
                <i
                    id="topbar-theme"
                    on:click=move |_| {
                        #[cfg(all(feature = "hydrate", target_arch = "wasm32"))]
                        {
                            let theme = getCurrentTheme();
                            set_current_theme.set(theme.clone());
                            sync_theme_buttons(&theme);
                        }
                        set_themes_hidden.update(|v| *v = !*v)
                    }
                >
                    <a href=""><Icon icon=icondata::FaPaintbrushSolid/></a>
                </i>
                <ul
                    id="theme-list"
                    style:display=move || if themes_hidden() { "none" } else { "block" }
                >
                    <button
                        type="button"
                        data-theme="theme-light"
                        class=move || theme_button_class(current_theme(), "theme-light")
                        on:click=move |_| set_theme("theme-light")
                    >"Light"</button>
                    <button
                        type="button"
                        data-theme="theme-dark"
                        class=move || theme_button_class(current_theme(), "theme-dark")
                        on:click=move |_| set_theme("theme-dark")
                    >"Dark"</button>
                    <button
                        type="button"
                        data-theme="theme-violet"
                        class=move || theme_button_class(current_theme(), "theme-violet")
                        on:click=move |_| set_theme("theme-violet")
                    >"Violet"</button>
                    <button
                        type="button"
                        data-theme="theme-mint"
                        class=move || theme_button_class(current_theme(), "theme-mint")
                        on:click=move |_| set_theme("theme-mint")
                    >"Mint"</button>
                    <button
                        type="button"
                        data-theme="theme-sepia"
                        class=move || theme_button_class(current_theme(), "theme-sepia")
                        on:click=move |_| set_theme("theme-sepia")
                    >"Sepia"</button>
                    <button
                        type="button"
                        data-theme="theme-earth"
                        class=move || theme_button_class(current_theme(), "theme-earth")
                        on:click=move |_| set_theme("theme-earth")
                    >"Earth"</button>
                    <button
                        type="button"
                        data-theme="theme-brutalist"
                        class=move || theme_button_class(current_theme(), "theme-brutalist")
                        on:click=move |_| set_theme("theme-brutalist")
                    >"Brutalist"</button>
                </ul>
                <i id="topbar-github">
                    <a
                        style="color: inherit"
                        href="https://github.com/paolobettelini/notes"
                        target="_blank" >
                        <Icon icon=icondata::BsGithub/>
                    </a>
                </i>
            </div>

            <div id="top-bar-title">{title}</div>
            <div
                id="topbar-share-popup"
                class:visible=move || share_popup_visible()
            >
                "Course link copied to clipboard"
            </div>
        </div>
    }
}
