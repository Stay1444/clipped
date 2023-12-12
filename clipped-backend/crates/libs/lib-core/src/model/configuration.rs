use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Default)]
pub struct Configuration {
    pub external_url: String,
    pub defaults: DefaultsConfiguration,
}

#[derive(Debug, Deserialize, Serialize, Default)]
pub struct DefaultsConfiguration {
    pub user: DefaultsConfigurationUser,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct DefaultsConfigurationUser {
    pub storage_space: u64,
}

impl Default for DefaultsConfigurationUser {
    fn default() -> Self {
        Self {
            storage_space: 1024 * 1024 * 1024, // 1 GB
        }
    }
}
