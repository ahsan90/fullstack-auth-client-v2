"use client";
import { useState } from "react";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { Cross1Icon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

function AdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathName = usePathname();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
    {!isSidebarOpen && (
      
      <button
        onClick={toggleSidebar}
        className="text-white hover:text-white bg-green-600 hover:bg-green-800 p-2 md:hidden z-50 h-full"
      >
        <MdMenu className="text-xl" />
      </button>
    )}
      <aside
        className={`fixed top-13 left-0 h-full w-64 bg-red-800 text-white transform ${
          isSidebarOpen
            ? "translate-x-0 z-50 bg-opacity-90"
            : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <div>
          <div className="flex justify-between items-center px-4 pt-4">
            <h1 className="text-2xl font-bold">Admin Pannel</h1>
            <Cross1Icon className="lg:hidden cursor-pointer" onClick={toggleSidebar} />
          </div>
          <nav className="mt-4">
            <Link
              href="/admin/profile"
              className={`block py-2 p-4 ${
                pathName === "/admin/profile" && "bg-gray-700"
              }`}
            >
              Profile
            </Link>
            <Link
              href="/admin/users"
              className={`block py-2 p-4 ${
                pathName === "/admin/users" && "bg-gray-700"
              }`}
            >
              Users List
            </Link>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-90 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export default AdminSidebar;
