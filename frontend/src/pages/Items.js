import React, { useState, useMemo, useCallback } from "react";
import { useItems } from "../hooks/useItems";
import SearchForm from "../components/SearchForm";
import VirtualList from "../components/VirtualList";
import StatsCard from "../components/StatsCard";
import BottomSheet from "../components/BottomSheet";

function Items() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useItems(searchQuery);

  const totalItems = useMemo(() => {
    return data?.pages?.[0]?.pagination?.totalItems || 0;
  }, [data]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
    setIsBottomSheetOpen(true);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(false);
    setTimeout(() => {
      setSelectedItem(null);
    }, 300);
  }, []);

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="alert alert-error">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm">Error loading items: {error?.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            <div className="lg:flex-1">
              <SearchForm onSearch={handleSearch} currentQuery={searchQuery} />
            </div>
          </div>
        </div>

        <StatsCard searchQuery={searchQuery} searchResultsCount={totalItems} />

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-3">
            <VirtualList
              items={data}
              hasNextPage={hasNextPage}
              isLoading={isLoading}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              onItemClick={handleItemClick}
              height={600}
            />
          </div>
        </div>
      </div>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        item={selectedItem}
      />
    </div>
  );
}

export default Items;
