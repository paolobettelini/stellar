use leptos::*;
use thaw::*;

#[component]
pub fn Topbar(title: ReadSignal<String>) -> impl IntoView {
    let theme = use_context::<RwSignal<Theme>>().unwrap();
    let (themes_hidden, set_themes_hidden) = create_signal(true);

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
                    <Button on_click=move |_| theme.set(Theme::light())>"Light"</Button>
                    <Button on_click=move |_| theme.set(Theme::dark())>"Dark"</Button>
                </ul>
            </div>

            <div id="top-bar-title">{title}</div>
        </div>
    }
}
