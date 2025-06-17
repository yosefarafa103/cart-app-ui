import { getUserFromToken } from "../functions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetSingleUser(userId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`user-${userId}`],
    queryFn: async () => await getUserFromToken(userId),
  });
  return { data, isLoading, isError, error };
}
