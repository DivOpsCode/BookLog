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
      rating INTEGER CHECK (rating BETWEEN 1 AND 5),
      review TEXT,
      date_read TEXT,
      status TEXT CHECK (status IN ('read', 'to-read')),
      is_favorite INTEGER DEFAULT 0
    )
  `);

  // Dummy records into the Books table
  db.run("INSERT INTO Books (title, author, genre, rating, review, date_read, status, is_favorite) VALUES (?,?,?,?,?,?,?,?)", 
    ["The Great Gatsby", "F. Scott Fitzgerald", "Classic", 5, "A timeless classic about the American dream.", "2024-01-15", "read", 1]);
  db.run("INSERT INTO Books (title, author, genre, rating, review, date_read, status, is_favorite) VALUES (?,?,?,?,?,?,?,?)", 
    ["To Kill a Mockingbird", "Harper Lee", "Fiction", 4, "A compelling story about justice and morality.", "2023-12-20", "read", 1]);
  db.run("INSERT INTO Books (title, author, genre, rating, review, date_read, status, is_favorite) VALUES (?,?,?,?,?,?,?,?)", 
    ["1984", "George Orwell", "Dystopian", 5, "A chilling vision of totalitarianism.", "2023-11-10", "read", 0]);
  db.run("INSERT INTO Books (title, author, genre, rating, review, date_read, status, is_favorite) VALUES (?,?,?,?,?,?,?,?)", 
    ["The Hobbit", "J.R.R. Tolkien", "Fantasy", 4, "An adventure-filled prequel to The Lord of the Rings.", "2023-10-05", "read", 1]);
  db.run("INSERT INTO Books (title, author, genre, rating, review, date_read, status, is_favorite) VALUES (?,?,?,?,?,?,?,?)", 
    ["Atomic Habits", "James Clear", "Self-Help", 5, "A great book on forming good habits.", "2023-09-01", "read", 0]);

});

db.close();
