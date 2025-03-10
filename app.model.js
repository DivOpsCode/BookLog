const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

let db;

async function makeConnection()
{
  db = await sqlite.open({
    filename: 'books.db',
    driver: sqlite3.Database
  })
};

module.exports = {

  makeConnection,

  getAllBooks: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM books", [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },


  addBook: (title, author, genre, rating) => {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO books (title, author, genre, rating) VALUES (?, ?, ?, ?)",
        [title, author, genre, rating],
        function (err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  },


  getBookById: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  },


  updateBook: (id, title, author, genre, rating) => {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE books SET title=?, author=?, genre=?, rating=? WHERE id=?",
        [title, author, genre, rating, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  },

  
  deleteBook: (id) => {
    return new Promise((resolve, reject) => {
      sqlite.run("DELETE FROM books WHERE id=?", [id], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  },


  deleteAllBooks: () => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM books", (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  },


  toggleFavorite: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT is_favorite FROM books WHERE id=?", [id], (err, row) => {
        if (err) reject(err);
        const newStatus = row.is_favorite ? 0 : 1;
        db.run("UPDATE books SET is_favorite=? WHERE id=?", [newStatus, id], (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    });
  },

 
  getBooksByGenre: (genre) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM books WHERE genre=?", [genre], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },

  sortBooks: (field) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM books ORDER BY ${field} ASC`, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
};
