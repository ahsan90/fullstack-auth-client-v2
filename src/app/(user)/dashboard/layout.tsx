import Sidebar from "./_components/Sidebar";

export default function DashbordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="p-6 bg-gray-100 w-full">{children}</main>
    </div>
  );
}
