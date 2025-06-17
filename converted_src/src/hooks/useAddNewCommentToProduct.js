import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { localHost } from "../functions";

export function useAddNewCommentToProduct(productId) {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: async (commentData) =>
      await axios.post(
        `${localHost}/comments/product/${productId}`,
        commentData
      ),
  });
  return { mutate, data, isPending, isError, error };
}
