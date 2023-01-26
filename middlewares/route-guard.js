const isLoggedIn = (req,res,next)=>{
    if(!req.session.currentUser){
        return res.redirect('/login')
    }  
    next()
    
}

const isLoggedOut = (req,res,next)=>{
    if(req.session.currentUser){
        return res.redirect('/profile')
    }  
    next()
    
}


// const isAdmin = (req,res,next)=>{
//     if(req.session.currentUser.userType ==='Admin'){
//         next()
//     }  
     
// }

module.exports={isLoggedIn, isLoggedOut}