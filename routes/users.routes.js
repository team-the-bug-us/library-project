const express = require('express');
const router = express.Router();

/* GET home page */

router.get("/profile/id", (req, res, next) => {
    res.render("user/my-profile");
  });

router.get("/id/shelf", (req, res, next) => {
  res.render("user/my-shelf");
});

module.exports = router;
