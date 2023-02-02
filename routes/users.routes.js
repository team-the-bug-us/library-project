const express = require("express");
const { route } = require("./index.routes");
const router = express.Router();
const Users = require("../models/User.model");
const { isLoggedIn, isLoggedOut } = require("../middlewares/route-guard");
const axios = require('axios')
/* GET home page */

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("user/my-profile", { userInSession: req.session.currentUser });
});

router.get("/profile/shelf", isLoggedIn, (req, res, next) => {
  Users.findById(req.session.currentUser._id)
    .then((user) => {
      const bookIds = user.books
      let books 
      for(let i in bookIds){
        axios.get(`https://www.googleapis.com/books/v1/volumes/${bookIds[i]}`)
        .then(result => {
          console.log(typeof result.data)
          books.push(result.data)
        })
        .catch(err => console.log("book not pushed in array of books", err))
      }
      return books
    })
    .then(books => {
      console.log(books)
      res.render("user/my-shelf",{books})})
    .catch((err) =>console.log("something went wrong with showing shelf", err));
});

router.post("/add-book/:id", (req, res, next) => {

  Users.findById(req.session.currentUser._id).then((user) => {
    if (user.books.indexOf(req.params.id)>-1) { 
      // let error = document.getElementById("error") 
      // error.textContent = "Book already in Shelf"
      // error.style.color = "red" 
      res.redirect("/");  
      return
    } else {
      Users.findByIdAndUpdate(
        req.session.currentUser._id,
        { $push: { books: req.params.id } },
        { new: true }
      )
        .then(() => { 
          res.redirect("/profile/shelf");
        })

        .catch((err) =>
          console.log("something went wrong with adding books", err)
        );
    }
  });
});

router.post("/add-book/:id/detail", (req, res, next) => {

  Users.findById(req.session.currentUser._id).then((user) => {
    if (user.books.indexOf(req.params.id)>-1) {
      // req.session.currentUser.addBookError = 'Book already exists in your shelf' -- to add
      res.redirect(`/books/${req.params.id}`);
     
      return;
    } else {
      Users.findByIdAndUpdate(
        req.session.currentUser._id,
        { $push: { books: req.params.id } },
        { new: true }
      )
        .then(() => {
          res.redirect("/profile/shelf");
        })

        .catch((err) =>
          console.log("something went wrong with adding books", err)
        );
    }
  });
});

router.post("/delete-book/:id", (req, res, next) => {
  Users.findByIdAndUpdate(
    req.session.currentUser._id,
    { $pull: { books: req.params.id } },
    { new: true }
  )
    .then(() => {
      res.redirect("/profile/shelf");
    })

    .catch((err) =>
      console.log("something went wrong with deleting books", err)
    );
});

module.exports = router;
