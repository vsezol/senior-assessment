import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-base-200" data-theme="dark">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Product Catalog</a>
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
