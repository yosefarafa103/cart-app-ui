import { useGetBookedProducts } from "../hooks/useGetBookedProducts";
// import Product from "./Product";
import ProductItem, { Product } from "./ProductItem";
import img from "../assets/1291777_price_price tag_pricing_product_icon.png";

import ProductPage from "./ProductPage";
export default function MyBookings() {
  const { data, isLoading, error } = useGetBookedProducts();
  if (isLoading) return <h3 className="font-bold mt-4">Loading...</h3>;
  if (error) return <h3 className="font-bold mt-4">No Bookings</h3>;
  console.log(data);
  
  return (
    <>
      <h3 className="font-bold mt-4">My Bookings: ( {data?.length} )</h3>
      <div className="py-3 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.map((el) => {
          const {
            productId: { productName, price, commentedBy, _id },
          } = el;
          return (
            <>
              <Product el={el} />
              {/* <ProductItem
                images={el?.images}
                commentedBy={commentedBy}
                price={price}
                productName={productName}
                status={el.status}
                _id={_id}
              /> */}
            </>
          );
        })}
      </div>
    </>
  );
}
