import { FaCartPlus } from "react-icons/fa";
import img from "../assets/1291777_price_price tag_pricing_product_icon.png";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, memo, useEffect, useContext } from "react";
import { useLoading } from "../hooks/useLoading";
import { ProductsContext } from "../App";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
// export const ProductsContext = createContext(null)
function BuyPopup({ product, handelCloseModal, isShow }) {
  const { setItems } = useContext(ProductsContext);
  const { delay, setDelay, setIsClicked, isClicked } = useLoading(2);
  const productsInStorage =
    new Set(JSON.parse(localStorage.getItem("productsCart"))) || new Set();
  const queryClient = useQueryClient();
  const handelAddToCart = () => {
    setIsClicked(true);
    productsInStorage.add(product._id);

    localStorage.setItem(
      "productsCart",
      JSON.stringify(Array.from(productsInStorage))
    );
    setTimeout(() => {
      setItems(Array.from(productsInStorage).length);
      handelCloseModal(null);
    }, 2000);
  };
  return (
    <AnimatePresence mode="popLayout">
      {isShow && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handelCloseModal(null)}
            className=" w-full"
          ></motion.div>
          <motion.div
            initial={{ top: "40%" }}
            animate={{ top: "50%" }}
            exit={{ top: "40%" }}
          // className="fixed max-sm:w-[95%] rounded-md w-1/2 z-[1000] isolate  bg-white min-h-[30vh] top-[40%] left-1/2 -translate-y-1/2 -translate-x-1/2"
          >
            <DialogTitle>
              Buy {product?.productName}
            </DialogTitle>
            <div className="flex flex-col gap-3 mt-3">
              <h3 className="font-bold text-lg">
                Did You Sure To Buy This Product
              </h3>
              <div className="text-center font-semibold text-2xl">
                {product?.productName}
              </div>
              <img src={img} className="w-[60px] mx-auto my-4" alt="" />
              <Button
              variant={"green"}
                disabled={(isClicked && delay > 0) === true}
                onClick={handelAddToCart}
                // className="bg-green-400 flex items-center gap-3 justify-center hover:bg-green-500 text-white p-[10px] font-semibold"
              >
                {isClicked && delay > 0
                  ? "Loading..."
                  : `Add To Cart for ${product?.price}$  `}
                <FaCartPlus />{" "}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
export default memo(BuyPopup);
