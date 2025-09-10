import React from "react";

const Pagination = ({ pagination, onPageChange }) => {
  const { currentPage, totalPages, hasPrevPage, hasNextPage, totalItems } =
    pagination;

  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        disabled={i === currentPage}
        className={`${styles.button} ${
          i === currentPage ? styles.currentPage : ""
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className={styles.button}
        >
          Previous
        </button>
        {pages}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className={styles.button}
        >
          Next
        </button>
      </div>
      <div className={styles.info}>
        Page {currentPage} of {totalPages} ({totalItems} total items)
      </div>
    </div>
  );
};

export default Pagination;
