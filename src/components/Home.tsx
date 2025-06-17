import { Navigate } from "react-router-dom";
import { getData, isLoggedIn, isTokenExperied, productsInCart } from "../functions";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Products from "./Products";
import Header from "./Header";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import OurUsers from "./OurUsers";

function Home() {
  return (
    <>
      <Products />
      <OurUsers />
    </>
  )
}

export default Home