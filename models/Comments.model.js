const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentsSchema = new Schema(
  {
    bookId:{type : Schema.Types.ObjectId,ref:'Books' },
    userId:{type : Schema.Types.ObjectId,ref:'User' }, 
    comment:{
      type : String
    }, 
    rating : {
        type : Number,
        max:5,
        min:0,
      }
  
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);
 

module.exports = model("Comments", commentsSchema);
