use axum::Router;

use super::AppState;

mod login_controller;

pub fn new(state: AppState) -> Router {
    Router::new().nest("/login", login_controller::new(state.clone()))
}
