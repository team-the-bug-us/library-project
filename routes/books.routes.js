const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
const router = express.Router();
const Books = require("../models/Books.model")
const Comments = require("../models/Comments.model")
const axios = require("axios");
/* GET home page */

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


//search function

function createSearchBookUrl(arrWords){
    return `https://www.googleapis.com/books/v1/volumes?q=${arrWords.join("+")}`
}


router.post("/searchAPI", (req,res,next)=>{
  const arrWords = req.body.keywords.split(" ")
  console.log(arrWords)
  axios.get(createSearchBookUrl(arrWords))
  .then(result => {
    // add property to items
    const items = result.data.items
    res.render("books/book-list", {items})
  })
  .catch(err => console.log("API access error", err))

//add google book to our data base

/* router.post("/books/:googleId/details", (req, res, next)=>{
  
}) */

/*   let books;
  Users.find()
    .then((shelf) => {
      books = shelf
      return axios.get(createSearchBookUrl(arrWords))
    })
  .then(result => {
    // add property to items
    const items =result.data.items
    res.render("books/book-list", {items})
  })
  .catch(err => console.log("API access error", err)) */
})

module.exports = router;
 