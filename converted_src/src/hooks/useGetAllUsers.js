import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { localHost } from "../functions";

export function useGetAllUsers() {
  const { data: data, isLoading } = useQuery({
    queryFn: async () =>
      await axios.get(`${localHost}/users`).then((data) => data.data),
    queryKey: ["users"],
  });
  return { data, isLoading };
}
