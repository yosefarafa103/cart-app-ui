import { FaUser } from "react-icons/fa";
import { useGetAllComments } from "../hooks/useGetAllComments";
import userImage from "../assets/download.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { localHost } from "../functions";
import toast from "react-hot-toast";
export default function CommentMangement() {
  const { data: comments } = useGetAllComments();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      return await axios.patch(`${localHost}/comments/${id}`, {
        isDeleted: true,
      });
    },
  });
  const queryClient = useQueryClient();
  const nonDeletedComments = comments?.documents.filter((el) => !el.isDeleted);

  return (
    <>
      {nonDeletedComments?.length ? (
        <div className="my-3">
          <h3 className="text-[22px] font-bold mb-5">
            Mange All Comments ( {nonDeletedComments?.length} ){" "}
          </h3>
          <div className="py-3 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {nonDeletedComments?.map((comment) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  mutate(comment._id, {
                    onSuccess: () => {
                      toast.success("deleted this comment!");
                      queryClient.invalidateQueries({
                        queryKey: ["comments"],
                      });
                    },
                  });
                }}
                className="flex-1 pb-4 border-solid border-[1px] border-[#ddd] px-5 min-h-[140px] rounded-lg shadow-md"
              >
                <h2 className="flex gap-3 justify-center mt-4 items-center flex-col">
                  <img
                    src={userImage}
                    className="size-[100px] object-cover"
                    alt=""
                  />
                  <div className="font-semibold ">
                    <span className="px-3 rounded-md  bg-[#eeeeeeb0]">
                      @{comment?.publishedBy.name}
                    </span>{" "}
                  </div>
                </h2>
                <p className="mt-4 mb-2 leading-[1] p-2 text-center rounded-md bg-[#eee]">
                  {comment?.text}
                </p>
                <button className="bg-red-500 w-full mt-2 mb-2 cursor-pointer hover:bg-red-500  px-4 py-2 font-semibold rounded-md text-white">
                  {isPending ? "Processing.." : "Delete This Comment"}
                </button>
              </form>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
