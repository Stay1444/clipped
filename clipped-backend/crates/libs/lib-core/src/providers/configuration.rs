use std::sync::Arc;

use async_trait::async_trait;

use crate::model::configuration::Configuration;

#[async_trait]
pub trait ConfigurationProvider {
    async fn get(&self) -> Arc<Configuration>;
}
