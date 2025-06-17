import { useQuery } from "@tanstack/react-query";

export function useFetchItem(keyName, queryFn) {
  const { data, isLoading, error } = useQuery({
    queryKey: [keyName],
    queryFn,
  });
  return { data, isLoading, error };
}
