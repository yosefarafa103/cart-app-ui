import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { loggedInUser, login } from "../functions";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";

function Login() {
  if (Cookies.get("jwt")) return <Navigate to={`/`} />;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});
  const { mutate, status, error, isPending } = useMutation({
    mutationFn: login,
    // mutationKey: ["loggedInUser"]
  });
  const [tryToLoginTimes, setTryToLoginTimes] = useState(0);
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  if (tryToLoginTimes === 3) {
    Cookies.set("blocked", "true", {
      expires: new Date(new Date().getTime() + 15 * 60 * 1000),
    });
  }
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          // mutate: ,
          mutate(data, {
            onError: (err) => {
              console.log(err);
              setTryToLoginTimes((prev) => (prev += 1));
              toast.error(err.response.data);
            },
            onSuccess: async (data) => {
              Cookies.set("jwt", data?.data?.token, { expires: 3 });
              toast.success("Logged In Successful");
              queryClient.setQueryData(["loggedInUser"], await loggedInUser());
              queryClient.invalidateQueries(["loggedInUser"]);
              reset();
              setTimeout(() => navigation("/"), 1000);
            },
          });
        })}
        className="sm:w-1/2 mx-auto mt-[50px] p-[25px] border-solid border-[1px] rounded-md"
      >
        {Cookies.get("blocked") && (
          <div className="bg-red-400 p-3 mb-3 uppercase rounded-lg text-center text-white font-bold text-sm">
            you can logged in soon!
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="">
            Email*
          </label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "email is required",
              },
            })}
            type="email"
            className="px-[10px] py-2 border-solid border-[#ddd] border-[1px] outline-0  rounded-md"
            placeholder="enter your email"
          />
        </div>
        <span className="text-red-600">
          {errors.email && errors.email.message}
        </span>
        <div className="flex flex-col gap-1 mt-3">
          <label className="font-semibold" htmlFor="">
            Password*
          </label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "password is required",
              },
            })}
            placeholder="enter your password"
            className="outline-0 px-[10px] py-2 border-[#ddd] border-solid border-[1px] rounded-md"
          />
        </div>
        <span className="text-red-600">
          {errors.password && errors.password.message}
        </span>
        <Button
        variant={"outline"}
          disabled={isPending || !!Cookies.get("blocked")}
          type="submit"
          className={`block ${Cookies.get("blocked") || isPending
            ? "opacity-[0.5]"
            : "hover:bg-[#444]"
            }  transition-all duration-300  rounded-md text-[18px] font-semibold  w-full bg-black text-white p-[10px] mt-[10px]`}
        >
          Login
        </Button>
        <Link
          className="border-solid border-black rounded-md uppercase hover:text-white hover:bg-black transition-all font-semibold duration-300  border-[2px] w-full block mt-1 text-sm  p-2 text-center "
          to={`/signin`}
        >
          or Create New Account
        </Link>
      </form>
    </>
  );
}

export default Login;
