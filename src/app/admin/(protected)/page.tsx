"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2, CheckCircle2, XCircle, LayoutGrid,
  Plus, ArrowRight, MapPin, Star, TrendingUp
} from "lucide-react";
import { useAdminData } from "@/contexts/AdminDataContext";

export default function AdminDashboardPage() {
  const { kontrakans, stats, isLoaded } = useAdminData();

  if (!isLoaded) return <DashboardSkeleton />;

  const statCards = [
    {
      label: "Total Kontrakan",
      value: stats.total,
      icon: Building2,
      color: "#7C3AED",
      bg: "#F6F3FF",
    },
    {
      label: "Ada Unit Tersedia",
      value: stats.available,
      icon: CheckCircle2,
      color: "#25D366",
      bg: "#F0FDF4",
    },
    {
      label: "Semua Unit Penuh",
      value: stats.full,
      icon: XCircle,
      color: "#EF4444",
      bg: "#FEF2F2",
    },
    {
      label: "Total Unit",
      value: stats.totalUnits,
      icon: LayoutGrid,
      color: "#9333EA",
      bg: "#F5F0FF",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#7C3AED] border-2 border-black rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ boxShadow: "6px 6px 0px #0A0A0A" }}
      >
        <div>
          <h2 className="font-black text-white text-xl mb-1">Selamat Datang, Admin 👋</h2>
          <p className="text-purple-200 text-sm">
            Kelola kontrakan Wanasari dari satu dashboard yang bersih dan mudah.
          </p>
        </div>
        <Link
          href="/admin/kontrakan/new"
          className="flex items-center gap-2 px-5 py-3 bg-white text-[#7C3AED] font-black text-sm rounded-xl border-2 border-black hover:-translate-y-0.5 transition-all flex-shrink-0"
          style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.2)" }}
        >
          <Plus className="w-4 h-4" />
          Tambah Kontrakan
        </Link>
      </motion.div>

      {/* Stats */}
      <div>
        <h3 className="font-black text-black text-sm uppercase tracking-widest mb-4">
          Ringkasan
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white border-2 border-black rounded-2xl p-5 nb-shadow hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#7C3AED] transition-all"
              >
                <div
                  className="w-11 h-11 rounded-xl border-2 border-black flex items-center justify-center mb-3"
                  style={{ backgroundColor: stat.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="text-3xl font-black text-black mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500 font-semibold leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-black text-sm uppercase tracking-widest">
            Kontrakan Terbaru
          </h3>
          <Link
            href="/admin/kontrakan"
            className="flex items-center gap-1.5 text-sm font-bold text-[#7C3AED] hover:underline"
          >
            Lihat Semua
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {kontrakans.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="bg-white border-2 border-black rounded-2xl nb-shadow overflow-hidden">
            <div className="divide-y-2 divide-black/5">
              {kontrakans.slice(0, 5).map((k, idx) => {
                const hasAvailable = k.units.some((u) => u.available);
                return (
                  <motion.div
                    key={k.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className="flex items-center gap-4 p-4 hover:bg-[#FAF7FF] transition-colors"
                  >
                    <img
                      src={k.images[0]}
                      alt={k.title}
                      className="w-14 h-14 rounded-xl object-cover border-2 border-black flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-black text-sm truncate">{k.title}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{k.location}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        {k.units.map((u) => (
                          <span
                            key={u.id}
                            className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                              u.available
                                ? "bg-green-50 border-green-400 text-green-700"
                                : "bg-red-50 border-red-400 text-red-600"
                            }`}
                          >
                            {u.type}
                          </span>
                        ))}
                        {k.rating && (
                          <span className="flex items-center gap-0.5 text-xs text-amber-600 font-bold">
                            <Star className="w-3 h-3 fill-current" />
                            {k.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {hasAvailable ? (
                        <span className="hidden sm:flex px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-300">
                          Tersedia
                        </span>
                      ) : (
                        <span className="hidden sm:flex px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-300">
                          Penuh
                        </span>
                      )}
                      <Link
                        href={`/admin/kontrakan/${k.id}/edit`}
                        className="px-3 py-2 text-xs font-bold text-[#7C3AED] border-2 border-black rounded-xl hover:bg-[#F6F3FF] transition-all nb-shadow"
                      >
                        Edit
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border-2 border-black rounded-2xl p-12 text-center nb-shadow">
      <div className="w-16 h-16 bg-[#F6F3FF] border-2 border-black rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Building2 className="w-8 h-8 text-[#7C3AED]" />
      </div>
      <h3 className="font-black text-black text-lg mb-2">Belum Ada Kontrakan</h3>
      <p className="text-gray-500 text-sm mb-5">
        Mulai tambahkan kontrakan pertama Anda sekarang.
      </p>
      <Link
        href="/admin/kontrakan/new"
        className="inline-flex items-center gap-2 px-5 py-3 bg-[#7C3AED] text-white font-bold rounded-xl border-2 border-black nb-shadow hover:-translate-y-0.5 transition-all"
      >
        <Plus className="w-4 h-4" />
        Tambah Kontrakan
      </Link>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-8 animate-pulse">
      <div className="h-24 bg-gray-200 rounded-2xl border-2 border-black" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-gray-200 rounded-2xl border-2 border-black" />
        ))}
      </div>
      <div className="h-64 bg-gray-200 rounded-2xl border-2 border-black" />
    </div>
  );
}
