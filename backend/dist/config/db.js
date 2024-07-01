"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = exports.disconnectToDb = exports.connectToDb = exports.CreateClient = void 0;
const pg_1 = require("pg");
function CreateClient() {
    return new pg_1.Client({
        connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
    });
}
exports.CreateClient = CreateClient;
function connectToDb(client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to the PostgreSQL database");
            return client;
        }
        catch (error) {
            console.error('Connection error:', error instanceof Error ? error.stack : error);
            throw error;
        }
    });
}
exports.connectToDb = connectToDb;
function disconnectToDb(client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.end();
            console.log("Disconnected to DB");
        }
        catch (error) {
            console.error('Error disconnecting from database:', error instanceof Error ? error.stack : error);
            throw error;
        }
    });
}
exports.disconnectToDb = disconnectToDb;
function createSchema() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = CreateClient();
        yield connectToDb(client);
        try {
            yield client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                description TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
            console.log("Schema created successfully");
        }
        catch (error) {
            console.error('Error creating schema:', error instanceof Error ? error.stack : error);
            throw error;
        }
    });
}
exports.createSchema = createSchema;
// createSchema().catch(error => console.error('Schema creation failed:', error));
