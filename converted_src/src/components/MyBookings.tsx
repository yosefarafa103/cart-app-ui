import { useGetBookedProducts } from "../hooks/useGetBookedProducts";
import ProductItem from "./ProductItem";
export default function MyBookings() {
  const { data, isLoading, error } = useGetBookedProducts();
  if (isLoading) return <h3 className="font-bold mt-4">Loading...</h3>;
  if (error) return <h3 className="font-bold mt-4">No Bookings</h3>;
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
              <ProductItem
                commentedBy={commentedBy}
                price={price}
                productName={productName}
                status={el.status}
                _id={_id}
              />
            </>
          );
        })}
      </div>
    </>
  );
}
