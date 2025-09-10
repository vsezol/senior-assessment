import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchItems } from "../api/itemsApi";

export const useItems = (searchQuery = "") => {
  return useInfiniteQuery({
    queryKey: ["items", searchQuery],
    queryFn: fetchItems,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
