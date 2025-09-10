import React from "react";

const ItemSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-sm animate-pulse">
      <div className="card-body p-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
            <div className="flex gap-2 mb-2">
              <div className="h-3 bg-base-300 rounded w-16"></div>
              <div className="h-3 bg-base-300 rounded w-12"></div>
            </div>
            <div className="h-3 bg-base-300 rounded w-full mb-1"></div>
            <div className="h-3 bg-base-300 rounded w-2/3"></div>
          </div>
          <div className="flex flex-col items-end gap-2 ml-3">
            <div className="h-4 bg-base-300 rounded w-12"></div>
            <div className="h-3 bg-base-300 rounded w-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSkeleton;
