import React from "react";
import Link from "next/link";

function DashboardSidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
        isSidebarOpen ? "translate-x-0 z-50 bg-opacity-90" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <nav className="mt-4">
          <Link
            href="/dashboard/profile"
            className="block py-2 px-4 hover:bg-gray-700"
          >
            Profile
          </Link>
        </nav>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
