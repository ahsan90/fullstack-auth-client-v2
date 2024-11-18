import AdminSideBar from "./_components/AdminSidebar";
import { FaTimes, FaBars } from "react-icons/fa";

export default function DashbordLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen">
      <AdminSideBar />
      <main className="p-6 bg-gray-100 w-full">{children}</main>
    </div>
  );
}
