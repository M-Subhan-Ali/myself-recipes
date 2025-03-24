

























// import { Router } from "express";
// import { RecipeUser } from "../models/user.models.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken"

// const route = Router();

// route.post("/register", async ( req , res ) => {
//   try {
    
//     const { username , password } = req.body;
    
//     const existedUser = await RecipeUser.findOne({username})
     
//     if(existedUser){
//      return res.status(400).json({message : "User Already Exists!"})
//     }
  
//     const hashedPassword = await bcrypt.hash( password , 10 )
   
//     const NewUser = await RecipeUser.create({username,
//       password  : hashedPassword
//     })
    
//     await NewUser.save()

//     res.status(201).
//     json({
//        message : "User Registered SuccessFully!",
//        user : NewUser
//     })

//   } catch (error) {
//     res.status(500).json({message : `server Error ${error}`})
//   }
  

// })


// route.post("/login" , async ( req , res ) => {

//   try {
//     const {username , password} = req.body;
   
//     const existedUser = await RecipeUser.findOne({username})
    
//     if( !existedUser ){
//       return res.status(400).json({message : "User Does Not Exist!"})
//     }
  
//     const matchedPassword = await bcrypt.compare(password , existedUser.password)
     
//     if(!matchedPassword){
//       return res.status(401).json({
//         message : " !Invalid Password "
//       })
//     }
  
//     const token = jwt.sign({
//       id : existedUser._id
//     },process.env.SECRET,{
//       expiresIn : process.env.EXPIRESIN
//     })
  
//     return res.status(200).json({
//       message : "User SuccessFully Login",
//       token : token,
//       UserID : existedUser._id
//     })
  
//   } catch (error) {
//    res.status(500).json({
//     message :  `something went wrong while login ${error} `
//    }) 
//   }


// } )

// export {route as recipeUserRouter}