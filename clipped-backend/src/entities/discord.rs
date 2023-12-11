use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug)]
pub struct AccessTokenRequest {
    pub grant_type: String,
    pub code: String,
    pub redirect_uri: String,
    pub client_id: u64,
    pub client_secret: String,
    pub scope: String,
}

#[derive(Deserialize, Debug)]
pub struct AccessTokenResponse {
    pub access_token: String,
    pub token_type: String,
    pub refresh_token: String,
    pub scope: String,
}
