import React from "react";

const SearchResultsInfo = ({ searchQuery, totalItems }) => {
  if (!searchQuery) return null;

  return (
    <p className={styles.info}>
      Search results for: "{searchQuery}" ({totalItems} found)
    </p>
  );
};

export default SearchResultsInfo;
