 module.exports =  (bookIds) => {

    const bookCount = bookIds.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
      }, {});

    //   Object.entries(bookCount).forEach(([key, value]) => {
         
    //   });
    
      

    

  }