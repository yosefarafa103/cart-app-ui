import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import userImage from "../assets/download.png";
import { localHost } from "../functions";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import { Card, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
export default function OurUsers() {
  const { data, isLoading } = useGetAllUsers();
  return (
    <div>
      <h3 className="mt-[30px] mb-3 font-bold text-2xl flex items-center gap-4">
        Our Users
        {isLoading && [1, 2, 3, 4, 5].map(() => (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </h3>
      <div className="grid mt-[40px] pb-10 max-sm:grid-cols-2  gap-y-[25px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
        {data?.users?.map((el) => (
          <Card className="flex flex-col items-center gap-2 p-3">
            <div className="w-full bg-sky-900/30 h-32 rounded-md" />
            <img
              src={userImage}
              className="size-[80px] -mt-12 object-cover rounded-[50%]"
              alt=""
            />
            <CardTitle className="text-gray-400"> @{el.name} </CardTitle>
            <Badge variant={el?.role === "admin" ? "purple" : "orange"}> {el?.role} </Badge>
            <CardFooter className="flex">
              <CardTitle>
                {el?.email}
              </CardTitle>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
