use mongodb::{Cursor, IndexModel, Client, options::{IndexOptions, ReplaceOptions, ClientOptions, InsertOneOptions}};
use mongodb::bson::{doc};
use anyhow::Result;

pub mod model;

use model::*;

const DATABASE: &str = "stellar";
const SNIPPETS_COLLECTION: &str = "snippets";
const PAGES_COLLECTION: &str = "pages";
const COURSES_COLLECTION: &str = "courses";
const UNIVERSES_COLLECTION: &str = "universes";

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
        self.create_index::<Universe>("id", UNIVERSES_COLLECTION).await?;

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

    pub async fn insert_snippet(&self, snippet: &Snippet) -> anyhow::Result<()> {
        let collection = self.client.database(DATABASE).collection::<Snippet>(SNIPPETS_COLLECTION);
        let filter = doc! { "id": &snippet.id }; 

        let options = ReplaceOptions::builder().upsert(true).build();
        collection.replace_one(filter.clone(), snippet, options).await?;

        Ok(())
    }

    pub async fn insert_page(&self, page: &Page) -> anyhow::Result<()> {
        let collection = self.client.database(DATABASE).collection::<Page>(PAGES_COLLECTION);
        let filter = doc! { "id": &page.id }; 

        let options = ReplaceOptions::builder().upsert(true).build();
        collection.replace_one(filter.clone(), page, options).await?;

        Ok(())
    }

    pub async fn insert_course(&self, course: &Course) -> anyhow::Result<()> {
        let collection = self.client.database(DATABASE).collection::<Course>(COURSES_COLLECTION);
        let filter = doc! { "id": &course.id }; 

        let options = ReplaceOptions::builder().upsert(true).build();
        collection.replace_one(filter.clone(), course, options).await?;

        Ok(())
    }

    pub async fn insert_universe(&self, universe: &Universe) -> anyhow::Result<()> {
        let collection = self.client.database(DATABASE).collection::<Universe>(UNIVERSES_COLLECTION);
        let filter = doc! { "id": &universe.id }; 

        let options = ReplaceOptions::builder().upsert(true).build();
        collection.replace_one(filter.clone(), universe, options).await?;

        Ok(())
    }

    pub async fn query_snippets(&self, keyword: &str) -> anyhow::Result<Cursor<Snippet>> {
        let collection = self.client.database(DATABASE).collection::<Snippet>(SNIPPETS_COLLECTION);
        let filter = doc! { "id": {"$regex": keyword} };

        Ok(collection.find(filter, None).await?)
    }

    pub async fn query_snippet(&self, id: &str) -> anyhow::Result<Option<Snippet>> {
        let collection = self.client.database(DATABASE).collection::<Snippet>(SNIPPETS_COLLECTION);
        let filter = doc! { "id": id };

        Ok(collection.find_one(filter, None).await?)
    }

    pub async fn query_pages(&self, keyword: &str) -> anyhow::Result<Cursor<Page>> {
        let collection = self.client.database(DATABASE).collection::<Page>(PAGES_COLLECTION);
        let filter = doc! { "id": {"$regex": keyword} };

        Ok(collection.find(filter, None).await?)
    }

    pub async fn query_page(&self, id: &str) -> anyhow::Result<Option<Page>> {
        let collection = self.client.database(DATABASE).collection::<Page>(PAGES_COLLECTION);
        let filter = doc! { "id": id };

        Ok(collection.find_one(filter, None).await?)
    }

    pub async fn query_courses(&self, keyword: &str) -> anyhow::Result<Cursor<Course>> {
        let collection = self.client.database(DATABASE).collection::<Course>(COURSES_COLLECTION);
        let filter = doc! { "id": {"$regex": keyword} };

        Ok(collection.find(filter, None).await?)
    }

    pub async fn query_course(&self, id: &str) -> anyhow::Result<Option<Course>> {
        let collection = self.client.database(DATABASE).collection::<Course>(COURSES_COLLECTION);
        let filter = doc! { "id": id };

        Ok(collection.find_one(filter, None).await?)
    }

    pub async fn query_universes(&self, keyword: &str) -> anyhow::Result<Cursor<Universe>> {
        let collection = self.client.database(DATABASE).collection::<Universe>(UNIVERSES_COLLECTION);
        let filter = doc! { "id": {"$regex": keyword} };

        Ok(collection.find(filter, None).await?)
    }
    
    pub async fn query_universe(&self, id: &str) -> anyhow::Result<Option<Universe>> {
        let collection = self.client.database(DATABASE).collection::<Universe>(UNIVERSES_COLLECTION);
        let filter = doc! { "id": id };

        Ok(collection.find_one(filter, None).await?)
    }

    pub async fn snippet_exists(&self, id: &str) -> Result<bool> {
        let collection = self.client.database(DATABASE).collection::<Snippet>(SNIPPETS_COLLECTION);
        let filter = doc! { "id": id };
        let count = collection.count_documents(filter, None).await?;
        Ok(count > 0)
    }

    pub async fn page_exists(&self, id: &str) -> Result<bool> {
        let collection = self.client.database(DATABASE).collection::<Page>(PAGES_COLLECTION);
        let filter = doc! { "id": id };
        let count = collection.count_documents(filter, None).await?;
        Ok(count > 0)
    }

    pub async fn course_exists(&self, id: &str) -> Result<bool> {
        let collection = self.client.database(DATABASE).collection::<Course>(COURSES_COLLECTION);
        let filter = doc! { "id": id };
        let count = collection.count_documents(filter, None).await?;
        Ok(count > 0)
    }

    pub async fn universe_exists(&self, id: &str) -> Result<bool> {
        let collection = self.client.database(DATABASE).collection::<Universe>(UNIVERSES_COLLECTION);
        let filter = doc! { "id": id };
        let count = collection.count_documents(filter, None).await?;
        Ok(count > 0)
    }

    pub async fn get_pages_containing_snippet(&self, snippet_id: &str, course_id: &str) -> Result<Vec<Page>> {
        // Retrieve the course document by the given course ID
        let course_collection = self.client.database(DATABASE).collection::<Course>(COURSES_COLLECTION);
        let course_filter = doc! { "id": course_id };
        let course = course_collection.find_one(course_filter, None).await?;

        if let Some(course) = course {
            let mut pages_containing_snippet = Vec::new();

            // Retrieve the page documents by the list of page IDs in the course
            let page_collection = self.client.database(DATABASE).collection::<Page>(PAGES_COLLECTION);
            for page_id in course.pages {
                let page_filter = doc! { "id": &page_id };
                if let Some(page) = page_collection.find_one(page_filter, None).await? {
                    // Check if the page contains the given snippet ID
                    if page.snippets.contains(&snippet_id.to_string()) {
                        pages_containing_snippet.push(page);
                    }
                }
            }

            Ok(pages_containing_snippet)
        } else {
            Ok(Vec::new())
        }
    }

    pub async fn get_courses_containing_snippet(&self, snippet_id: &str, universe_id: &str) -> Result<Vec<Course>> {
        // Retrieve the universe document by the given universe ID
        let universe_collection = self.client.database(DATABASE).collection::<Universe>(UNIVERSES_COLLECTION);
        let universe_filter = doc! { "id": universe_id };
        let universe = universe_collection.find_one(universe_filter, None).await?;

        if let Some(universe) = universe {
            let mut courses_containing_snippet = Vec::new();

            // Retrieve the course documents by the list of course IDs in the universe
            let course_collection = self.client.database(DATABASE).collection::<Course>(COURSES_COLLECTION);
            let page_collection = self.client.database(DATABASE).collection::<Page>(PAGES_COLLECTION);

            for course_id in universe.courses {
                let course_filter = doc! { "id": &course_id };
                if let Some(course) = course_collection.find_one(course_filter, None).await? {
                    let mut contains_snippet = false;

                    // Retrieve the page documents by the list of page IDs in the course
                    for page_id in &course.pages {
                        let page_filter = doc! { "id": page_id };
                        if let Some(page) = page_collection.find_one(page_filter, None).await? {
                            // Check if the page contains the given snippet ID
                            if page.snippets.contains(&snippet_id.to_string()) {
                                contains_snippet = true;
                                break;
                            }
                        }
                    }

                    if contains_snippet {
                        courses_containing_snippet.push(course);
                    }
                }
            }

            Ok(courses_containing_snippet)
        } else {
            Ok(Vec::new()) // Return an empty vector if the universe is not found
        }
    }
}