import { Navigate } from "react-router-dom";
import { getData, isLoggedIn, isTokenExperied, productsInCart } from "../functions";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Products from "./Products";
import Header from "./Header";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import OurUsers from "./OurUsers";

function Home() {

  // if (!Cookies.get("jwt")) return <Navigate to={'/login'} />
  // const decoded = jwtDecode(Cookies.get("jwt"))
  // const isTokenExperied = decoded.exp < Math.floor(Date.now() / 1000)

  return (
    <>
      <Products />
      <OurUsers />
    </>
  )
}

export default Home