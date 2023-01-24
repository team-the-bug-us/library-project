const express = require('express');
const Users = require('../models/User.model');
const router = express.Router();
 

/* GET home page */

router.get("/login", (req, res, next) => {
    res.render("auth/login");
  });


  router.post("/login", (req, res, next) => {

    console.log(req.body)

    const {email, hashedPassword} = req.body

    if(email ==="" || hashedPassword==="" ) {
      res.render('auth/login',{errorMessage:'fill both email & pwd'})
      return
    }
  
    Users.findOne({email})
    .then((user)=>{
      if(!user){
        res.render('auth/login',{errorMessage:"user doesn't exist"})
        return
      } else if (user.hashedPassword === hashedPassword) {
        res.redirect(`/profile/${user._id}`)
      } else {
        res.render('auth/login',{errorMessage:"incorrect pwd"})
      }
 
    })
    .catch(err=>console.log(`error with the login ${err}`))
    
  });


router.get("/signup", (req, res, next) => {

  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  
  Users.create(req.body)
  .then((result)=>{
    console.log(result._id)
    res.redirect(`/profile/${result._id}`);
  })
  .catch(err=>console.log(`error with the signup ${err}`))
  
});


router.post("/logout",(req,res,next)=>{
  // req.session.destroy(err=>{
  //   if(err) next (err);
  //   res.redirect('/')
  // })
  res.redirect('/')
})

module.exports = router;
