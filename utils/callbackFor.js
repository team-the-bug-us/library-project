const axios = require("axios");

module.exports = async (bookId) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}`
    );
    return data;
  } catch (error) {
    console.log("the issue with async:", error);
  }
};
