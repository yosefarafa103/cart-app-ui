import { useQuery } from "@tanstack/react-query";
import { getBookedItems } from "../functions";
import { useLoggedInUser } from "./useLoggedInUser";
export function useGetBookedProducts() {
  const { data: user } = useLoggedInUser();
  const { data, error, isLoading } = useQuery({
    queryKey: ["booked-products"],
    queryFn: async () => await getBookedItems(user?.data?._id),
  });
  return { data, isLoading, error };
}
