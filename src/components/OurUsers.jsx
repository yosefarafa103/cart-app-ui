import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import userImage from "../assets/download.png";
import { localHost } from "../functions";
export default function OurUsers() {
  const { data: data, isLoading } = useQuery({
    queryFn: async () =>
      await axios.get(`${localHost}/users`).then((data) => data.data),
    queryKey: ["users"],
  });
  return (
    <div>
      <h3 className="mt-[30px] mb-3 font-bold text-2xl">
        {isLoading ? "" : `Our Users ( ${data?.users?.length} )`}{" "}
      </h3>
      <div className="grid mt-[40px] pb-10 max-sm:grid-cols-2  gap-y-[25px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
        {data?.users?.map((el) => (
          <div className="flex flex-col items-center gap-2">
            <img
              src={userImage}
              className="w-[100px] object-cover rounded-[50%]"
              alt=""
            />
            <h4>{el?.email}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
