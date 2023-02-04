const express = require('express');
const router = express.Router();
const Users = require('../models/User.model')
const asyncFor = require("../utils/asyncFor");
const callbackFor = require("../utils/callbackFor");
const rankBooks = require('../utils/rank-books')
/* GET home page */
router.get("/", (req, res, next) => {
  let bookIds =[]
  const books=[]
  Users.find()
  .then((users)=>{ 
    for(let i in users){
      bookIds = bookIds.concat(users[i].books)

    } 

    console.log(rankBooks(bookIds))
    return asyncFor(bookIds, callbackFor, books);
  }) 
  .then(()=> res.render('index',{books}))
  .catch(err=>console.log('error with the async function for carousel :', err))

 
});
router.get("/about-us", (req, res, next) => {
  res.render("about-us");
});




module.exports = router;
