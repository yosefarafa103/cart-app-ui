import userImage from "../assets/download.png";
import { useGetSingleUser } from "../hooks/useGetSingleUser";

export default function UserComment({ user, comment, isDeleted, role }) {
  const { data } = useGetSingleUser(user);
  return (
    <>
      <div className="flex my-2 mb-5 items-center gap-2">
        <img src={userImage} className="size-[35px] object-cover" alt="" />
        <div className="flex flex-col">
          <div className="text-xs font-semibold gap-1 flex items-center">
            @{data?.name}{" "}
            <span
              className={`${
                role === "admin" ? "bg-indigo-400" : "bg-orange-400"
              } px-2 text-white rounded-sm py-0.5 flex`}
            >
              {role}
            </span>{" "}
          </div>
          <div
            className={`text-sm mt-[-1px] ${
              isDeleted && "bg-red-700 !mt-1 px-2 py-0.5 text-white rounded-md"
            }`}
          >
            {isDeleted
              ? "an admin deleted Comment Because violating rules!"
              : comment}
          </div>
        </div>
      </div>
    </>
  );
}
