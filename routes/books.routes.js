const express = require('express');
const router = express.Router();
const Books = require("../models/Books.model")

/* GET home page */

router.get("/books", (req, res, next) => {
  Books.find()
  .then(result => {
    console.log(result)
    res.render("books/book-list", {result})
  })
  });

router.get("/books/:id", (req, res, next) => {
  Books.findById(req.params.id)
  .then(result => res.render("books/book-details", result))
});

module.exports = router;
