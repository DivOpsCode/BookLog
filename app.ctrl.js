const express = require("express");
const mustacheExpress = require("mustache-express");
const path = require("path");
const BookModel = require("./app.model");

const app = express();
const router = express.Router();
const PORT = 3000;

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
    const books = await BookModel.getAllBooks(); 
    const book = await BookModel.getBookById(id);
    res.render("main_page", { books, showUpdateForm: true, book });
  });

router.post("/add", async (req, res) => {
  const { title, author, genre, rating } = req.body;
  await BookModel.addBook(title, author, genre, rating);
  res.redirect("/");
});



router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, rating } = req.body;
  await BookModel.updateBook(id, title, author, genre, rating);
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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
