use std::sync::Arc;

use tokio::sync::RwLock;
use tracing::{error, info};

use crate::entities::configuration::Configuration;

#[derive(Clone)]
pub struct ConfigurationService {
    path: String,
    cache: Arc<RwLock<Option<Arc<Configuration>>>>,
}

impl ConfigurationService {
    pub fn new(path: &str) -> Self {
        Self {
            path: path.into(),
            cache: Arc::default(),
        }
    }

    pub async fn get(&self) -> Arc<Configuration> {
        let present = { self.cache.read().await.is_some() };

        if !present {
            let config = read_config(&self.path).unwrap_or_else(|_| {
                info!("Creating default configuration file: '{}' ", &self.path);

                let config = Configuration::default();
                match save_config(&config, &self.path) {
                    Ok(_) => (),
                    Err(err) => {
                        error!("Error creating configuration file! {err}");
                        panic!("Error creating configuration file");
                    }
                }

                config
            });

            let config = Arc::new(config);
            let mut write = self.cache.write().await;
            *write = Some(config.clone());
            config
        } else {
            let read = self.cache.read().await;
            match read.as_ref() {
                Some(config) => config.clone(),
                None => unreachable!(),
            }
        }
    }
}

fn save_config(config: &Configuration, path: &str) -> anyhow::Result<()> {
    let yaml = serde_yaml::to_string(config)?;

    std::fs::write(path, yaml)?;

    Ok(())
}

fn read_config(path: &str) -> anyhow::Result<Configuration> {
    let yaml = std::fs::read_to_string(path)?;

    Ok(serde_yaml::from_str(&yaml)?)
}
