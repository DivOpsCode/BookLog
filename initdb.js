var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("books.db");

db.serialize(function () {
  // Drop table if it exists
  db.run("DROP TABLE IF EXISTS Books");

  // Create Books table
  db.run(`
    CREATE TABLE Books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      genre TEXT NOT NULL,
      rating REAL CHECK (rating BETWEEN 1 AND 5),
      review TEXT,
      date_read TEXT,
      status TEXT CHECK (status IN ('read', 'to-read')),
      is_favorite INTEGER DEFAULT 0
    )
  `);

  // Dummy records into the Books table
  db.run("INSERT INTO Books (title, author, genre, rating, review, date_read, status, is_favorite) VALUES (?,?,?,?,?,?,?,?)", 
    ["The Catcher in the Rye", "J.D. Salinger", "Classic", 4, "A coming-of-age novel with deep themes.", "2023-08-15", "read", 1]);
db.run("INSERT INTO Books (title, author, genre, rating, review, date_read, status, is_favorite) VALUES (?,?,?,?,?,?,?,?)", 
    ["Pride and Prejudice", "Jane Austen", "Romance", 5, "A timeless romance with witty social commentary.", "2023-07-20", "read", 1]);
db.run("INSERT INTO Books (title, author, genre, rating, review, date_read, status, is_favorite) VALUES (?,?,?,?,?,?,?,?)", 
    ["Sapiens", "Yuval Noah Harari", "History", 5, "A fascinating look at the history of humankind.", "2023-06-10", "to-read", 0]);
db.run("INSERT INTO Books (title, author, genre, rating, review, date_read, status, is_favorite) VALUES (?,?,?,?,?,?,?,?)", 
    ["The Alchemist", "Paulo Coelho", "Fiction", 4, "A philosophical novel about chasing dreams.", "2023-05-05", "read", 1]);
db.run("INSERT INTO Books (title, author, genre, rating, review, date_read, status, is_favorite) VALUES (?,?,?,?,?,?,?,?)", 
    ["Dune", "Frank Herbert", "Science Fiction", 5, "An epic sci-fi novel with deep world-building.", "2023-04-01", "read", 0]);

});

db.close();
