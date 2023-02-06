const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = async function getSimilarBooks(bookName){
    return response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Recommand similar books.
        \n Brave new world: Animal farm, 1984, Fahrenheit 451
        \n ${bookName}: `, 
        temperature: 1,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      });
}

/* getSimilarBooks("l'idiot")
.then(response => console.log(response.data.choices[0].text))
.catch(err =>console.log("something is wrong with the open ai", err)) */