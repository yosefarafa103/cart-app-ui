import React from "react";

export default function UserRole({ role }) {
  return (
    <span
      className={`${
        role === "admin"
          ? "bg-indigo-400"
          : role === "user"
          ? "bg-orange-400"
          : "bg-transparent"
      } px-2 text-white rounded-sm py-0.5 flex mt-2 text-sm`}
    >
      {role}
    </span>
  );
}
