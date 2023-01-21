const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const bookSchema = new Schema(
  {
    title: {
      type: String
    },
    authors: [{type : String }],
    genre: {
      type: String 
    },
    description:{
      type : String
    }, 
    image :{
        type: String 
    },
    rating : {
        type: Number 
    },
    prices : {
        type: Number 
    } 
  
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

 

module.exports = model("Books", bookSchema);