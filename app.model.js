const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

let db;

async function makeConnection() {
  db = await sqlite.open({
    filename: 'books.db',
    driver: sqlite3.Database
  });
}


async function getAllBooks() {  
    const books = await db.all('SELECT * FROM books');
    return books;
    }

module.exports = {makeConnection, getAllBooks};