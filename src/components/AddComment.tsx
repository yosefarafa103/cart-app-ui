import { useForm } from "react-hook-form";
import ErrorMessages from "./ErrorMessages";
import { useAddNewCommentToProduct } from "../hooks/useAddNewCommentToProduct";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import { queryOptions, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { memo, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
// import { useAddNewCommentToProduct } from "../hooks/useAddNewCommentToProduct";

function AddComment({ productId, commentsList }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onChange" });
  const [rate, setRate] = useState(null);
  const queryClient = useQueryClient();
  const { data: user } = useLoggedInUser();
  const { mutate, data, isError, isPending } =
    useAddNewCommentToProduct(productId);
  const cachedUsersComment = queryClient.getQueryData([
    `product_${productId}_comments`,
  ]);
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log({
            text: data.comment,
            product: productId,
            rating: rate || 4,
            publishedBy: user?._id,
          });
          mutate(
            {
              text: data.comment,
              product: productId,
              rating: 3,
              publishedBy: user?._id,
            },
            {
              onError: (err) => {
                console.log(err);

                toast.error(err?.response?.data?.message);
              },
              onSuccess: (data) => {
                toast.success("Thanks to Commented To This Product!");
                reset();
                if (commentsList.includes(user?._id)) {
                  toast.success("Thanks to Commented To This Product!");
                  queryClient.invalidateQueries({
                    queryKey: [`product_${productId}_comments`],
                  });
                  return;
                }
              },
            }
          );
        })}
        className="flex flex-col mt-3"
      >
        <input
          {...register("comment", {
            required: "Please Enter Valid Text.",
          })}
          className={`bg-gray-100 w-full placeholder:text-xs  border-blue-300 outline-0  rounded-md text-sm  border-[1px] p-2 ${
            errors?.comment ? "border-red-500 border-[2px]" : ""
          }`}
          placeholder="Add Comment.."
          type="text"
        />
        <button
          disabled={isPending}
          className={`p-1.5 rounded-md  bg-blue-400 w-full block mt-1 text-white ${
            isPending ? "opacity-[0.5] cursor-not-allowed" : ""
          }`}
        >
          {isPending ? "adding comment .." : "Add Comment"}
        </button>
        <ErrorMessages message={errors?.comment?.message} />
        {/* <section className="w-fit flex my-4 flex-col">
                    <span>please rate product (1:5)</span>
                    <section className="flex items-center mb-2 gap-1">
                        {[1, 2, 3, 4, 5].map((e, i) => (
                            <div className="flex cursor-pointer">
                                <FaStar onClick={() => setRate(e)} className={` transition-all duration-500 ${rate > 0 && rate >= e ? "text-yellow-400" : ""}`} />
                            </div>
                        ))}
                        <input type="hidden" defaultValue={rate} {...register("rating", {
                            required: {
                                value: true,
                                message: "please rate product"
                            },
                        })} />
                    </section>
                    {!rate &&
                        <ErrorMessages message={errors.rating && errors.rating.message} />}
                </section> */}
      </form>
    </>
  );
}

export default memo(AddComment);
