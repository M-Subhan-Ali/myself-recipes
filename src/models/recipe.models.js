import mongoose from "mongoose";

const WorkRecipe_Schema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  ingredients : [{
    type:String,
    required:true
  }],
  instructions:{
    type:String,
    required:true
  },
  image : {
    type:String,
    required:true
  },
  cooking_Time:{
    type:Number,
    required:true
  }
})

export const Work_Recipe = mongoose.model( "Work_Recipe" , WorkRecipe_Schema );
























// import mongoose from "mongoose"

// const recipe_Schema = mongoose.Schema({
//   name : {
//     type : String,
//     required : true
//   },
//   instructions:{
//     type:String,
//     required : true
//   },
//   ingredients:[{
//     type:String,
//     required : true
//   }],
//   imageURL:{
//     type:String,
//     required:true
//   },
//   cookingTime:{
//     type:Number,
//     required:true
//   },
//   recipeOwner:{
//     type : mongoose.Schema.Types.ObjectId,
//     ref : "RecipeUser",
//     required : true
//   }
// },{timeStamps : true})

// export const RecipeCreation = mongoose.model("RecipeCreation" , recipe_Schema)