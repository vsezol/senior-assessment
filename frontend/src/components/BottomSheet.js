import React, { useEffect } from "react";

const BottomSheet = ({ isOpen, onClose, item }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Mobile: Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-base-100 rounded-t-3xl shadow-2xl z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "80vh" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 p-4 pb-2">
            <div className="w-12 h-1.5 bg-base-300 rounded-full mx-auto mb-4"></div>

            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-base-content mb-2">
                  {item.name}
                </h2>
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-secondary badge-sm">
                    {item.category}
                  </span>
                  <span
                    className={`badge badge-sm ${
                      item.inStock ? "badge-success" : "badge-error"
                    }`}
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4">
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2 text-base-content">
                Description
              </h3>
              <p className="text-base-content/80 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-20">
              <div className="bg-base-200 rounded-lg p-3">
                <div className="text-xs text-base-content/60 mb-1">Price</div>
                <div className="text-lg font-bold text-primary">
                  ${item.price}
                </div>
              </div>

              <div className="bg-base-200 rounded-lg p-3">
                <div className="text-xs text-base-content/60 mb-1">Item ID</div>
                <div className="text-sm font-semibold text-base-content">
                  #{item.id}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 p-4 pt-2 bg-base-100 border-t border-base-200">
            <div className="flex gap-2">
              <button
                className={`btn btn-sm flex-1 ${
                  item.inStock ? "btn-primary" : "btn-disabled"
                }`}
                disabled={!item.inStock}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9"
                  />
                </svg>
                {item.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <button className="btn btn-outline btn-sm">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 hidden lg:flex transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
          <div className="flex flex-col h-full max-h-[90vh]">
            <div className="flex-shrink-0 p-6 pb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-base-content mb-3">
                    {item.name}
                  </h2>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge badge-secondary">
                      {item.category}
                    </span>
                    <span
                      className={`badge ${
                        item.inStock ? "badge-success" : "badge-error"
                      }`}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="btn btn-ghost btn-sm btn-circle"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              <div className="mb-5">
                <h3 className="text-lg font-semibold mb-3 text-base-content">
                  Description
                </h3>
                <p className="text-base-content/80 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-20">
                <div className="bg-base-200 rounded-xl p-4">
                  <div className="text-sm text-base-content/60 mb-2">Price</div>
                  <div className="text-3xl font-bold text-primary">
                    ${item.price}
                  </div>
                </div>

                <div className="bg-base-200 rounded-xl p-4">
                  <div className="text-sm text-base-content/60 mb-2">
                    Item ID
                  </div>
                  <div className="text-xl font-semibold text-base-content">
                    #{item.id}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 p-6 pt-4 bg-base-100 border-t border-base-200">
              <div className="flex gap-4">
                <button
                  className={`btn flex-1 ${
                    item.inStock ? "btn-primary" : "btn-disabled"
                  }`}
                  disabled={!item.inStock}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9"
                    />
                  </svg>
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </button>

                <button className="btn btn-outline">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
