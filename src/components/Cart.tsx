import React, { useContext, useEffect, useState } from "react";
import {
  createBooking,
  getItemById,
  productsInCart,
  setLocalStorage,
} from "../functions";
import { useFetchItem } from "../hooks/useFetch";
import Header from "./Header";
import { ProductsContext } from "../App";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export const cartItems = async () =>
  await Promise.all(
    productsInCart?.map(async (el) => await getItemById("products", el))
  );
export default function Cart() {
  const queryClient = useQueryClient();
  const { items, setItems } = useContext(ProductsContext);
  const { data, isLoading, error } = useFetchItem(["product-cart"], cartItems);
  const [cartsItems, setCartsItems] = useState(() => data?.documents);
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["product-cart"] });
    console.log(items);
    // location.reload();
  }, [items, data?.length]);
  const {
    data: bookingData,
    mutate,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createBooking,
  });
  console.log(data);
  const handelBookingProduct = (data) => {
    mutate(data, {
      onError: (err) => console.log(err),
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["booked-products"]);
        toast.success("booked this product: ", data.productName);
      },
    });
  };
  return (
    <>
      {/* <Header /> */}
      {data?.length ? (
        <div className="p-[20px] mt-5 border-solid border-[1px] border-[#ddd]">
          {data?.map((item) => (
            <div
              className="flex items-center justify-between border-b-solid border-b-[2px] border-b-[#eee] font-semibold"
              key={item._id}
            >
              {item.productName}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handelBookingProduct({
                      productId: item._id,
                      price: item.price,
                    });
                    // console.log(item);
                    setLocalStorage(item._id);
                    setCartsItems(productsInCart?.length);
                  }}
                  className="bg-green-400 rounded-md px-5 py-1 text-white"
                >
                  buy
                </button>
                <button
                  onClick={() => {
                    console.log(item);
                    setLocalStorage(item._id);
                    console.log(cartsItems);
                    setCartsItems(productsInCart?.length);
                    console.log(productsInCart.indexOf(item._id));
                    setItems(items - 1);
                  }}
                  className="px-[15px] rounded-md py-1 bg-red-600 my-2 text-white text-sm"
                >
                  Delete This Product
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-[22px] font-semibold text-red-500 mt-4">
          No Thing In Cart!
        </h2>
      )}
    </>
  );
}
