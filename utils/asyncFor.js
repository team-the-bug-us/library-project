module.exports = async (array, callback, arrayToPush) => {
    for (let i = 0; i < array.length; i += 1) {
      const data = await callback(array[i])
/*     const fillingImgUrl =
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/mystery-book-cover-design-template-a5dce61a0c99630dedab42e3a4c15618_screen.jpg?ts=1637014687";

    const imageLinks = data.volumeInfo.imageLinks;
    if (imageLinks) {
      data.volumeInfo.imageLinks =
        imageLinks.extraLarge ||
        imageLinks.large ||
        imageLinks.medium ||
        imageLinks.small ||
        imageLinks.thumbnail ||
        imageLinks.smallThumbnail;
    } else {
      data.volumeInfo.imageLinks = fillingImgUrl;
    } */
      arrayToPush.push(data)
    }  
  };