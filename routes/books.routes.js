const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
const router = express.Router();
const Books = require("../models/Books.model")
const Comments = require("../models/Comments.model")
const axios = require("axios");
const fillingImgUrl = "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/mystery-book-cover-design-template-a5dce61a0c99630dedab42e3a4c15618_screen.jpg?ts=1637014687"
const sugestSimilarBooks = require("../utils/getSimilarBooks")
/* GET home page */

// new getbook page with sugestions: 

 router.get("/books/:id", (req, res, next) => {
  let sugestions
  let book
  axios.get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}`)
  .then(result => {
    book = result.data
    //remove p tags from description
    //clean as intermediate variable to carry on replace string
    let clean = book.volumeInfo.description.replaceAll("<p>","")
    clean = clean.replaceAll("</p>","")
    clean = clean.replaceAll("</i>","")
    clean = clean.replaceAll("<i>","")
    clean = clean.replaceAll("<br>","")
    clean = clean.replaceAll("<b>","")
    clean = clean.replaceAll("</b>","")
    book.volumeInfo.description = clean
    })
    .then(() =>{
      sugestSimilarBooks(book.volumeInfo.title)
      .then(response => {
        sugestions = response.data.choices[0].text.split(",")
      })
      .then(() => {
        const imageLinks = book.volumeInfo.imageLinks;
        if (imageLinks) {
          book.volumeInfo.imageLinks =
            imageLinks.extraLarge ||
            imageLinks.large ||
            imageLinks.medium ||
            imageLinks.small ||
            imageLinks.thumbnail ||
            imageLinks.smallThumbnail;
        } else {
          book.volumeInfo.imageLinks = fillingImgUrl;
        }
        //console.log(book.volumeInfo.imageLinks)
        Comments.find({bookId:req.params.id})
        .populate("userId")
        .then(comments => {
          //console.log(book) 
          res.render("books/book-details", {book, sugestions,comments})
        })
        .catch(error=>console.log("there was an error with getting book details: ", error))
      })
    })
});
 


 
router.post("/books/:id/post-comment", (req,res,next)=>{ 
  const {rating, comment} = req.body  
  Comments.create({userId: req.session.currentUser._id, bookId:req.params.id, rating:rating, comment:comment })
  .then(()=>res.redirect(`/books/${req.params.id}`))
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
    // console.log(items[0])
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
})

module.exports = router;
 

