import { useQuery } from "@tanstack/react-query";
import { fetchItemById } from "../api/itemsApi";

export const useItemById = (id) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItemById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
