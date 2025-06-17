import { FaCheck, FaComment, FaEdit, FaGrinSquintTears } from "react-icons/fa";
import img from "../assets/1291777_price_price tag_pricing_product_icon.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import ErrorMessages from "./ErrorMessages";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBookingStatus } from "./services/updateBookingStatus";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
export default function ProductItem({
  productName,
  price,
  _id,
  status,
  commentedBy,
  images
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => await updateBookingStatus(_id, data),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const [isEdited, setIsEdited] = useState(false);
  return (
    <div className="bg-[#f7f7f7] relative p-[10px] flex flex-col justify-between rounded-md">
      <span
        onClick={() => setIsEdited(!isEdited)}
        className="absolute size-[40px] top-3 flex items-center justify-center right-3 cursor-pointer text-[#444] rounded-[50%] bg-[#eee] border-solid border-[#dddd] border-[1px]"
      >
        <FaEdit />
      </span>
      <div>
        <div className="flex flex-col gap-2 justify-between items-center">
          <img src={img} className="w-[40px]  mx-auto" alt="" />
          <h3 className="text-xl font-semibold">{productName}</h3>
        </div>
        <small className="bg-green-400 text-white mt-3 p-[10px] py-1 w-full block text-center font-semibold relative">
          {price}$
          <span className="absolute bottom-0 right-0 cursor-pointer hover:bg-[#ddd] after:content-['comments'] after:-top-[calc(100%+10px)] hover:after:-top-[calc(100%+20px)] max-sm:after:hidden  after:opacity-0 hover:after:opacity-[1] after:duration-[500] after:ease-in after:transition-all  after:right-0 after:rounded-md  after:bg-white  after:size-auto after:p-1.5 after:absolute  bg-gray-100 w-[50px] gap-3 h-full text-black border-solid border-black border-[1px] flex items-center justify-center">
            {" "}
            {commentedBy?.length} <FaComment />
          </span>
        </small>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to={`/product/${_id}`}
          className="text-xs flex-[1.4] text-center p-2 max-sm:block hover:bg-[#ddd]  bg-[#eee] rounded-md mt-2 font-semibold cursor-pointer"
        >
          Show all comment for this product
        </Link>
        <div
          className={`flex-1 p-1 mt-2 text-white rounded-md text-center flex justify-center items-center gap-2 cursor-not-allowed opacity-[0.6] ${status === "pending"
            ? "bg-orange-400"
            : status === "delivered"
              ? "bg-blue-500"
              : status === "shipped"
                ? "bg-green-500"
                : ""
            }`}
        >
          {status}
          {status === "shipped" ? (
            <FaCheck />
          ) : status === "pending" ? (
            <FaGrinSquintTears />
          ) : (
            ""
          )}
        </div>
      </div>
      <AnimatePresence mode="popLayout" key={_id}>
        {isEdited && (
          <motion.form
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit((validData) => {
              console.log(validData);
              mutate(validData, {
                onSuccess: () => {
                  queryClient.invalidateQueries([`booking`]);
                  toast.success("updated booking status. ", validData.status);
                },
                onError: (err) => console.log(err),
              });
            })}
          >
            <select
              className="w-full p-[10px] outline-0 border-solid border-[2px] border-[#ddd] rounded-md my-[5px]"
              {...register("status", {
                required: {
                  value: true,
                  message: "please provide booking status value",
                },
              })}
            >
              <>
                <option value="">please choose value..</option>
                <option value={"pending"}>pending</option>
                <option value={"delivered"}>{"delivered"}</option>
                <option value={"shipped"}>{"shipped"}</option>
              </>
            </select>
            <button
              // disabled={isPending}
              className={`p-1.5 rounded-md  bg-blue-400 w-full block mt-1 text-white ${isPending ? "opacity-[0.5] cursor-not-allowed" : ""
                }`}
            >
              {isPending ? "adding comment .." : "Add Comment"}
            </button>
            <ErrorMessages message={errors?.status?.message} />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
export function Product({ el }) {

  return (
    <Dialog>

      <Card className="p-3 flex flex-col  justify-between">
        <div className="bg-background p-[10px] rounded-md">
          <div className="flex flex-col gap-2 items-center" key={el._id}>
            <Avatar className="!w-full size-[200px] rounded-[0px] p-5 bg-secondary ">
              <AvatarImage className="object-contain mx-auto" src={img} />
              <AvatarFallback>Loading..</AvatarFallback>
            </Avatar>
            <h3 ></h3>
          </div>
          <div className="flex items-center mt-3 justify-between">
            <CardTitle className="sm:text-xl font-semibold">
              {el?.productId
                ?.productName}
            </CardTitle>
            <Badge className="bg-green-200 p-[10px] py-1 font-semibold">
              {el?.price}$
            </Badge>

          </div>
        </div>
        <div className="flex gap-2 items-center">
          <DialogTrigger asChild>
            <Button
              variant={"outline"}
              className="flex-grow mt-auto border-secondary-foreground"
            >
              Buy This Product
            </Button>
          </DialogTrigger>

          <Link
            to={`/product/${el?.productId?._id}`}
            className="flex items-center cursor-pointer  min-w-[60px] px-2 py-1 rounded-md  justify-center bg-secondary gap-2"
          >
            {el?.productId?.comments?.length}
            <MessageCircle />
          </Link>
        </div>
      </Card>
    </Dialog>

  )
}