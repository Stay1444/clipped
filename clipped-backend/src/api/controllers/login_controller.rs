use axum::{
    extract::{Query, State},
    response::{IntoResponse, Redirect},
    routing::get,
    Json, Router,
};
use serde::Deserialize;
use tracing::error;

use crate::{
    api::AppState,
    services::{configuration::ConfigurationService, discord::DiscordOAuthService},
};

pub fn new(state: AppState) -> Router {
    Router::new()
        .route("/oauth/discord", get(discord_oauth_begin))
        .route("/oauth/discord/callback", get(discord_oauth_callback))
        .with_state(state)
}

async fn discord_oauth_begin(State(oauth): State<DiscordOAuthService>) -> impl IntoResponse {
    let url = oauth.create_redirect_url().await;

    Redirect::to(&url)
}

#[derive(Deserialize)]
struct EndOAuthQuery {
    code: String,
}

async fn discord_oauth_callback(
    State(oauth): State<DiscordOAuthService>,
    Query(query): Query<EndOAuthQuery>,
) -> impl IntoResponse {
    let result = match oauth.complete_authentication(query.code).await {
        Ok(x) => x,
        Err(err) => {
            error!("Error completing oauth discord request: {err}");
            return "There has been an error completing your authorization process :("
                .into_response();
        }
    };

    dbg!(result);
    todo!()
}
