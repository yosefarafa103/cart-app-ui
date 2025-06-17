import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { localHost } from "../functions";

export function useGetSingleProduct(productId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`product-${productId}`],
    queryFn: async () =>
      (await axios.get(`${localHost}/products/${productId}`))?.data,
  });
  return { data, isLoading, isError, error };
}
