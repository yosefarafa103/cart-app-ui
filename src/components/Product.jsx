import { useMutation, useQueryClient } from "@tanstack/react-query";
import img from "../assets/1291777_price_price tag_pricing_product_icon.png"
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Product({ product }) {
    const { mutate } = useDeleteProduct();
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    return (
        <div className="bg-[#f7f7f7] p-[10px] rounded-md">
            <div className="flex flex-col gap-2 items-center">
                <img src={img} className="w-[40px]  mx-auto" loading="lazy" alt="" />
                <h3 className="text-xl font-semibold">
                    {product?.productName}
                </h3>
            </div>
            <section className="flex items-center flex-wrap gap-1">
                <small className="bg-green-400 text-white mt-3 p-[10px] py-1 w-full block text-center font-semibold">
                    {product?.price}$
                </small>
                <button
                    onClick={() => {
                        mutate(product?._id, {
                            onSuccess: () => {
                                toast.success("deleted product");
                                queryClient.invalidateQueries(["all_products"])
                                // navigate("/")
                            }
                        })
                    }}
                    className="bg-red-500 w-full mt-2 mb-2 cursor-pointer hover:bg-red-500  px-4 py-2 font-semibold rounded-md text-white"
                >
                    Delete This Product
                </button>
            </section>
        </div>
    )
}
export default memo(Product)