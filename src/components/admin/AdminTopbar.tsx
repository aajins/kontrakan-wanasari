"use client";

import { usePathname } from "next/navigation";
import { Building2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const pathLabels: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/kontrakan": "Daftar Kontrakan",
  "/admin/kontrakan/new": "Tambah Kontrakan",
};

function getPageTitle(pathname: string): string {
  if (pathLabels[pathname]) return pathLabels[pathname];
  if (pathname.endsWith("/edit")) return "Edit Kontrakan";
  return "Dashboard";
}

export default function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      toast.success("Logout berhasil");
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast.error("Gagal logout");
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-[#FAF7FF] border-b-2 border-black flex items-center justify-between px-6 py-4">
      {/* Left: padding for mobile menu button + title */}
      <div className="pl-10 md:pl-0">
        <h1 className="font-black text-black text-lg">{getPageTitle(pathname)}</h1>
        <p className="text-gray-400 text-xs font-medium mt-0.5 hidden sm:block">
          Kontrakan Wanasari · Admin Panel
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Admin badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F6F3FF] border-2 border-black rounded-xl nb-shadow">
          <div className="w-6 h-6 bg-[#7C3AED] rounded-lg flex items-center justify-center">
            <Building2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-black text-xs text-black">Admin</span>
        </div>

        {/* Logout button (visible on md+) */}
        <button
          onClick={handleLogout}
          className="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl border-2 border-transparent hover:border-red-200 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
