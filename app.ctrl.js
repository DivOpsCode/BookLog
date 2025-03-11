const express = require("express");
const mustacheExpress = require("mustache-express");
const BookModel = require("./app.model");

const app = express();
const router = express.Router();
app.use(express.static("images"));

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname +"/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 

router.get("/", async (req, res) => {
  const books = await BookModel.getAllBooks();
  res.render("main_page", { books });
});

router.get("/add", async (req, res) => {
   const books = await BookModel.getAllBooks(); 
   res.render("main_page", { books, showAddForm: true });
  });

router.get("/update/:id", async (req, res) => {
    try {
      const { id } = req.params; 
      const books = await BookModel.getAllBooks();
      const book = await BookModel.getBookById(id);
  
      if (!book) {
        return res.status(404).send("Book not found");
      }
  
      res.render("main_page", { books, showUpdateForm: true, book });
    } catch (error) {
      console.error("Error fetching book for update:", error);
      res.status(500).send("Internal Server Error");
    }
  });

router.post("/add", async (req, res) => {
    const { title, author, genre, rating, review, date_read, status } = req.body;
    const books = await BookModel.getAllBooks();
  
    let errors = [];
  
    if (title.length < 3) {
      errors.push("Title must be at least 3 characters long.");
    }
  
    if (!/^[A-Za-z\s]+$/.test(genre)) {
      errors.push("Genre must contain only letters (no numbers or special characters).");
    }
  
    if (errors.length > 0) {
      return res.render("main_page", { 
        books, 
        showAddForm: true, 
        errors, 
        formData: { title, author, genre, rating, review, date_read, status } 
      });
    }
  
    await BookModel.addBook(title, author, genre, rating, review, date_read, status);
    res.redirect("/");
  });
  
  
router.post("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, rating, review, date_read, status } = req.body;
    const books = await BookModel.getAllBooks();
    const book = await BookModel.getBookById(id);
  

    let errors = [];
  
    if (title.length < 3) {
      errors.push("Title must be at least 3 characters long.");
    }
  
    if (!/^[A-Za-z\s]+$/.test(genre)) {
      errors.push("Genre must contain only letters (no numbers or special characters).");
    }
  
    if (errors.length > 0) {
      return res.render("main_page", { 
        books, 
        showUpdateForm: true, 
        book, 
        errors, 
        formData: { title, author, genre, rating, review, date_read, status } 
      });
      
    }

    await BookModel.updateBook(id, title, author, genre, rating, review, date_read, status);
    res.redirect("/");
  });
  
  
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await BookModel.deleteBook(id);
  res.redirect("/");
});

router.get("/delete-all", async (req, res) => {
  await BookModel.deleteAllBooks();
  res.redirect("/");
});

router.get("/favorite/:id", async (req, res) => {
  const { id } = req.params;
  await BookModel.toggleFavorite(id);
  res.redirect("/");
});

router.get("/filter", async (req, res) => {
  const { genre } = req.query;
  const books = genre ? await BookModel.getBooksByGenre(genre) : await BookModel.getAllBooks();
  res.render("main_page", { books });
});

router.get("/sort/:field", async (req, res) => {
  const { field } = req.params;
  const books = await BookModel.sortBooks(field);
  res.render("main_page", { books });
});

app.use("/", router);

app.listen(3000, function() { console.log("server listening on port 3000...")});
