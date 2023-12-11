use reqwest::Url;

use crate::entities::discord::{AccessTokenRequest, AccessTokenResponse};

use super::configuration::ConfigurationService;

#[derive(Clone)]
pub struct DiscordOAuthService {
    config: ConfigurationService,
}

impl DiscordOAuthService {
    pub fn new(config: ConfigurationService) -> Self {
        Self { config }
    }

    pub async fn create_redirect_url(&self) -> String {
        let config = self.config.get().await;

        format!("https://discord.com/oauth2/authorize?response_type=code&client_id={}&scope=identify&redirect_uri={}/api/login/oauth/discord/callback&prompt=consent",
            config.oauth.client_id, config.url)
    }

    pub async fn complete_authentication(
        &self,
        code: String,
    ) -> anyhow::Result<AccessTokenResponse> {
        let config = self.config.get().await;

        let client = reqwest::Client::new();

        let base: Url = config.oauth.discord_api_url.parse()?;

        let request_data = AccessTokenRequest {
            grant_type: "authorization_code".into(),
            code,
            redirect_uri: format!("{}/api/login/oauth/discord/callback", config.url),
            client_id: config.oauth.client_id,
            client_secret: config.oauth.client_secret.clone(),
            scope: "identify".to_owned(),
        };

        dbg!(&request_data);

        let query_encoded = serde_urlencoded::to_string(&request_data)?;

        let url = base.join("oauth2/token")?;

        dbg!(&url);

        let body = client
            .post(url)
            .header("Content-Type", "application/x-www-form-urlencoded")
            .body(query_encoded)
            .send()
            .await?
            .text()
            .await?;

        dbg!(&body);

        Ok(serde_json::from_str(&body)?)
    }
}
