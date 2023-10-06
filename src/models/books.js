import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { v4 as uuidv4 } from 'uuid';

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
console.log("Low DB loaded from " + file);

// Configure lowdb to write data to JSON file
const adapter = new JSONFile(file)
const defaultData = { posts: [] }
const db = new Low(adapter, defaultData)

class Books {

    static async insert(bookData) {
        bookData.id = uuidv4();
        await db.read()
        db.data.books.push(bookData)
        await db.write();
        return bookData;
    }

    static async find() {
        await db.read()
        return db.data.books;
    }

    static async findByIdAndDelete(bookId) {
        await db.read()
        db.data.books = db.data.books.filter( (book) => book.id != bookId );
        await db.write();
    }
}

export default Books;