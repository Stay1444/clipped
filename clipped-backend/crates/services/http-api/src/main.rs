use std::{process::exit, sync::Arc};

use async_trait::async_trait;
use lib_core::{
    model::{configuration::Configuration, user::UserId},
    providers::configuration::ConfigurationProvider,
    repository::user::UserRepository,
};
use surreal_id::NewId;
use surrealdb::{
    engine::remote::ws::{Client, Ws},
    Surreal,
};
use tracing::{error, info};

struct ConfProv;

#[async_trait]
impl ConfigurationProvider for ConfProv {
    async fn get(&self) -> Arc<Configuration> {
        Arc::new(Configuration::default())
    }
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().pretty().init();

    info!("Starting");

    let db = surreal_connect().await;

    let cprov = Arc::new(ConfProv) as Arc<dyn ConfigurationProvider>;
    let repo = UserRepository::new(&db, &cprov);

    let id = UserId::from_inner_id("abc".to_owned());

    dbg!(repo.get(id.clone()).await);

    dbg!(repo.create(id.clone()).await);

    dbg!(repo.get(id.clone()).await);

    dbg!(repo.create(id.clone()).await);

    info!("Exiting");
}

async fn surreal_connect() -> Surreal<Client> {
    info!("Connecting to SurrealDB");

    let db = match Surreal::new::<Ws>("0.0.0.0:8000").await {
        Ok(db) => db,
        Err(err) => {
            error!("Error connecting to database: {}", err);
            exit(1);
        }
    };

    match db
        .signin(surrealdb::opt::auth::Root {
            username: "root",
            password: "root",
        })
        .await
    {
        Ok(_) => (),
        Err(err) => {
            error!("Error logging into SurrealDB: {}", err);
            exit(1);
        }
    };

    match db.use_ns("staytools").use_db("clipped").await {
        Ok(_) => (),
        Err(err) => {
            error!("Error switching DB to staytools::clipped: {}", err);
            exit(1);
        }
    }

    info!("Successfully connected to SurrealDB");

    db
}
