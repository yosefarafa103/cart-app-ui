import { useForm } from "react-hook-form";
import ErrorMessages from "./ErrorMessages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie"
import { differenceInDays } from "date-fns"
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import { localHost } from "../functions";
export default function ChangePasswordForm() {
    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({});
    const { data, mutate, isError, isPending } = useMutation({
        mutationFn: async (newData) => axios.patch(`${localHost}/users/update-user-password`, newData)
    });
    // 
    // 
    const hasAccess = Cookies.get("hasAccessToChangePassword");
    const queryClient = useQueryClient()
    const { data: user } = useLoggedInUser()
    const userCachedData = queryClient.getQueryData(["loggedInUser"]) || user?.data?.email;
    // console.log((new Date(user?.data?.changedPasswordAt))
    // );
    const hasPermessionToChangePassword = differenceInDays(new Date(), (user?.data?.changedPasswordAt));
    if (hasAccess || hasPermessionToChangePassword < 5) {
        return <div className="min-h-[50vh] flex items-center text-[22px] cursor-not-allowed opacity-[0.5] font-semibold bg-red-200 justify-center">Can Not Change Password To Day</div>
    }
    return (
        <form className="mt-5" onSubmit={handleSubmit(userData => {
            console.log({ email: userCachedData?.data?.email, password: userData.password, newPassword: userData.newPassword });
            mutate({ email: userCachedData?.data?.email, password: userData.password, newPassword: userData.newPassword }, {
                onError: (err) => toast.error(err.response.data.err),
                onSuccess: (data) => {
                    toast.success("updated your password successfull");
                    console.log(data.data.token);
                    Cookies.set("hasAccessToChangePassword", false, { expires: 5 })
                    Cookies.set("jwt", data.data.token, { expires: 3 })
                    queryClient.invalidateQueries(["loggedInUser"])
                }
            })
        }
        )}>
            <div className="flex flex-col gap-1">
                <label className="font-semibold" htmlFor="">Password*</label>
                <input {...register("password", {
                    required: {
                        value: true,
                        message: "Please Enter Your Password"
                    },
                })} type="password" className={`px-[10px] py-2 border-solid border-[#ddd] border-[1px] outline-0  rounded-md ${errors.password ? "border-red-500" : ""}`} placeholder="Enter Password" />
            </div>
            <ErrorMessages message={
                errors.password && errors.password.message
            } />
            <div className="flex flex-col gap-1 mt-3">
                <label className="font-semibold" htmlFor="">New Password*</label>
                <input {...register("newPassword", {
                    required: {
                        value: true,
                        message: "Please Confirm Your Password"
                    },
                })} type="password" className={`px-[10px] py-2 border-solid border-[#ddd] border-[1px] outline-0  rounded-md ${errors.newPassword ? "border-red-500" : ""}`} placeholder="Enter New Password" />
            </div>
            <ErrorMessages message={
                errors.newPassword && errors.newPassword.message
            } />
            <div className="flex flex-col gap-1 mt-3">
                <label className="font-semibold" htmlFor="">Confirm New Password*</label>
                <input {...register("confirmNewPassword", {
                    required: {
                        value: true,
                        message: "Please Confirm Your New Password"
                    },
                    validate: (val) => val === getValues().newPassword || "Enter New Password Correct!"
                })} type="password" className={`px-[10px] py-2 border-solid border-[#ddd] border-[1px] outline-0  rounded-md ${errors.confirmNewPassword ? "border-red-500" : ""}`} placeholder="Enter Your Confirm New Password" />
            </div>
            <ErrorMessages message={
                errors.confirmNewPassword && errors.confirmNewPassword.message
            } />
            <button disabled={isPending} type="submit" className="hover:bg-[#444] justify-center transition-all duration-300 flex items-center gap-2 rounded-md text-[18px] font-semibold  w-full bg-black text-white p-[10px] mt-[10px]">{isPending ? "Updating.." : "Change Password"}</button>
        </form>
    )
}
