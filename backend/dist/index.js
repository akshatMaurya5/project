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
const db_1 = require("./config/db");
// Function to insert data
function addData() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = (0, db_1.CreateClient)();
        yield (0, db_1.connectToDb)(client);
        try {
            yield client.query(`
            INSERT INTO users (name, description)
            VALUES 
            ('akshat', 'this is description')
        `);
            console.log("Data inserted");
        }
        catch (error) {
            console.error('Error inserting data:', error instanceof Error ? error.stack : error);
            throw error;
        }
        finally {
            yield (0, db_1.disconnectToDb)(client);
        }
    });
}
// Main function to create schema and insert data
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.createSchema)();
            yield addData();
        }
        catch (error) {
            console.error('Operation failed:', error);
        }
    });
}
main();
