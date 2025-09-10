import React, { createContext, useCallback, useContext, useState, useRef } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [stats, setStats] = useState(null);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const currentPageRef = useRef(1);
  const abortControllerRef = useRef(null);

  const fetchItems = useCallback(async (page = 1, query = "", reset = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: "20",
      });

      if (query) {
        params.append("q", query);
      }

      const response = await fetch(`http://localhost:4001/api/items?${params}`, {
        signal: abortControllerRef.current.signal,
      });
      
      const data = await response.json();

      if (reset || page === 1) {
        setItems(data.data || []);
      } else {
        setItems(prev => [...prev, ...(data.data || [])]);
      }

      setHasNextPage(data.pagination?.hasNextPage || false);
      setTotalItems(data.pagination?.totalItems || 0);
      currentPageRef.current = page;
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Failed to fetch items:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:4001/api/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!isLoading && hasNextPage) {
      const nextPage = currentPageRef.current + 1;
      fetchItems(nextPage, searchQuery);
    }
  }, [fetchItems, searchQuery, isLoading, hasNextPage]);

  const searchItems = useCallback((query) => {
    setSearchQuery(query);
    currentPageRef.current = 1;
    fetchItems(1, query, true);
  }, [fetchItems]);

  const toggleItemExpansion = useCallback((itemId) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  return (
    <DataContext.Provider
      value={{
        items,
        hasNextPage,
        isLoading,
        searchQuery,
        totalItems,
        stats,
        expandedItems,
        fetchItems,
        fetchStats,
        loadMore,
        searchItems,
        toggleItemExpansion,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
