const Comments = require ('../models/Comments.model')
const asyncFor = require("./asyncFor");
const callbackFor = require("./callbackFor");


module.exports =  (bookIds) => { // issue with awaiting the asyncFor and then executing the rest
    let books =[]
    let uniqueBookIds = [...new Set(bookIds)] 
    asyncFor(uniqueBookIds, callbackFor, books)
    
    console.log(books)
    let bestBooks = books.splice(0,5)
    console.log(bestBooks)
    
    for(let i in books){
        for(let j in bestBooks){
            if(bestBooks[j].volumenInfo.averageRating > books[i].volumenInfo.averageRating){
                bestBooks.splice(j,1,books[i])
                continue
            }
        }
    }
    console.log(bestBooks)




  


  }