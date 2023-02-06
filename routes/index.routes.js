const express = require('express');
const router = express.Router();
const Users = require('../models/User.model')
const asyncFor = require("../utils/asyncFor");
const callbackFor = require("../utils/callbackFor");
const topPicked= require('../utils/users-top-picks')
const bestRated = require('../utils/best-ratings')
/* GET home page */
/* router.get("/", (req, res, next) => {
  let bookIds =[]
  let topPickedBooks=[]
  let bestRatedBooks=[]
  Users.find()
  .then((users)=>{ 
    for(let i in users){
      bookIds = bookIds.concat(users[i].books)
    } 
    const topPickedBookIds = topPicked(bookIds)
    asyncFor(topPickedBookIds, callbackFor, topPickedBooks)
  })
  .then(()=> {
    bestRatedBooks = bestRated(bookIds)})
  .then(()=> {
    res.render('index',{books:topPickedBooks})})
  .catch(err=>console.log('error with top books:', err))
}); */

router.get("/", (req, res, next) => {
  let bookIds =[]
  const topPickedBooks=[]
  const books = []
  Users.find()
  .then((users)=>{ 
    for(let i in users){
      bookIds = bookIds.concat(users[i].books)
    } 
    const topPickedBookIds = topPicked(bookIds)
    return asyncFor(topPickedBookIds, callbackFor, books);
  })

  .then(()=> res.render('index',{books}))
  .catch(err=>console.log('error with the async function for carousel :', err))

 
});



router.get("/about-us", (req, res, next) => {
  res.render("about-us");
});




module.exports = router;
