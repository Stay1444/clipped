use std::env;

fn main() {
    println!("{}", env::var("XDG_SESSION_TYPE").unwrap());
    println!("Hello, world!");
}
