use leptos::*;
use thaw::*;

#[component]
pub fn Topbar(title: ReadSignal<String>) -> impl IntoView {
    let theme = use_context::<RwSignal<Theme>>().unwrap();
    let (themes_hidden, set_themes_hidden) = create_signal(true);

    // https://carlosted.github.io/icondata/

    let set_dark_theme = move |_| {
        theme.update(|theme| {
            theme.common.color_primary = "#c8c9db".to_string();
            theme.common.background_color = "#161923".to_string();

            // TODO: set the class "theme-dark" to body

            /*.theme-dark {
                --col1: #c8c9db; /* Text */
                --col2: #161923; /* Background */
                --col3: #2c2d41; /* Nav Background */
                --col4: #286f96; /* Colored Text */
            }*/
        });
    };

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
                    <Button on_click=move |_| theme.set(Theme::light())>"Light"</Button>
                    <Button on_click=set_dark_theme>"Dark"</Button>
                </ul>
            </div>

            <div id="top-bar-title">{title}</div>
        </div>
    }
}
