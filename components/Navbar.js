"use client"

import Logout from "./Logout";

export default function Navbar() {
    return (
      <header className="flex items-center justify-between bg-yellow-400 p-4">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded"
          />
          <span>🔔</span>
          <span>👤</span>
          <span><Logout/></span>
        </div>
      </header>
    );
  }
  