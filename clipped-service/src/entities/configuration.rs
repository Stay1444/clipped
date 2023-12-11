use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default)]
pub struct Configuration {
    pub url: String,
    pub oauth: OAuthConfiguration,
}

#[derive(Serialize, Deserialize)]
pub struct OAuthConfiguration {
    pub client_id: u64,
    pub client_secret: String,
    pub discord_api_url: String,
}

impl Default for OAuthConfiguration {
    fn default() -> Self {
        Self {
            client_id: Default::default(),
            client_secret: Default::default(),
            discord_api_url: "https://discord.com/api/v10".to_owned(),
        }
    }
}
