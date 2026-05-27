import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { AdminDataProvider } from "@/contexts/AdminDataContext";

const AUTH_COOKIE = "kw-admin-auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE);

  if (!authCookie?.value) {
    redirect("/admin/login");
  }

  return (
    <AdminDataProvider>
      <div className="flex min-h-screen bg-[#FAF7FF]">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-h-screen md:ml-64">
          <AdminTopbar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          style: {
            border: "2px solid #0A0A0A",
            borderRadius: "12px",
            fontWeight: "bold",
          },
        }}
      />
    </AdminDataProvider>
  );
}
