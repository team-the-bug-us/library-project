const express = require('express');
const Users = require('../models/User.model');
const router = express.Router();
const bcrypt = require("bcrypt");
const { application } = require('express');
const saltRounds = 10
const fileUploader = require('../config/cloudinary.config');
const randomProfileImageSrc = require('../utils/randomProfileImageSrc')

/* GET home page */

router.get("/login", (req, res, next) => {
    res.render("auth/login");
  });


  router.post("/login", (req, res, next) => {

    /* console.log(req.body) */

    const {email, password} = req.body

    if(email ==="" || password==="" ) {
      res.render('auth/login',{errorMessage:'fill both email & pwd'})
      return
    }
  
    Users.findOne({email})
    .then((user)=>{
      if(!user){
        res.render('auth/login',{errorMessage:"user doesn't exist"})
        return
      } else if (bcrypt.compareSync(password,user.hashedPassword)) {
        req.session.currentUser = user
        res.redirect(`/profile`)
      } else {
        res.render('auth/login',{errorMessage:"incorrect pwd"})
      }
 
    })
    .catch(err=>console.log(`error with the login ${err}`))
    
  });


router.get("/signup", (req, res, next) => {

  res.render("auth/signup");
});

router.post("/signup", fileUploader.single("profileImgUrl"),(req, res, next) => {
  
  let {username, email, password, isAdmin} = req.body
  isAdmin = (isAdmin==="on")? true:false
 
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  //email and password client inputs validation
  if(!username || !password){
      res.render("auth/signup", {errorMessage: "You have to fill both fields"})
      return
  }else if(!regex.test(password)){
      res.render("auth/signup", {username, password, errorMessage:"The password has to have minimum 6 characters with at least one lower case and one upper case letter"})
      return
  }

  bcrypt
  .genSalt(saltRounds)
  .then(salt => bcrypt.hash(password,salt))
  .then(hashedPassword => {
    console.log(req.file)
    return Users.create({username:username,profileImgUrl:req.file?.path || randomProfileImageSrc(),email:email,hashedPassword: hashedPassword,isAdmin:isAdmin})
  })
  .then(user =>{
    req.session.currentUser = user.toObject()
    delete req.session.currentUser.hashedPassword 

    res.redirect(`/profile`)
  })
  .catch(err=>console.log(`error with the signup ${err}`))
  
});


router.post("/logout",(req,res,next)=>{
  req.session.destroy(err=>{
     if(err) next (err);
     res.redirect('/')
   })
})

module.exports = router;
