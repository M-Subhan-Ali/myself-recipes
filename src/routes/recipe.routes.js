


























// import { Router } from "express";
// import {RecipeCreation} from "../models/recipe.models.js"
// import { RecipeUser } from "../models/user.models.js";
// const route = Router();

// route.post("/create-recipe" , async ( req , res ) => {
//   try {
   
//     const recipe = new RecipeCreation(req.body)

//     await recipe.save();

//     res.status(200).json({
//       message:"recipe created Successfully!",
//       recipe
//     })
//   } catch (error) {
//     res.status(500).json({message : `server error for creating recipe ${error}`})
//   }
// })


// route.get("/", async(req,res) => {
//   try {
    
//     const recipes = await RecipeCreation.find();
  
//     res.status(201).json({
//       message : "recipes fetched successfully",
//       recipes
//     })
  
//   } catch (error) {
//    res.status(500).json({
//     message : `Server Error While Fetching Data ${error}`
//    })  
//   }

// })


// route.put("/update-recipes" , async( req , res ) => {
//   try {
//     const {recipeID , UserID} = req.body;

//     const recipe = await RecipeCreation.findById(recipeID);
//     if(!recipe){
//      return res.status(400).json({message:"Recipe not found!"})
//     }

//     const user = await RecipeUser.findById(UserID);
//     if(!recipe){
//      return res.status(404).json({message:"User not found!"})
//     }
  
//     await user.saved_recipes.push(recipe)
//     await user.save()
    
//     return res.status(200).json({
//       message:"Recipe Successfully Saved!",
//       savedRecipe : user.saved_recipes
//     })
    
//   } catch (error) {
//     res.
//     status(500).
//     json({message : `server Error while saving recipes ${error}`})
//   }
// })


// route.get("/saved-recipes/:UserID", async( req , res) => {
//   try {
//     const user = await RecipeUser.findById(req.params.UserID);
//     if(!user){
//       return res.status(404).json({message:"User not Found!"})
//     }
  
//     return res.status(200).json({
//       message:"Fetched Saved Recipe Successfully!",
//       savedRecipe : user.saved_recipes
//     })
  
//   } catch (error) {
//     res.
//     status(500).
//     json({message : `server Error while fetching saved recipes ${error}`})
//   }
  
// })


// route.get("/savedRecipes/:UserID",async ( req , res ) => {
//  try {
  
//    const user = await RecipeUser.findById(req.params.UserID)
   
//    const save_recipes = await RecipeCreation.find({
//      _id : { $in : user.saved_recipes } 
//    })
 
//    return res.status(200).json({
//      message : "SuccessFully Fetched All Saved Recipes",
//      save_recipes
//    })
//  } catch (error) {
//   res.
//   status(500).
//   json({message : `server Error while fetching saved recipes ${error}`})
//  }

// })

// export {route as recipeCreation}