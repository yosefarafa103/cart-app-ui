import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({
        mode: "onSubmit"
    });
    const createNewAccount = async (userData) => {
        try {
            const user = await axios.post(`${localHost}/users`, userData);
            console.log(user);
        } catch (err) {
            console.log(err);
        }
    }
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewAccount,
    })
    const navigate = useNavigate()
    console.log(errors);
    return (
        <>
            <form onSubmit={handleSubmit((data) => {
                console.log(data);
                mutate(data, {
                    onSuccess: (data) => {
                        toast.success("Account Is Created");
                        console.log(data);
                        navigate("/login")
                    }
                })
            }
            )} className="sm:w-1/2 mx-auto mt-[50px] p-[25px] border-solid border-[1px] rounded-md" >
                <div className="flex flex-col gap-1 mt-3">
                    <label className="font-semibold" htmlFor="">Name*</label>
                    <input type="text"  {...register("name", {
                        required: {
                            value: true,
                            message: "Please Enter Your Name"
                        },
                        minLength: {
                            value: 6,
                            message: "name must be 6 or more"
                        },
                        // pattern: { value: /^/, message: "enter your actual name" }
                    })} placeholder="enter your name" className="outline-0 px-[10px] py-2 border-[#ddd] border-solid border-[1px] rounded-md" />
                </div>
                <span className="text-red-600">
                    {errors.name && errors.name.message}
                </span>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold" htmlFor="">Email*</label>
                    <input {...register("email", {
                        required: {
                            value: true,
                            message: "email is required"
                        },
                        pattern: {
                            value: /\w+@\w+.(com|net|io|org)/g,
                            message: "not valid email"
                        }
                    })} type="text" className="px-[10px] py-2 border-solid border-[#ddd] border-[1px] outline-0  rounded-md" placeholder="enter your email" />
                </div>
                <span className="text-red-600">
                    {errors.email && errors.email.message}
                </span>
                <div className="flex flex-col gap-1 mt-3">
                    <label className="font-semibold" htmlFor="">Password*</label>
                    <input type="password"  {...register("password", {
                        required: {
                            value: true,
                            message: "password is required"
                        }
                    })} placeholder="enter your password" className="outline-0 px-[10px] py-2 border-[#ddd] border-solid border-[1px] rounded-md" />
                </div>
                <span className="text-red-600">
                    {errors.password && errors.password.message}
                </span>
                <div className="flex flex-col gap-1 mt-3">
                    <label className="font-semibold" htmlFor="">Confirm Password*</label>
                    <input type="password"  {...register("confirmPassword", {
                        required: {
                            value: true,
                            message: "confirm password is required"
                        },
                        validate: (val) => {
                            return (val !== getValues().password) ? "No Matched Passwords" : null
                            // if (val !== getValues().password && "No Matched Passwords")

                        }
                    })} placeholder="confirm your password" className="outline-0 px-[10px] py-2 border-[#ddd] border-solid border-[1px] rounded-md" />
                </div>
                <span className="text-red-600">
                    {errors.confirm_password && errors.confirm_password.message}
                </span>
                <button disabled={isPending} type="submit" className="block hover:bg-[#444] transition-all duration-300  rounded-md text-[18px] font-semibold  w-full bg-black text-white p-[10px] mt-[10px]">Create Account</button>
                <Link className="border-solid border-black rounded-md uppercase hover:text-white hover:bg-black transition-all font-semibold duration-300  border-[2px] w-full block mt-1 text-sm  p-2 text-center " to={`/login`}>Login</Link>

                {/* <Link className="border-solid border-black rounded-md uppercase hover:text-white hover:bg-black transition-all font-semibold duration-300  border-[2px] w-full block mt-1 text-sm  p-2 text-center " to={`/signin`}>or Create New Account</Link> */}
            </form >
        </>
    )
}
