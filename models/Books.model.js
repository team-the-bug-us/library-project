const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const bookSchema = new Schema(
  {
    title: {
      type: String
    },
    authors: [{type : String }],
    categorie: [{
      type: String 
    }],
    description:{
      type : String
    }, 
    image :{
        type: String 
    },
    averageRating : {
        type: Number 
    },
    price : {
        type: Number 
    } 
  
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

 

module.exports = model("Books", bookSchema);