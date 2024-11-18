//"use client";
import Link from "next/link";
import { auth } from "@/auth";
//import LogoutButton from "@/components/buttons/LogoutButton";
import DropdownElement from "./buttons/DropdownToggle";
//import { useEffect, useState } from "react";

//export const dynamic = "force-dynamic";

export default async function Navbar() {
  //const [session, setSession] = useState(null);
  const session = await auth();
  //const isAuthenticated = session?.accessToken && !isTokenExpired(session?.accessToken);
  //const isAuthenticated = !!session?.accessToken
  //const { data: session } = useSession()

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <Link href="/" className="text-lg font-bold">
          {/* Replace with your logo image */}
          <strong>Auth V5</strong>
          {/* <img src="/logo.png" alt="Logo" className="h-8 w-auto" /> */}
        </Link>

        {/* Nav Links on the right */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>

          {session ? (
            <>
              <DropdownElement session={session} />
            </>
          ) : (
            <>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
