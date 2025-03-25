import mongoose from "mongoose";

const user_Schema = mongoose.Schema({
  username : {
    type : String,
    required : true,
    trim : true,
    sparse : true,
  },
  email:{
    type : String,
    required : true,
    sparse : true,
  },
  password:{
    type:String,
    required:true
  },
  saved_Recipes:{
    type : mongoose.Schema.Types.ObjectID,
    ref : "Word_Recipe"
  }
},{timeStamps : true})


export const Work_User = mongoose.model("Work_User" , user_Schema);





















// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username : {
//     type : String , 
//     required : true,
//   },
//   password : {
//     type : String , 
//     required : true,
//   },
//   saved_recipes:[{
//     type:mongoose.Schema.Types.ObjectID,
//     ref:"RecipeCreation"
//   }]

//   },
// {timestamps : true});

// export const RecipeUser = mongoose.model( "RecipeUser" , userSchema);