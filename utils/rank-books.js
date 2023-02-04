 module.exports =  (bookIds) => {

    const bookCount = bookIds.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
      }, {});
 
    //   Object.entries(bookCount).forEach(([key, value]) => {
         
    //   });
    const finalBookIds =[]
    for (let bookId in bookCount){
        finalBookIds.push(bookId)

    }

    return finalBookIds.splice(0,5) 
      

    

  }