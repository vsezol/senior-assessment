import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

const SearchForm = ({ onSearch, currentQuery = "" }) => {
  const [localSearch, setLocalSearch] = useState(currentQuery);
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  useEffect(() => {
    setLocalSearch(currentQuery);
  }, [currentQuery]);

  const handleClear = () => {
    setLocalSearch("");
  };

  return (
    <div className="w-full lg:max-w-none max-w-md">
      <div className="join w-full">
        <input
          type="text"
          placeholder="Search items..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="input input-bordered input-sm join-item flex-1 text-sm"
        />
        {localSearch && (
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-outline btn-sm join-item"
          >
            <span className="text-sm">Clear</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
