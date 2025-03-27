import 'dotenv/config'
import express from "express";
import mongoose from "mongoose"
import cors from "cors"
import { userRouter } from './routes/user.routes.js';
import { RecipeCreation } from './routes/recipe.routes.js';


const app = express();
app.use(express.json());
app.use(cors())

app.use("/auth" , userRouter)
app.use("/recipes" , RecipeCreation )

mongoose.connect("mongodb+srv://recipebackend:mernrecipe4321@recipe-app.johwy.mongodb.net/recipe-app?retryWrites=true&w=majority&appName=recipe-app")
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
app.listen( process.env.PORT , () => {
  console.log(`server is running on Port ${process.env.PORT}`)
})




























// import express from "express";
// import mongoose from "mongoose"
// import 'dotenv/config'
// import {recipeUserRouter} from "./routes/user.routes.js"
// import {recipeCreation} from "./routes/recipe.routes.js"

// const app = express();

// app.use(express.json())

// app.use("/auth",recipeUserRouter)

// app.use( "/recipes" , recipeCreation)

// mongoose.connect(`${process.env.MONGO_DB_URI}`)

// app.listen(process.env.PORT,()=>{
//   console.log("Server is running on port "+process.env.PORT);
// })
