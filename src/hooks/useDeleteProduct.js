import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../components/services/deleteProduct";

export function useDeleteProduct() {
  const { mutate, data, isPending } = useMutation({
    mutationFn: deleteProduct,
  });
  return { mutate, data, isPending };
}
