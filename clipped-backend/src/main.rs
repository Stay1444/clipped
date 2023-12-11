use std::process::exit;

use surrealdb::{engine::remote::ws::Ws, Surreal};
use tracing::{error, info};

mod api;
mod entities;
mod services;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt().pretty().init();

    info!("Starting");

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

    match db.use_ns("clipped").use_db("clipped").await {
        Ok(_) => (),
        Err(err) => {
            error!("Error switching DB to clipped::clipped: {}", err);
            exit(1);
        }
    }

    info!("Successfully connected to SurrealDB");

    api::run(db).await?;

    info!("Exiting");

    Ok(())
}
