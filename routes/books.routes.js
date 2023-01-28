const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
const router = express.Router();
const Books = require("../models/Books.model")
const Comments = require("../models/Comments.model")
/* GET home page */

router.get("/books",(req, res, next) => {
 
  Books.find()
  .then(books => {
    /* console.log(books) */
    const result = {books, userLoggedIn: req.session.currentUser}
    res.render("books/book-list", result)
  })
  });

router.get("/books/:id", (req, res, next) => {
  Books.findById(req.params.id)
  .then(book => {
    Comments.find({bookId:req.params.id})
    .populate("userId")
    .then(comments => {
      /* console.log(comments)
      console.log(book) */
      res.render("books/book-details", {book,comments})
    })
    
  })
});


router.post("/books/:id/post-comment", (req,res,next)=>{
  const {rating, comment} = req.body
  Comments.create({userId: req.session.currentUser._id, bookId:req.params.id, rating:rating, comment:comment })
  .then(()=>res.redirect(`/books/${req.params.id}`))
  .catch(error=>console.log("there was an error with creating comment", error))
})

module.exports = router;
