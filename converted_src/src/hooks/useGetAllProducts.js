import { useQuery } from "@tanstack/react-query";
import { getData } from "../functions";
export function usegetAllProducts() {
  const { data, isLoading } = useQuery({
    queryFn: async () => getData("products"),
    // ("booking"),
    queryKey: ["all_products"],
  });
  return {
    data,
    isLoading,
  };
}
