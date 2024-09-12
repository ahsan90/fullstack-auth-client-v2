"use client";
import React, { useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

function DropdownButton({ session }: any) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Close dropdown if clicked outside
  
  return (
    <div className="relative">
      {/* Avatar button with first character of username */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white text-lg font-bold focus:outline-none"
      >
        {session?.user?.name?.charAt(0).toUpperCase()}
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
          {session?.user?.role === "ADMIN" ? (
            <>
              <Link
                href="/admin/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                {session?.user?.name}
              </Link>
              <Link
                href="/admin/users"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                Admin Pannel
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/admin/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {session?.user?.name}
              </Link>
              <Link
                href="/dashboard/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                Dashboard
              </Link>
            </>
          )}
          <div className="border-t my-1"></div>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
