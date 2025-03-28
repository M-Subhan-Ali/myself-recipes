import { useEffect, useState } from "react";
import axios from "axios";
import { GetUserID } from "../Hooks/GetUserID";
import {useCookies} from "react-cookie"
export const Home = () => {
  
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  
  const [cookies , setCookies] = useCookies(["access_token"])

  const UserID = GetUserID();
  
  useEffect(() => {
    const Getting_Recipes = async () => {
      const response = await axios.get("http://localhost:3002/recipes");

      setRecipes(response.data);

      // await fetch("http://localhost:3002/recipes")   //by fetch method sending a bet request heheh
      // .then((response)=>response.json())
      // .then((data)=>setRecipes(data) )
    };

    const recipeSavedID = async () => {
      const response = await axios.get(`http://localhost:3002/recipes/User_saved_Recipes/${UserID}`)
      setSavedRecipes(response.data.saved_Recipes)
    }
    

    Getting_Recipes();
    recipeSavedID();

    const interval = setInterval(Getting_Recipes, 5000); //for real time fetching by subhan

    return () => clearInterval(interval);
  }, []);


  const saved_Recipes = async (recipeID) => {
    const response = await axios.put(`http://localhost:3002/recipes/update_save_recipes/${UserID}`,{recipeID},
      { headers : { authorization : cookies.access_token } }
    )
    setSavedRecipes(response.data.saved_Recipes)
  }

   console.log(savedRecipes)

  return (
    <div className="recipes_home">
      <h1 style={{ textAlign: "center" }}>Recipes</h1>
      <ul>
        {recipes.map((value) => {
          return (
            <li key={value._id}>
              <div>
                <h2>{value.name}</h2>
              </div>
              <div>
                {value.ingredients.map((x, i) => {
                  return (
                    <span key={i} style={{ paddingRight: "20px" }}>
                      {x}
                    </span>
                  );
                })}
              </div>
              <button 
              onClick={()=>saved_Recipes(value._id)} 
              disabled={savedRecipes.includes(value._id)}
              >Save</button>
              <div className="instructions">
                <p>{value.instructions}</p>
              </div>
              <img src={value.image} alt="recipe_image" />
              <p>Cooking Time {value.cooking_Time} (minutes) </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
