import React, { useCallback, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import ItemCard from "./ItemCard";
import ItemSkeleton from "./ItemSkeleton";

const VirtualList = ({
  items,
  hasNextPage,
  isLoading,
  fetchNextPage,
  isFetchingNextPage,
  onItemClick,
  height = 600,
}) => {
  const allItems = useMemo(() => {
    return items?.pages?.flatMap((page) => page.data) || [];
  }, [items]);

  const itemCount = hasNextPage ? allItems.length + 5 : allItems.length;

  const Row = useCallback(
    ({ index, style }) => {
      const isItemLoaded = !!allItems[index];

      if (!isItemLoaded) {
        return (
          <div style={style} className="p-1.5">
            <ItemSkeleton />
          </div>
        );
      }

      return (
        <ItemCard
          item={allItems[index]}
          style={style}
          onItemClick={onItemClick}
        />
      );
    },
    [allItems, onItemClick]
  );

  const handleItemsRendered = useCallback(
    ({ visibleStopIndex }) => {
      if (
        visibleStopIndex >= allItems.length - 5 &&
        hasNextPage &&
        !isLoading &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    },
    [allItems.length, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]
  );

  if (isLoading && allItems.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <List
        height={height}
        itemCount={itemCount}
        itemSize={120}
        onItemsRendered={handleItemsRendered}
        className="scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100"
      >
        {Row}
      </List>
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <span className="loading loading-dots loading-md text-primary"></span>
        </div>
      )}
    </div>
  );
};

export default VirtualList;
