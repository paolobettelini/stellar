// Hydrate feature-gated function(s)
mod hydrate;
#[cfg(feature = "hydrate")]
pub use hydrate::*;

// Server Sider Rendering feature-gated function(s)
mod server;
#[cfg(feature = "ssr")]
pub use server::*;

#[cfg(feature = "ssr")]
pub(crate) mod routes;
pub(crate) mod app;

#[cfg(feature = "ssr")]
mod data;