import { useEffect, useState } from "react"
import axios from "axios"
import {GetUserID} from "../Hooks/GetUserID"
export const Saved_Recipes = () => {
  const [recipes , setRecipes ] =useState([])
  const UserID = GetUserID();
 console.log(recipes)
  useEffect(()=>{
    const Fetching_Saved_Recipes = async () => {
      const response = await axios.get(`http://localhost:3002/recipes/recipes_saved/${UserID}`)
      setRecipes(response.data.saved_Recipes)
    }

    Fetching_Saved_Recipes();

    const interval = setInterval( Fetching_Saved_Recipes , 5000)

    return () => clearInterval(interval) 

  },[])

  return(<div className="recipes_home">
    <h1>Recipes</h1>
    <ul>
      {
        recipes.map((recipes)=>{
          return(
            <li key={recipes._id}>
           <div>
            <h2>{recipes.name}</h2>
           </div>
           <div className="instructions">
            <p>{recipes.instructions}</p>
           </div>
           <img src={recipes.image} 
           alt="recipe_image"
            />
           <p>Cooking Time {recipes.cooking_Time} (minutes) </p>
            </li>
          )
        })
      }
    </ul>
  </div>)
}