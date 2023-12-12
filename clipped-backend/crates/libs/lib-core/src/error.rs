use thiserror::Error;

#[derive(Error, Debug)]
pub enum RepositoryError {
    #[error("Error reaching the database")]
    DatabaseError,
    #[error("Operation Error")]
    OperationError(OperationError),
}

#[derive(Error, Debug)]
pub enum OperationError {
    #[error("Record already exists")]
    AlreadyExists,
}
