const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
const router = express.Router();
const Books = require("../models/Books.model")
const Comments = require("../models/Comments.model")
const axios = require("axios");
const fillingImgUrl = "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/mystery-book-cover-design-template-a5dce61a0c99630dedab42e3a4c15618_screen.jpg?ts=1637014687"

/* GET home page */

router.get("/books/:id", (req, res, next) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}`)
  .then(result => {
    const book = result.data
    //remove p tage from description
    book.volumeInfo.description.replace("<p>","")
    book.volumeInfo.description.replace("</p>","")
    book.volumeInfo.description.replace("</i>","")
    book.volumeInfo.description.replace("<i>","")
    book.volumeInfo.description.replace("<br>","")
    return book
    })
    .then(book => {
    const imageLinks = book.volumeInfo.imageLinks
    if(imageLinks){
    book.volumeInfo.imageLinks = imageLinks.extraLarge || imageLinks.large || imageLinks.medium ||  imageLinks.small ||  imageLinks.thumbnail ||  imageLinks.smallThumbnail
    }else{
      book.volumeInfo.imageLinks = fillingImgUrl
    }
    console.log(book.volumeInfo.imageLinks)
    
    Comments.find({bookId:req.params.id})
    .populate("userId")
    .then(comments => {
/*       console.log(comments)*/ 
      console.log(book) 
      res.render("books/book-details", {book ,comments})
    })
    .catch(error=>console.log("there was an error with getting book details", error))
  })
});


router.post("/books/:id/post-comment", (req,res,next)=>{
  const {rating, comment} = req.body
  Comments.create({userId: req.session.currentUser._id, bookId:req.params.id, rating:rating, comment:comment })
  .then(()=>res.redirect(`/books/${req.params}`))
  .catch(error=>console.log("there was an error with creating comment", error))
})

router.post("/delete-comment/:id", (req,res,next)=>{
  Comments.findById(req.params.id)
  .then((comment)=>{
    Comments.findByIdAndDelete(req.params.id)
  .then(()=>{ 
    res.redirect(`/books/${comment.bookId}`)})

  })
  .catch(error=>console.log("there was an error with creating comment", error))
})


//search function


function createSearchBookUrl(arrWords){
    return `https://www.googleapis.com/books/v1/volumes?q=${arrWords.join("+")}`
}


router.post("/search-results", (req,res,next)=>{
  const arrWords = req.body.keywords.split(" ")
  console.log(arrWords)
  axios.get(createSearchBookUrl(arrWords))
  .then(result => {
    // add property to items
    let items = result.data.items
    console.log(items[0])
    for(let i=0; i< items.length; i++){
      let imageLinks = items[i].volumeInfo.imageLinks
      if(imageLinks){
      items[i].volumeInfo.imageLinks = imageLinks.extraLarge || imageLinks.large || imageLinks.medium ||  imageLinks.small ||  imageLinks.thumbnail ||  imageLinks.smallThumbnail
    }else{
      items[i].volumeInfo.imageLinks =fillingImgUrl
    }}
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
 

