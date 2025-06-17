import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getData, isLoggedIn, localHost } from "../functions";
import img from "../assets/1291777_price_price tag_pricing_product_icon.png";
import { Link, useSearchParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import BuyPopup from "./BuyPopup";
import { FaComment } from "react-icons/fa";
import axios from "axios";
import { Card, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const getData = async () => {
    try {
      const res = await axios.get(`${localHost}/products`);
      return res?.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
  });
  return (
    <Dialog>

      <div className="flex items-center justify-between">
        <h3 className="mt-[30px] text-2xl mb-3 font-bold">Our Products</h3>
        <span
          onClick={() => setParams({ sort: "price" })}
          className="bg-[#eee] cursor-pointer hover:bg-[#ddd]  px-4 py-1 font-semibold rounded-md text-sm"
        >
          filter by price
        </span>
      </div>
      {!data?.documents && <h2>Loading ...</h2>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.documents?.map((el, i) => (
          <>
            <Card className="p-3 flex flex-col  justify-between">
              <div className="bg-background p-[10px] rounded-md">
                <div className="flex flex-col gap-2 items-center" key={el._id}>
                  <Avatar className="!w-full size-[200px] rounded-[0px] p-1 bg-secondary ">
                    {/* https://res.cloudinary.com/dj4it3c61/image/upload/djy4dsqespqmepbsnltg?_a=BAMClqWO0 */}
                    <AvatarImage className="object-contain mx-auto" src={el?.images?.length ? `https://res.cloudinary.com/dj4it3c61/image/upload/${el?.images[0]}?_a=BAMClqWO0` : img} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h3 ></h3>
                </div>
                <div className="flex items-center mt-3 justify-between">
                  <CardTitle className="sm:text-xl font-semibold">
                    {el?.productName}
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
                    onClick={() => setSelectedProduct(i)}
                  >
                    Buy This Product
                  </Button>
                </DialogTrigger>

                <Link
                  to={`/product/${el?._id}`}
                  className="flex items-center cursor-pointer  min-w-[60px] px-2 py-1 rounded-md  justify-center bg-secondary gap-2"
                >
                  {el.comments.length}
                  <MessageCircle />
                </Link>
              </div>
            </Card>

          </>
        ))}
        {selectedProduct !== null ? (
          <>

            <DialogContent>

              <BuyPopup
                handelCloseModal={setSelectedProduct}
                isShow={selectedProduct >= 0}
                product={data?.documents[selectedProduct]}
              />
            </DialogContent>
          </>
        ) : null}
      </div >

    </Dialog>
  );
}

export default Products;
