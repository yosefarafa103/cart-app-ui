import { useActionState, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ErrorMessages from "./ErrorMessages";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
export default function AddItem({ adminName }) {
    const addProductSchema = z.object({
        name: z.string().min(3, "product must be at least 3 characters"),
        price: z.string().min(1).max(10000, "price must > 0 and < 10.000").refine(data => data.length > 0, { message: "price field is required please fill it!." }),
    })
    const handelAddNewProduct = async (data) => {
        try {
            await axios.post('http://localhost:5001/products', data)
        } catch (err) {
            console.log(err);
        }
    }
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: handelAddNewProduct
    })
    const { register, reset, handleSubmit, getValues, formState: { errors } } = useForm({
        resolver: zodResolver(addProductSchema)
    })
    return (
        <form encType="multipart/form-data" onSubmit={handleSubmit(data => {
            const { name, price } = data;
            const formData = new FormData();
            const images = Array.from(getValues().images)
            formData.append("productName", name)
            formData.append("price", price)
            formData.append("images", images.map(e => e.name))
            // console.log(formData.get("productName"));
            // console.log(formData.get("price"));
            images.map(img => formData.append("images", img.name))
            const d = { productName: formData.get("productName"), price: formData.get("price"), images: formData.getAll("images") }
            mutate(d, {
                onSuccess: (d) => {
                    console.log(d);
                    toast.success('product added');
                    queryClient.invalidateQueries(["all_products"])
                },
                onError: (err) => {
                    toast.error('product added');
                }
            })
            reset()
        })}>
            <h3 className="max-sm:text-lg text-[3vw] font-bold">Hey admin 👋  <span className="text-white bg-green-400 px-2 rounded-md ">
                {adminName} </span>Add New Product</h3>
            <div>
                <label htmlFor="" className="mb-2 block font-semibold">Product Name <span className="text-red-600 text-xl">*</span></label>
                <input {...register("name")} type="text" className={`w-full p-[10px] ${errors?.name && "border-red-500"} outline-0 border-[1px] rounded-lg border-solid border-[#bbb]`} placeholder="Product Name" />
            </div>
            <ErrorMessages
                message={
                    errors?.name && errors.name.message
                }
            />
            <div>
                <label htmlFor="" className="mb-2 block font-semibold">Product Price <span className="text-red-600 text-xl">*</span></label>
                <input {...register("price")} type="number" className={`w-full p-[10px] border-[1px] rounded-lg border-solid outline-0 border-[#bbb] ${errors?.price && "border-red-500"}`} placeholder="Product Price" />
            </div>
            <ErrorMessages
                message={
                    errors?.price && errors.price.message
                }
            />
            {/* {hasImages === false &&
                <ErrorMessages message={"please provide file"} />
            } */}
            <input multiple={true} type="file" {...register("images", {
                required: {
                    value: true,
                    message: "Image Must Be Defined"
                }
            })} id="" />
            {errors?.images &&
                <ErrorMessages message={"please provide file"} />
            }
            <button disabled={isPending} className="rounded-md mb-3 px-8 font-semibold text-sm  py-2 bg-black text-white w-fit ml-auto block mt-4"> {isPending ? "loading.." : "Add New Product"} </button>
        </form >
    )
}
