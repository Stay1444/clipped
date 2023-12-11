use std::net::SocketAddr;

use axum::{extract::FromRef, response::IntoResponse, Router};
use serde::Serialize;
use surrealdb::{engine::remote::ws::Client, Surreal};
use tokio::net::TcpListener;
use tracing::info;

use crate::services::{configuration::ConfigurationService, discord::DiscordOAuthService};

mod controllers;

#[derive(Clone, FromRef)]
pub struct AppState {
    configuration_service: ConfigurationService,
    discord_oauth_service: DiscordOAuthService,
}

#[derive(Serialize, Clone, Debug)]
pub struct ApiResponse<T>
where
    T: Serialize,
{
    pub success: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<&'static str>,
    pub data: Option<T>,
}

impl<T> IntoResponse for ApiResponse<T>
where
    T: Serialize,
{
    fn into_response(self) -> axum::response::Response {
        let json = axum::Json(self);

        json.into_response()
    }
}

pub async fn run(db: Surreal<Client>) -> anyhow::Result<()> {
    let configuration_service = ConfigurationService::new("config.yaml");

    let addr: SocketAddr = "0.0.0.0:5000".parse().unwrap();

    info!("Ready, listening on {addr}");

    let state = AppState {
        configuration_service: configuration_service.clone(),
        discord_oauth_service: DiscordOAuthService::new(configuration_service.clone()),
    };

    let router = Router::new()
        .nest("/api", controllers::new(state))
        .into_make_service();

    let listener = TcpListener::bind(addr).await.unwrap();

    axum::serve(listener, router).await.unwrap();

    Ok(())
}
