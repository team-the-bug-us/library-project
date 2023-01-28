const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
const router = express.Router();
const Books = require("../models/Books.model")

/* GET home page */

router.get("/books",(req, res, next) => {
 
  Books.find()
  .then(books => {
    console.log(books)
    const result = {books, userLoggedIn: req.session.currentUser}
    res.render("books/book-list", result)
  })
  });

router.get("/books/:id", (req, res, next) => {
  Books.findById(req.params.id)
  .then(result => res.render("books/book-details", result))
});

module.exports = router;
