const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

module.exports = async function getSimilarBooks(bookName){
    return response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Recommand similar books.\n\n
        Harry potter: Lord of the rings,the Hobbit, Nania 
        \nthe Eternal husband: Family happiness, the idiot 
        \nDaddy long legs: Little women, Pride and prejudice  
        \n Brave new world: Animal farm, 1984 
        \n ${bookName}: `,
        temperature: 1,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      });
}

