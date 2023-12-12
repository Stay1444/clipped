use std::sync::Arc;

use surreal_id::NewId;
use surrealdb::{engine::remote::ws::Client, Surreal};

use crate::{
    error::{OperationError, RepositoryError},
    model::user::{User, UserId},
    providers::configuration::ConfigurationProvider,
};

#[derive(Clone)]
pub struct UserRepository {
    db: Surreal<Client>,
    config: Arc<dyn ConfigurationProvider>,
}

impl UserRepository {
    pub fn new(db: &Surreal<Client>, config: &Arc<dyn ConfigurationProvider>) -> Self {
        Self {
            db: db.clone(),
            config: config.clone(),
        }
    }

    pub async fn get(&self, id: UserId) -> Result<Option<User>, RepositoryError> {
        self.db
            .select((id.table(), id.id_without_brackets().as_str()))
            .await
            .map_err(|_| RepositoryError::DatabaseError)
    }

    pub async fn create(&self, id: UserId) -> Result<Option<User>, RepositoryError> {
        if let Ok(Some(_)) = self.get(id.clone()).await {
            return Err(RepositoryError::OperationError(
                OperationError::AlreadyExists,
            ));
        }

        let config = self.config.get().await;

        let user = User {
            id: id.clone(),
            admin: false,
            storage_space: config.defaults.user.storage_space,
        };

        self.db
            .create((id.table(), id.id_without_brackets().as_str()))
            .content(user)
            .await
            .map_err(|_| RepositoryError::DatabaseError)
    }
}
