import {Router} from "express";
import { Work_User } from "../models/user.models.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const route = Router();


route.post("/register" , async( req , res )=>{
   //get data from request
   //check if username or email is provided
   //check if user already existed or not
   //password encoded
   //new user
   //save user in db
   //send response to the frontend subhan ueueue

  try {
    const { email , username , password } = req.body;
  
    const regix = /^[a-zA-Z0-9+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(email.trim() === ""){
      return res.status(400).json({error: "Email should not be empty"});
    }
    if(username.trim() === ""){
      return res.status(400).json({error: "Username are required"});
    }
    
    if (!password || password.trim() === "") {
      return res.status(400).json({ error: "Password is required" });
    }

    const existingUser = await Work_User.findOne({
      $or : [{email} , {username}]
    })
     
    if(existingUser){
      return res.status(400).json({error: "User already exists"});
    }

    if(!regix.test(email)){
      return res.status(400).json({error: "Email  are required in proper format"});
    }
  
    const hashedPassword = await bcrypt.hash( password , 11 );
    
    const user = new Work_User({ 
      email : email,
      username : username,
      password : hashedPassword })
  
    await user.save() 
  
    const newUser = await Work_User.findById(user._id).select("-password")
    
    return res.status(200).
    json({message : "User Successfully Created",registered_User : newUser})
  
   
  } catch (error) {

    return res.status(500).json(
      {error: "Internal Server Error", message: error.message }
    
    )
  }

})

route.post("/login" , async( req , res ) => {
  //req data getting
  //check user exits or not
  //get user
  //comapre password
  //generate token
  //send data to frontend 

try {
  
    const {username , email , password } = req.body;

    if( !username || !email || !password ){
      return res.status(400).json({error: "Please fill all fields"});
    }
    
    const existingUser = await Work_User.findOne({email})
    
      if( !existingUser ){
        return res.status(400).json({error: "User does not exist"})
      } 

     if( existingUser.username !== username ){
      return res.status(400).json({error: "Invalid username!"})
     }
    
    const MactchedPassword = await bcrypt.compare( password , existingUser.password );
  
    if( !MactchedPassword ){
      return res.status(400).json({error: "Invalid Password"})
    }
  
    const token= jwt.sign({
      _id : existingUser._id ,
    },"a1232a",{
      expiresIn : "2hr"
    })
  
    const user = await Work_User.findById(existingUser._id).select("-password");
  
    return res.status(200).json({
      message : "User Successfully Login",
      token,
      UserID : user._id
    })
  
} catch (error) {

  return res.status(500).
  json({
    Error:`server Error ${error}`
    ,message:`server Error ${error.message}
    `})

}





})

export const verifyJWT = ( req , res ,next ) => {
  const token = req.headers.authorization;

  if(token){
    jwt.verify(token , "a1232a" , (err)=>{
      if(err){
        return res.status(403)
      }
    })
    next()
  }else{
    return res.status(401).json({message : "No Token Provided!"})
  }
}


export {route as userRouter}


















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