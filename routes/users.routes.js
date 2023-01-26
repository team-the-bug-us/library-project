const express = require('express');
const { route } = require('./index.routes');
const router = express.Router();
const Users = require('../models/User.model'); 
const Books = require('../models/Books.model')
const {isLoggedIn, isLoggedOut} = require('../middlewares/route-guard'); 

/* GET home page */

router.get("/profile",isLoggedIn, (req, res, next) => {
  res.render("user/my-profile",{userInSession: req.session.currentUser});
  });

router.get("/profile/shelf", isLoggedIn,(req, res, next) => {
    res.render("user/my-shelf",{userInSession: req.session.currentUser});
 
});

router.post('/add-book/:id',(req,res,next)=>{
  Users.findByIdAndUpdate(req.session.currentUser._id,{$push:{books:req.params.id}},{new:true})
  .then(()=>{res.redirect('/profile/shelf')})
  
  .catch((err)=>console.log('something went wrong with adding books',err))


})


module.exports = router;
