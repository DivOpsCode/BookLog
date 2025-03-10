const express = require('express');
const app = express();  

const Model = require('./app.model.js');

async function startup(){
    await Model.makeConnection();
}

startup();

const mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


app.get('/', async function(req, res) {
    const booksArray = await Model.getAllBooks();
    console.log(booksArray);
  res.render('main_page', {books: booksArray});
}
);

//Catch all route
app.get (/^(.+)$/, function(req, res) {
    res.sendFile(__dirname + req.params[0]);
    }); 

app.listen(3000, function() {
  console.log('Server is running on port 3000')});


