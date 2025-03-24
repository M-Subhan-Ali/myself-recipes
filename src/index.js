import 'dotenv/config'
import express from "express";

const app = express();

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
