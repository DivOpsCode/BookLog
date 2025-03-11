const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("books.db", (err) => {
  if (err) {
    console.error("❌ Error connecting to the database:", err.message);
  } else {
    console.log("✅ Connected to the books database.");
  }
});

module.exports = {

  getAllBooks: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM Books", [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },


  addBook: (title, author, genre, rating, review, date_read, status) => {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO Books (title, author, genre, rating, review, date_read, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, author, genre, rating, review, date_read, status],
        function (err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  },

  
  getBookById: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM Books WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  },

  
  updateBook: (id, title, author, genre, rating, review, date_read, status) => {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE Books SET title=?, author=?, genre=?, rating=?, review=?, date_read=?, status=? WHERE id=?",
        [title, author, genre, rating, review, date_read, status, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  },

 
  deleteBook: (id) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM Books WHERE id=?", [id], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  },


  deleteAllBooks: () => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM Books", (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  },

 
  toggleFavorite: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT is_favorite FROM Books WHERE id=?", [id], (err, row) => {
        if (err) reject(err);
        const newStatus = row.is_favorite ? 0 : 1;
        db.run("UPDATE Books SET is_favorite=? WHERE id=?", [newStatus, id], (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    });
  },

 
  getBooksByGenre: (genre) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM Books WHERE genre=?", [genre], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },


  sortBooks: (field) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Books ORDER BY ${field} ASC`, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
};
