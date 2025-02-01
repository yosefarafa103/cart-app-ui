import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useLoggedInUser } from "./useLoggedInUser";

export function useAddNewCommentToProduct(productId) {
  const { data: user } = useLoggedInUser();
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: async (commentData) =>
      await axios.post(
        `http://localhost:5001/comments/product/${productId}`,
        commentData
      ),
  });
  return { mutate, data, isPending, isError, error };
}
