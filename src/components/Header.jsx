import { jwtDecode } from "jwt-decode"
import { Link, Navigate, useLocation, useNavigate, useRoutes } from "react-router-dom"
import Cookies from "js-cookie"
import { getBookedItems, getUserFromToken, isTokenExperied, productsInCart } from "../functions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
import { memo, useContext, useEffect } from "react";
import { ProductsContext } from "../App";
import { useGetBookedProducts } from "../hooks/useGetBookedProducts";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
function Header() {
    const { items } = useContext(ProductsContext);
    const { pathname } = useLocation();
    const navigation = useNavigate()
    const queryClient = useQueryClient();
    const { data: userData } = useLoggedInUser();
    const { data: bookings } = useGetBookedProducts(userData?.data?.id)
    const handelLogOut = () => {
        Cookies.remove("jwt");
        Cookies.remove('hasAccessToChangePassword')
        queryClient.invalidateQueries({ queryKey: ["loggedInUser"] })
        localStorage.clear()
        setTimeout(() => navigation("/login"), 1000);
    }
    console.log(userData);
    const links = ["my-bookings"];
    if (!pathname.includes('/cart')) links.unshift("cart");
    return (
        <header className="sm:px-[3.5vw] border-b-solid border-b-[1px] relative flex items-center justify-between px-[15px] py-[10px] max-sm:justify-between">
            <Link to={`/`}>
                Cart App
            </Link>
            <section className="flex  gap-3 items-center justify-between max-sm :flex-col max-sm :top-full max-sm: left-1/2 max-sm :-translate-x-1/2 right-0 max-sm :absolute">
                {links.map((item, i) => (
                    <Link key={i * Math.random()} className="uppercase relative bg-gray-200 rounded-lg py-[5px]  p-[15px]" to={`/${item.split(" ").join("-")}`}>{item}
                        {(i === 0 && item === "cart" && items > 0) &&
                            <span className="absolute text-white rounded-[50%] size-[20px] text-sm flex justify-center right-[-5px] -top-[5px] bg-red-500">
                                {items}
                            </span>
                        }
                        {item === "my-bookings" && bookings?.length > 0 &&
                            <span className="absolute text-white rounded-[50%] size-[20px] text-xs flex justify-center right-[-5px] -top-[5px] bg-blue-500">
                                {bookings?.length}
                            </span>
                        }
                    </Link>
                ))}
                <Link to={`/account`} className="flex items-center gap-2">
                    <FaUser />
                    <h4>{queryClient.getQueryData('loggedInUser')?.name || userData?.name}</h4>
                </Link>
                <div onClick={handelLogOut} className="bg-red-400 cursor-pointer hover:bg-red-500  px-4 py-2 font-semibold rounded-md text-white">Logout</div>
            </section>
        </header>
    )
}
export default memo(Header)