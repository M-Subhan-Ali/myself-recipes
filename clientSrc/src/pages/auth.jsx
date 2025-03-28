import { useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useCookies} from "react-cookie"


export const Auth = () => {
  return(<div  className="form-field">
    <Login/>
    <Register/>
  </div>)
}


const Login = () => {

  const [ formdata , setFormData ] = useState({
    email:"",
    username : "",
    password : "",
  })

  const [_ , setCookies ] = useCookies(["access_token"])

  const navigate = useNavigate();

  const Handler = (e) => {
     const {name , value} = e.target;
     setFormData({...formdata, [ name ] : value })

  }

  const Submit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3002/auth/login',formdata)
      alert(response.data.message)
      // console.log(response.data.token)
      localStorage.setItem("UserID" , response.data.UserID)
      setCookies("access_token",response.data.token)
      navigate("/")
      

  
    } catch (error) {
      alert(error.response.data.error)
    }
  }


  return(
   <form onSubmit={Submit} >
    <h1>Login</h1>
    <div className="form">
    <label htmlFor="Email">Email</label>
    <input 
    type="email" 
    placeholder="email"
    value={formdata.email}
    name="email"
    onChange={Handler}
    />
    </div>
    <div className="form">
    <label htmlFor="username">Username</label>
    <input 
    type="text" 
    placeholder="username"
    name="username"
    value={formdata.username}
    onChange={Handler}
    />
    </div>
    <div className="form">
    <label htmlFor="password">Password</label>
    <input 
    type="password" 
    placeholder="password"
    name="password"
    value={formdata.password}
    onChange={Handler}
    />
    </div>
    <button type="submit" >submit</button>
    </form>
  )
}


const Register = () => {

  const [ username , setUsername ] = useState("");
  const [ password , setPassword ] = useState("");
  const [ email , setEmail ] = useState("");

  const Submit = async (event) => {

    event.preventDefault();

    try {

    const response = await axios.post(`http://localhost:3002/auth/register`,{email,username,password})
      
      alert(response.data.message)
    } catch (error) {
      console.error(error)
      alert(error.response.data.error)
    }
  }
  
  return(
  <Form 
  username={username}
  setUsername={setUsername}
  password={password}
  setPassword={setPassword}
  email={email}
  setEmail={setEmail}
  Submit={Submit}
  label="Register"
  />
)
}

const Form = ({username,setUsername,password,setPassword,email,setEmail,Submit,label}) => {
  return( <form onSubmit={Submit}>
    <h1>{label}</h1>
    <div className="form">
    <label htmlFor="Email">Email</label>
    <input 
    type="email" 
    placeholder="email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    />
    </div>
    <div className="form">
    <label htmlFor="username">Username</label>
    <input 
    type="text" 
    placeholder="username"
    value={username}
    onChange={(e)=>setUsername(e.target.value)}
    />
    </div>
    <div className="form">
    <label htmlFor="password">Password</label>
    <input 
    type="password" 
    placeholder="password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    />
    </div>
    <button type="submit" >submit</button>
    </form>)
}