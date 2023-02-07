const asyncFor = require("./asyncFor");
const callbackFor = require("./callbackFor");

module.exports = async function (bookIds){
  // issue with awaiting the asyncFor and then executing the rest
  let books = [];
  let uniqueBookIds = [...new Set(bookIds)];
  let topRatedBooks =[]
  await asyncFor(uniqueBookIds, callbackFor, books)
  .then(() => {
    //filter out the book with no rating
    books = books.filter(book=>book.volumeInfo.averageRating)
  })
  .then(()=>{
    topRatedBooks = books.sort((a,b)=>b.volumeInfo.averageRating - a.volumeInfo.averageRating).splice(0,5)
    
  })
  .catch(err=>console.log("error on getting best rated 5 movies",err))
  // watch out, unlike the top pick list, this array contains book
  return topRatedBooks
};
