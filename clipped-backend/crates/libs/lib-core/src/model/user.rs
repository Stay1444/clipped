use serde::{Deserialize, Serialize};
use surreal_id::NewId;
use surrealdb::opt::RecordId;

#[derive(PartialEq, Serialize, Deserialize, Clone, Debug)]
pub struct UserId(RecordId);

impl NewId for UserId {
    const TABLE: &'static str = "users";

    fn from_inner_id<T: Into<surrealdb::sql::Id>>(inner_id: T) -> Self {
        UserId(RecordId {
            tb: Self::TABLE.to_string(),
            id: inner_id.into(),
        })
    }

    fn get_inner_string(&self) -> String {
        self.0.id.to_string()
    }
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct User {
    pub id: UserId,
    pub admin: bool,
    pub storage_space: u64,
}
