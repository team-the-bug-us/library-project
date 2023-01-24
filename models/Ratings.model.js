const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const ratingSchema = new Schema(
  {
    bookId:[{type : Schema.Types.ObjectId,ref:'Books' }],
    userId:[{type : Schema.Types.ObjectId,ref:'User' }], 
    comment:{
      type : String
    }, 
    rating : {
        type : String
      }
  
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);
 

module.exports = model("Ratings", ratingSchema);
