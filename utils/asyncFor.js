module.exports = async (array, callback, arrayToPush) => {
    for (let i = 0; i < array.length; i += 1) {
      const result = await callback(array[i])
      arrayToPush.push(result)
    }  
  };