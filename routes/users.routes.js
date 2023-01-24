const express = require('express');
const { route } = require('./index.routes');
const router = express.Router();
const Users = require('../models/User.model'); 

/* GET home page */

router.get("/profile/:id", (req, res, next) => {
  Users.findById(req.params.id)
  .then((result)=>{
    res.render("user/my-profile",result);
  })

  .catch(err=>console.log(`error with the profile page: ${err}`))
  });

router.get("/profile/:id/shelf", (req, res, next) => {
  Users.findById(req.params.id)
  .then((result)=>{
    res.render("user/my-shelf",result);
  }) 
});


module.exports = router;
