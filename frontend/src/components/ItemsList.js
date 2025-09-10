import React from "react";
import { Link } from "react-router-dom";

const ItemsList = ({ items, loading, searchQuery }) => {
  if (loading && !items.length) {
    return <p className={styles.message}>Loading...</p>;
  }

  if (!loading && items.length === 0) {
    return (
      <p className={styles.message}>
        No items found{searchQuery ? ` for "${searchQuery}"` : ""}.
      </p>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <Link to={"/items/" + item.id} className={styles.link}>
            {item.name} - {item.category} (${item.price})
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;
