import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useItemById } from "../hooks/useItemById";

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item, isLoading, isError, error } = useItemById(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <svg
            className="w-6 h-6"
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
          <span>Error loading item: {error?.message}</span>
        </div>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
          Go Back
        </button>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-warning">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <span>Item not found</span>
        </div>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="btn btn-ghost">
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Items
        </button>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h1 className="card-title text-3xl font-bold mb-4">
                {item.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <span className="badge badge-secondary">{item.category}</span>
                <span
                  className={`badge ${
                    item.inStock ? "badge-success" : "badge-error"
                  }`}
                >
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <p className="text-base-content/80 text-lg leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-primary">
                  ${item.price}
                </span>
                <button
                  className={`btn btn-lg ${
                    item.inStock ? "btn-primary" : "btn-disabled"
                  }`}
                  disabled={!item.inStock}
                >
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>

            <div className="divider lg:divider-horizontal"></div>

            <div className="lg:w-80">
              <div className="stats stats-vertical shadow">
                <div className="stat">
                  <div className="stat-title">Item ID</div>
                  <div className="stat-value text-lg">{item.id}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Category</div>
                  <div className="stat-value text-lg">{item.category}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Status</div>
                  <div
                    className={`stat-value text-lg ${
                      item.inStock ? "text-success" : "text-error"
                    }`}
                  >
                    {item.inStock ? "Available" : "Unavailable"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
