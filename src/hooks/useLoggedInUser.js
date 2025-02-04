import { useQuery } from "@tanstack/react-query";
import { getUserFromToken, localHost, loggedInUser } from "../functions";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
export function useLoggedInUser() {
  const { data, error, isLoading } = useQuery({
    queryFn: async () =>
      await axios.get(`${localHost}/users/${await loggedInUser()}`),
    queryKey: ["loggedInUser"],
  });
  return { data: data?.data, isLoading, error };
}
