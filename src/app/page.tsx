import { auth } from "@/auth";
import Link from "next/link";
export default async function Home() {
  const session = await auth();
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-30 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl">
              Full Stack Authentication System with NODE.js (Express.js for
              backend API), NEXT.js 14 (Frontend) and Auth V5.
              <strong className="font-extrabold text-red-700 sm:block">
                {" "}
                Includes Advance Features (Admin Panel/Role Based Access
                Control/Advanced User CRUD and many more...!){" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed"></p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {session ? (
                <>
                  {session?.user?.role === "ADMIN" && (
                    <Link
                      className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                      href="/admin/users"
                    >
                      Admin Pannel
                    </Link>
                  )}
                  {session?.user?.role === "USER" && (

                  <Link
                    className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                    href="/dashboard/profile"
                  >
                    Dashboard
                  </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                    href="/register"
                  >
                    Register
                  </Link>

                  <Link
                    className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
                    href="/login"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
