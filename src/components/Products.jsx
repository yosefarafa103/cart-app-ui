import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getData, isLoggedIn } from "../functions"
import img from "../assets/1291777_price_price tag_pricing_product_icon.png"
import { Link, useSearchParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import BuyPopup from "./BuyPopup";
import { FaComment } from "react-icons/fa";
import { usegetAllBookings } from "../hooks/usegetAllBookings";

function Products() {
    const queryClient = useQueryClient()

    const { data: bookings, isLoading } = usegetAllBookings()
    const [params, setParams] = useSearchParams({})
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { data } = useQuery({
        queryFn: () => getData(`products${params ? `?sort=price&sortType=1` : `?sort=price&sortType=-1`}`),
        queryKey: ["products"]
    });
    // useEffect(() => {
    //     queryClient.invalidateQueries(["products"])
    // }, [params])
    // console.log(`products?sort=price&sortType=1`,);
    // console.log(data);
    return (
        <
            >
            <div className="flex items-center justify-between">
                <h3 className="mt-[30px] text-2xl mb-3 font-bold">Our Products</h3>
                <span onClick={() => setParams({ sort: "price" })} className="bg-[#eee] cursor-pointer hover:bg-[#ddd]  px-4 py-1 font-semibold rounded-md text-sm">filter by price</span>
            </div>
            {!data?.documents && <h2>Loading ...</h2>}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.documents?.map((el, i) => (
                    <>
                        <div className="bg-[#f7f7f7] p-[10px] rounded-md">
                            <div className="flex flex-col gap-2 items-center" key={el._id}>
                                <img src={img} className="w-[40px]  mx-auto" alt="" />
                                <h3 className="text-xl font-semibold">
                                    {el?.productName}
                                </h3>
                                <button onClick={() => setSelectedProduct(i)} className="mt-2 p-4 py-2 border-solid border-[1px] border-[#ddd] font-semibold rounded-[50px]  bg-white">
                                    Buy This Product
                                </button>
                            </div>
                            <div className="flex items-center mt-3 justify-between">
                                <small className="bg-green-200 p-[10px] py-1 font-semibold">
                                    {el?.price}$
                                </small>
                                <Link to={`/product/${el?._id}`} className="flex items-center cursor-pointer  min-w-[60px] px-2 py-1 rounded-md  justify-center bg-gray-200 gap-2">
                                    {el.comments.length}
                                    <FaComment className="text-[#bbb]" />
                                </Link>
                            </div>
                        </div>
                    </>
                ))}
                {selectedProduct !== null ?
                    <BuyPopup handelCloseModal={setSelectedProduct} isShow={selectedProduct >= 0} product={data?.documents[selectedProduct]} /> : null
                }
            </div>
        </>
    )
}

export default Products