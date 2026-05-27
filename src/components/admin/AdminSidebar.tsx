"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, LayoutDashboard, List, Plus, LogOut,
  Menu, X, ArrowLeft, ChevronRight
} from "lucide-react";
import { toast } from "sonner";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/kontrakan",
    label: "Daftar Kontrakan",
    icon: List,
    exact: false,
  },
  {
    href: "/admin/kontrakan/new",
    label: "Tambah Kontrakan",
    icon: Plus,
    exact: true,
  },
];

function NavLink({
  item,
  onClick,
}: {
  item: (typeof navItems)[0];
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = item.exact
    ? pathname === item.href
    : pathname.startsWith(item.href) && item.href !== "/admin";

  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
        isActive
          ? "bg-[#7C3AED] text-white"
          : "text-gray-400 hover:text-white hover:bg-white/10"
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1">{item.label}</span>
      {isActive && <ChevronRight className="w-4 h-4 opacity-60" />}
    </Link>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b-2 border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#7C3AED] rounded-xl flex items-center justify-center border-2 border-white/20 flex-shrink-0">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-black text-white text-sm leading-tight">Kontrakan Wanasari</div>
              <div className="text-gray-500 text-xs">Admin Panel</div>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-gray-600 text-xs font-black uppercase tracking-widest px-4 mb-3">
          Menu
        </p>
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} onClick={onClose} />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t-2 border-white/10 space-y-1">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Ke Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 bg-[#0A0A0A] border-r-2 border-[#7C3AED] flex-col z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 w-10 h-10 bg-[#0A0A0A] border-2 border-[#7C3AED] rounded-xl flex items-center justify-center text-white nb-shadow"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed inset-y-0 left-0 w-72 bg-[#0A0A0A] border-r-2 border-[#7C3AED] z-50"
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
