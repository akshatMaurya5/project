import { createSchema, CreateClient, connectToDb, disconnectToDb } from './config/db';

// Function to insert data
async function addData() {
    const client = CreateClient();
    await connectToDb(client);

    try {
        await client.query(`
            INSERT INTO users (name, description)
            VALUES 
            ('akshat', 'this is description')
        `);
        console.log("Data inserted");
    } catch (error) {
        console.error('Error inserting data:', error instanceof Error ? error.stack : error);
        throw error;
    } finally {
        await disconnectToDb(client);
    }
}

// Main function to create schema and insert data
async function main() {
    try {
        await createSchema();
        await addData();
    } catch (error) {
        console.error('Operation failed:', error);
    }
}

main();
