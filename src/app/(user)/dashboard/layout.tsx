"use client";
import React, { useState } from "react";
import DashboardSidebar from "./_components/Sidebar";
import { FaTimes, FaBars } from "react-icons/fa";

export default function DashbordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className="flex h-screen">
      <DashboardSidebar isSidebarOpen={isSidebarOpen} />
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center md:hidden">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={toggleSidebar}
            className="text-2xl focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>
        <main className="flex-grow p-6 bg-gray-100">{children}</main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-90 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
