import {Link, useNavigate} from "react-router-dom"
import {useCookies} from "react-cookie";
export const Navbar = () => {
  const [ cookies , setCookies ] = useCookies(["access_token"])
  const navigate = useNavigate();

  const Logout = () => {
    setCookies("access_token" , "");
    localStorage.removeItem("UserID")
    navigate("/auth")

  }

  return(
    <nav className="navbar">
        <Link to="/" >Home</Link>
        <Link to="/saved_recipes" >Saved Recipes</Link>
        <Link to="/create_recipes" >Create Recipes</Link>
        { cookies.access_token ? <button onClick={Logout} > Logout </button> :<Link to="/auth" >Login/Register</Link>}
    </nav>
  )
}