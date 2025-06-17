import { useQuery } from "@tanstack/react-query";
import { getData } from "../functions";

export function useGetAllComments() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getData("comments"),
  });
  return { data, isLoading, isError, error };
}
