import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "../api/itemsApi";

export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
