import { Router } from "express";
import { Work_User } from "../models/user.models.js";
import { Work_Recipe } from "../models/recipe.models.js";

const route = Router();

route.post( "/create_recipe" , async ( req , res ) => {
  try {
      
    const recipe = new Work_Recipe(req.body);
    
    await recipe.save();
 
    return res.status(201).json({message:"Recipe Created SuccessFully ✅",
      recipe
    })
  
  } catch (error) {
    return res.status(500).json({error:`internal server Error ${error}`})
  }
} )


route.get("/", async ( req , res ) => {
  try {

    const recipes = await Work_Recipe.find();
  
    return res.json(recipes);
  
  } catch (error) {
    return res.status(500).json({error:`internal server Error ${error}`})
  }
})


route.put("/update_save_recipes/:UserID" , async ( req , res ) => {
  try {
    const recipe = await Work_Recipe.findById(req.body.recipeID);
    const user = await Work_User.findById(req.params.UserID);
    
    if( user.saved_Recipes.includes(recipe._id) ){
      return res.status(400).json({message:"already saved "})
    }

    user.saved_Recipes.push(recipe._id)
    await user.save()
  
    return res
    .status(201)
    .json({
      saved_Recipes : user.saved_Recipes
    })
  
  } catch (error) {
   
    return res
    .status(500)
    .json({
      error :  `Interval server error ${error}`
    })
  
  }

})


route.get("/User_saved_Recipes/:UserID" , async ( req , res ) => {

try {
  const user = await Work_User.findById(req.params.UserID);
  return res.
  status(201).
  json({
    saved_Recipes : user?.saved_Recipes
  })
  
} catch (error) {
  return res
  .status(500)
  .json({
    error :  `Interval server error ${error}`
  })
}
})


route.get("/recipes_saved/:UserID" , async ( req , res ) => {
  try {
    const user = await Work_User.findById(req.params.UserID);
  
    const saved_Recipes = await Work_Recipe.find({
      _id : { $in : user.saved_Recipes}
    })
  
    return res.status(200).json({
      saved_Recipes
    })
  } catch (error) {

  return res
  .status(500)
  .json({
    error :  `Interval server error ${error}`
  })

  }

})

export {route as RecipeCreation}

























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