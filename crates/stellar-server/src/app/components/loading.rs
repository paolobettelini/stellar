use leptos::prelude::*;

#[component]
pub fn LoadingIndicator() -> impl IntoView {
    view! {
        <div class="stellar-loading" role="status" aria-live="polite">
            <span class="stellar-loading-dots" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
            </span>
            <span class="stellar-loading-label">"Loading"</span>
        </div>
    }
}
