import { Client } from "pg";

export function CreateClient() {
    return new Client({
        connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
    });
}

export async function connectToDb(client: Client) {
    try {
        await client.connect();
        console.log("Connected to the PostgreSQL database");
        return client;
    } catch (error) {
        console.error('Connection error:', error instanceof Error ? error.stack : error);
        throw error;
    }
}

export async function disconnectToDb(client: Client) {
    try {
        await client.end();
        console.log("Disconnected to DB");

    } catch (error) {
        console.error('Error disconnecting from database:', error instanceof Error ? error.stack : error);
        throw error;
    }
}


export async function createSchema() {
    const client = CreateClient();
    await connectToDb(client);


    try {

        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                description TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Schema created successfully");


    } catch (error) {
        console.error('Error creating schema:', error instanceof Error ? error.stack : error);
        throw error;
    }
}


