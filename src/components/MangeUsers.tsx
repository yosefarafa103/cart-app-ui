import { useGetAllUsers } from "../hooks/useGetAllUsers";
import userImage from "../assets/download.png";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { localHost } from "../functions";
import toast from "react-hot-toast";

export default function MangeUsers() {
  const { data: users } = useGetAllUsers();
  const regularUsers = users?.users?.filter(
    (u) => u.role !== "admin" && u.isActiveAccount
  );

  return (
    <>
      <h3 className="text-xl mb-3  border-b-solid border-b-[1px] border-b-[#eee] pb-5 pt-3 font-bold ">
        Mange Users ( {regularUsers?.length} )
      </h3>
      <div className="py-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {regularUsers && regularUsers?.map((user) => <UserCard user={user} />)}
      </div>
    </>
  );
}

function UserCard({ user }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id) =>
      await axios.patch(`${localHost}/users/block-user/${id}`),
  });
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(user?._id, {
            onSuccess: () => {
              toast.success(`blocked ${user?._id}!`);
              queryClient.invalidateQueries([{ queryKey: ["users"] }]);
            },
          });
        }}
        className="flex flex-col items-center gap-1"
      >
        <img
          src={userImage}
          className="w-[100px] object-cover rounded-[50%]"
          alt=""
        />
        <h4 className="font-semibold">{user?.email}</h4>
        <h3>{user?.name}</h3>
        <button className="bg-red-500 w-full mt-2 mb-2 cursor-pointer hover:bg-red-500  px-4 py-2 font-semibold rounded-md text-white text-sm">
          Delete This User
        </button>
      </form>
    </>
  );
}
