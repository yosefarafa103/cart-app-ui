import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetSingleProduct(productId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`product-${productId}`],
    queryFn: async () =>
      (await axios.get(`http://localhost:5001/products/${productId}`))?.data,
  });
  return { data, isLoading, isError, error };
}
