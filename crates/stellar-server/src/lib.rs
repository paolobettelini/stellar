#![recursion_limit = "256"]
pub mod config;

// Hydrate feature-gated function(s)
mod hydrate;
#[cfg(feature = "hydrate")]
pub use hydrate::*;

// Server Sider Rendering feature-gated function(s)
mod server;
#[cfg(feature = "ssr")]
pub use server::*;

pub(crate) mod app;
#[cfg(feature = "ssr")]
pub(crate) mod assets;
#[cfg(feature = "ssr")]
mod data;
#[cfg(feature = "ssr")]
pub(crate) mod routes;
