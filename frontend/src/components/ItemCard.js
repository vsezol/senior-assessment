import React from "react";

const ItemCard = ({ item, style, onItemClick }) => {
  const handleClick = () => {
    onItemClick(item);
  };

  return (
    <div style={style} className="p-1.5">
      <div
        className="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.01]"
        onClick={handleClick}
      >
        <div className="card-body p-3">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-base-content mb-1.5 truncate">
                {item.name}
              </h3>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="badge badge-secondary badge-xs text-xs">
                  {item.category}
                </span>
                <span
                  className={`badge badge-xs text-xs ${
                    item.inStock ? "badge-success" : "badge-error"
                  }`}
                >
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <p className="text-base-content/60 text-xs line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5 ml-3 flex-shrink-0">
              <span className="text-base font-bold text-primary">
                ${item.price}
              </span>
              <div className="text-base-content/40">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
