import React from "react";
import { useStats } from "../hooks/useStats";

const StatsCard = ({ searchQuery, searchResultsCount }) => {
  const { data: stats, isLoading, isError, error } = useStats();

  if (isError) {
    return (
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
        <span className="text-sm">Failed to load stats: {error?.message}</span>
      </div>
    );
  }

  if (isLoading || !stats) {
    return (
      <div className="stats shadow animate-pulse">
        <div className="stat">
          <div className="stat-title text-xs">Total Items</div>
          <div className="stat-value bg-base-300 rounded w-16 h-6"></div>
        </div>
        {!searchQuery && (
          <div className="stat">
            <div className="stat-title text-xs">Average Price</div>
            <div className="stat-value bg-base-300 rounded w-20 h-6"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title text-xs">
          {searchQuery ? "Search Results" : "Total Items"}
        </div>
        <div className="stat-value text-primary text-2xl">
          {searchQuery ? searchResultsCount : stats.total}
        </div>
      </div>

      {!searchQuery && (
        <div className="stat">
          <div className="stat-title text-xs">Average Price</div>
          <div className="stat-value text-secondary text-2xl">
            ${Math.round(stats.averagePrice)}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
