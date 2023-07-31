use mongodb::{IndexModel, Database, Client, options::{IndexOptions, ClientOptions, InsertOneOptions}};
use mongodb::bson::{doc, Document};
use anyhow::Result;

pub mod model;

use model::*;

const DATABASE: &str = "stellar";
const SNIPPETS_COLLECTION: &str = "snippets";
const PAGES_COLLECTION: &str = "pages";
const COURSES_COLLECTION: &str = "courses";

#[derive(Clone, Debug)]
pub struct ClientHandler {
    client: Client,
}

impl ClientHandler {
    pub async fn new(uri: &str) -> Result<Self> {
        let client_options = ClientOptions::parse(uri).await?;
        
        let client = Client::with_options(client_options)?;
        
        Ok(Self { client })
    }

    /// Creates an index on the "id" field to force the values to be unique.
    pub async fn create_indexes(&self) -> anyhow::Result<()> {
        self.create_index::<Snippet>("id", SNIPPETS_COLLECTION).await?;
        self.create_index::<Page>("id", PAGES_COLLECTION).await?;
        self.create_index::<Course>("id", COURSES_COLLECTION).await?;

        Ok(())
    }
    
    async fn create_index<T>(&self, field: &str, collection: &str) -> anyhow::Result<()> {
        let options = IndexOptions::builder().unique(true).build();
        let model = IndexModel::builder()
            .keys(doc! { field: 1 })
            .options(options)
            .build();
        
        let _ = &self.client
            .database(DATABASE)
            .collection::<T>(collection)
            .create_index(model, None)
            .await?;

        Ok(())
    }

    pub async fn insert_snippet(&self, snippet: &Snippet, options: impl Into<Option<InsertOneOptions>>) -> anyhow::Result<()> {
        let collection = self.client.database(DATABASE).collection::<Snippet>(SNIPPETS_COLLECTION);
        let filter = doc! { "id": &snippet.id }; 
        if collection.find_one(filter.clone(), None).await?.is_none() {
            collection.insert_one(snippet, options).await?;
        }

        Ok(())
    }

    pub async fn insert_page(&self, page: &Page, options: impl Into<Option<InsertOneOptions>>) -> anyhow::Result<()> {
        let collection = self.client.database(DATABASE).collection::<Page>(PAGES_COLLECTION);
        let filter = doc! { "id": &page.id }; 
        if collection.find_one(filter.clone(), None).await?.is_none() {
            collection.insert_one(page, options).await?;
        }

        Ok(())
    }

    pub async fn insert_course(&self, course: &Course, options: impl Into<Option<InsertOneOptions>>) -> anyhow::Result<()> {
        let collection = self.client.database(DATABASE).collection::<Course>(COURSES_COLLECTION);
        let filter = doc! { "id": &course.id }; 
        if collection.find_one(filter.clone(), None).await?.is_none() {
            collection.insert_one(course, options).await?;
        }

        Ok(())
    }
}