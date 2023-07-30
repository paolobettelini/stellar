use mongodb::{Database, Client, options::ClientOptions};
use mongodb::bson::{doc, Document};
use anyhow::Result;

const DATABASE: &str = "stellar";
const SNIPPETS_COLLECTION: &str = "snippets";
const PAGES_COLLECTION: &str = "pages";
const COURSES_COLLECTION: &str = "courses";

pub struct DatabaseHandler {
    db: Database,
}

impl DatabaseHandler {
    pub async fn new(uri: &str) -> Result<Self> {
        let client_options = ClientOptions::parse(uri).await?;
        
        let client = Client::with_options(client_options)?;
        let db = client.database(DATABASE);
        
        Ok(Self { db })
    }
}