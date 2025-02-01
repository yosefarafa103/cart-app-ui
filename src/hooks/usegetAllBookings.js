import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../components/services/getAllBookings";
import axios from "axios";
import { getData } from "../functions";
export function usegetAllBookings() {
  const { data, isLoading, error, status } = useQuery({
    queryFn: async () => {
      try {
        const booking = await axios.get("http://localhost:5001/booking");
        return booking?.data;
      } catch (err) {
        throw Error(err)
        console.log(err);
      }
    },
    // ("booking"),
    queryKey: ["bookings"],
  });
  return {
    data,
    isLoading,
    error,
    status,
  };
}
