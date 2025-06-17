import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
import img from "../assets/1291777_price_price tag_pricing_product_icon.png";
import { cartItems } from "./Cart";
import AddItem from "./AddItem";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import MyBookings from "./MyBookings";
import { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import { Outlet, useNavigate } from "react-router-dom";
import Product from "./Product";
import { useGetBookedProducts } from "../hooks/useGetBookedProducts";
import { usegetAllBookings } from "../hooks/usegetAllBookings";
import AdminArea from "./AdminArea";
import { differenceInDays } from "date-fns";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import userImage from "../assets/download.png";
import UserRole from "./UserRole";
export default function AccountPage() {
  const { data: userData } = useLoggedInUser();
  const hasPermessionToChangePassword = differenceInDays(
    new Date(userData?.changedPasswordAt).getTime() + 864e5 * 5,
    new Date().getTime()
  );
  const { data: users } = useGetAllUsers();
  const queryClient = useQueryClient();
  const { data: bookedProducts } = useGetBookedProducts();
  const { data } = useQuery({
    queryKey: ["product-cart"],
    queryFn: cartItems,
  });
  const { data: loggedInUser } = useLoggedInUser();
  const [isConfirmedToChangePassword, setIsConfirmedToChangePassword] =
    useState(false);
  const bookings =
    queryClient.getQueryData(["booked-products"]) || bookedProducts;
  const nvaigate = useNavigate();
  const regularUsers = users?.users?.filter((u) => u.role !== "admin");
  return (
    <div className="flex max-sm:flex-col gap-5 relative">
      <div className="flex-1 px-3 mt-3  sm:min-h-[90vh] pb-[3vw] bg-[#f7f7f7]">
        <div className="w-[250px] pt-2 mt-4 flex flex-col items-center justify-center  mx-auto">
          <img
            src={userImage}
            className="text-[40px] w-[100px] rounded-[50%] object-cover text-[#4444]"
          />
          <UserRole role={userData?.role} />
          <span className="text-sm mt-1 font-semibold">{userData?.name}</span>
        </div>
        <h3 className="border-b-solid mt-5 border-b-[#ddd] border-b-[1px] pb-3">
          Settings
        </h3>
        <section className="mt-3">
          {!userData?.changedPasswordAt || hasPermessionToChangePassword < 0 ? (
            <h4
              onClick={() => {
                if (confirm("Are You Sure To Change Your Password?")) {
                  setIsConfirmedToChangePassword(true);
                  nvaigate("change-password");
                }
              }}
              className="p-2 bg-red-500 text-center cursor-pointer rounded-md font-semibold text-white"
            >
              change your password
            </h4>
          ) : (
            hasPermessionToChangePassword <= 5 && (
              <h3 className="text-white px-4 py-1 rounded-md bg-red-500 text-center">
                {`You Can Change Your Password After ${hasPermessionToChangePassword} Days`}
              </h3>
            )
          )}
        </section>
      </div>
      <section className="flex flex-col flex-[4] gap-5">
        <Outlet />
        <div className="">
        
          <h3 className="text-xl mb-3  border-b-solid border-b-[1px] border-b-[#eee] pb-5 pt-3 font-bold ">
            Products You Buy
          </h3>
          {!bookings?.length ? (
            <h3 className="font-semibold">No Purchase!</h3>
          ) : (
            <MyBookings />
          )}
          <div className="py-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.map((el) => (
              <div className="bg-[#f7f7f7] p-[10px] rounded-md">
                <div className="flex flex-col gap-2 items-center">
                  <img src={img} className="w-[40px]  mx-auto" alt="" />
                  <h3 className="text-xl font-semibold">{el?.productName}</h3>
                </div>
                <small className="bg-green-400 text-white mt-3 p-[10px] py-1 w-full block text-center font-semibold">
                  {el?.price}$
                </small>
              </div>
            ))}
          </div>
          {loggedInUser?.role === "admin" && (
            <>
              <AdminArea />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
