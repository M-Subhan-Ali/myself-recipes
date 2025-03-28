import { useState } from "react";
import { GetUserID } from "../Hooks/GetUserID";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Create_Recipes = () => {

   const UserID = GetUserID();
   const navigate = useNavigate();
  const [ formData , setFormData ] = useState({
    name:"",
    ingredients: [""],
    instructions: "",
    image:"",
    cooking_Time:0,
    OwnerOfRecipe:UserID
  })

  const HandleIngredients = (event , index) => {
    event.preventDefault();
    const { value } = event.target ;
    const Ingredient = formData.ingredients;
    Ingredient[index] = value;
    setFormData({...formData , Ingredient})
  }

  const AddIngredients = () => {
    const Ingredients = [...formData.ingredients , ""]
    setFormData({...formData , ingredients:Ingredients})
  }

  const HandleChange = (event) => {
    const { name , value } = event.target
    setFormData((hehe)=>({...hehe , [name] : value}))
  }

  const Submit = async (event) => {
    event.preventDefault();
try {
  
      const response = await axios.post("http://localhost:3002/recipes/create_recipe",formData)
      navigate("/")
      alert(response.data.message)
} catch (error) {
  console.error(error)
}
    
    
  }

  console.log(formData)
  return (
    <div className="create-recipe">
      <h1>Create-Recipe</h1>
      <form onSubmit={Submit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={HandleChange} value={formData.name} />
        <label htmlFor="ingredients">ingredients</label>
        {formData.ingredients.map((value , index ) => {

          return <input 
          key={index}
          type="text"
          name="ingredients"
          value={value}
          onChange={(event)=>HandleIngredients(event,index)}
          />


        } )
        }

        <button type="button" onClick={AddIngredients} >Add Ingredients</button>
        <label htmlFor="Instructions">Instructions</label>
        <input type="text" name="instructions" onChange={HandleChange} value={formData.instructions}/>
        <label htmlFor="imageURL">Image URL</label>
        <input type="text" name="image" onChange={HandleChange} value={formData.image}/>
        <label htmlFor="cookingTime">Cooking Times (Minutes)</label>
        <input type="number" name="cooking_Time" onChange={HandleChange} value={formData.cooking_Time}/>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
