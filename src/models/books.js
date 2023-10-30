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
        await db.read();
        db.data.books.push(bookData);
        await db.write();
        return bookData;
    }

    static async find() {
        await db.read();
        return db.data.books;
    }

    static async findById(bookId) {
        await db.read();
        return db.data.books.filter( (book) => book.id == bookId );
    }

    static async findByIdAndUpdate(bookId, bookData) {
        await db.read();
        for(var book of db.data.books) {
            if(book.id == bookId) {
                /*if(bookData.title) book.title = bookData.title;
                if(bookData.author) book.author = bookData.author;
                if(bookData.publisher) book.publisher = bookData.publisher;
                if(bookData.price) book.price = bookData.price;
                if(bookData.stock) book.stock = bookData.stock;
                if(bookData.img) book.img = bookData.img;*/

                book = update(book, bookData);

                await db.write();
                return book;
            }
        }
    }

    static async findByIdAndDelete(bookId) {
        await db.read();
        db.data.books = db.data.books.filter( (book) => book.id != bookId );
        await db.write();
    }
}


function update(obj/*, …*/) {
    for (var i=1; i<arguments.length; i++) {
        for (var prop in arguments[i]) {
            var val = arguments[i][prop];
            if (typeof val == "object")
                update(obj[prop], val);
            else
                obj[prop] = val;
        }
    }
    return obj;
}

export default Books;