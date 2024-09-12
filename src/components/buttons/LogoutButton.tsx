"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { logout } from "@/actions/authActions";

function LogoutButton() {
  //const router = useRouter();
  const handleLogout = async () => {
    // Handle logout logic
    console.log("Logout button clicked");
    await logout();
    //try {
    ///const res = await logout();
    // if (res?.error) {
    //   toast.error(res.error);
    // }
    // if(!res?.error) {
    //   //router.push("/login");
    //   window.location.href = "/login";
    // }
    // } catch (error: any) {
    //   console.error(error.message);
    // }
  };
  return (
    <>
      <form action={handleLogout}>
        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <button>Logout</button>
        </div>
      </form>
    </>
  );
}

export default LogoutButton;
