const express = require('express');
const router = express.Router();

/* GET home page */

router.get("/books", (req, res, next) => {
    res.render("books/book-list");
  });

router.get("/books/id", (req, res, next) => {
  res.render("books/book-details");
});

module.exports = router;
