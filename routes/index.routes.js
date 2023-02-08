const express = require('express');
const router = express.Router();
const Users = require('../models/User.model')
const asyncFor = require("../utils/asyncFor");
const callbackFor = require("../utils/callbackFor");
const topPicked= require('../utils/users-top-picks')
const topRated = require('../utils/best-ratings')
/* GET home page */


router.get("/", (req, res, next) => {
  let bookIds =[]
  const topPickedBooks=[]
  let topRatedBooks = []
  let topPickedBookIds
  Users.find()
  .then((users)=>{ 
    for(let i in users){
      bookIds = bookIds.concat(users[i].books)
    } 
    topPickedBookIds = topPicked(bookIds)
    return bookIds
  })
  .then(bookIds=> {
    console.log(bookIds)
    topRatedBooks = topRated(bookIds)
    console.log(topRatedBooks)
  })
  .then(() => asyncFor(topPickedBookIds, callbackFor, topPickedBooks))
  .then(()=> res.render('index',{topPickedBooks:topPickedBooks,topRatedBooks:topRatedBooks}))
  .catch(err=>console.log('error with the async function for carousel :', err))

});


router.get("/about-us", (req, res, next) => {
  res.render("about-us");
});




module.exports = router;
