const express = require("express");
const { route } = require("./index.routes");
const router = express.Router();
const Users = require("../models/User.model");
const { isLoggedIn, isLoggedOut } = require("../middlewares/route-guard");
const axios = require("axios");
const asyncFor = require("../utils/asyncFor");
const callbackFor = require("../utils/callbackFor");
const fileUploader = require("../config/cloudinary.config");
const fillingImgUrl = "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/mystery-book-cover-design-template-a5dce61a0c99630dedab42e3a4c15618_screen.jpg?ts=1637014687"

/* GET home page */

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("user/my-profile");
});

router.post(
  "/profile/add-profile-image",
  fileUploader.single("profileImgUrl"),
  (req, res, next) => {
    Users.findByIdAndUpdate(
      req.session.currentUser._id,
      { profileImgUrl: req.file.path },
      { new: true }
    )
      .then((user) => {
        req.session.currentUser = user.toObject();
        res.redirect("/profile");
      })
      .catch((err) => console.log("Profile image upload err:", err));
  }
);

router.get("/profile/shelf", isLoggedIn, (req, res, next) => {
  let books = [];
  Users.findById(req.session.currentUser._id)
    .then((user) => {
      const bookIds = user.books;
      return asyncFor(bookIds, callbackFor, books);
    })
    .then(() => {
      console.log(books);
      
      res.render("user/my-shelf", { books });
    })
    .catch((err) =>
      console.log("something went wrong with showing shelf", err)
    );
});

router.post("/add-book/:id", (req, res, next) => {
  Users.findById(req.session.currentUser._id).then((user) => {
    if (user.books.indexOf(req.params.id) > -1) {
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

router.post("/add-book/:id/detail", (req, res, next) => {
  Users.findById(req.session.currentUser._id).then((user) => {
    if (user.books.indexOf(req.params.id) > -1) {
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
