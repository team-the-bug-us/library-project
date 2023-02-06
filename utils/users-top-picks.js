module.exports = (bookIds)=>{
    const top5 = []
    const bookCount = bookIds.reduce(function (acc, curr) {
        return acc[curr] ? acc[curr]++ : acc[curr] = 1, acc
      }, {});
    delete bookCount["0"]
    console.log(bookCount)
    Object.entries(bookCount).forEach(([key, value]) => {
      if(top5.length<5){
        top5.push({id:key,count:value})
      }else{
        for(let i in top5){
          if (top5[i].count<value){
            top5.splice(i,1,{id:key,count:value})
            break
          }
        }
      }
    });
    return top5.map(obj=>obj.id)
  }

/* const testArr = [1,1,1,4,5,6,6,7,7,9,0,3,3,3,4,10,12,24,24,24,77]

console.log(topPicks(testArr)) */