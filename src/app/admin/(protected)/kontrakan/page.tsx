"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus, Edit2, Trash2, Eye, CheckCircle2, XCircle,
  MapPin, Building2, Search, SlidersHorizontal
} from "lucide-react";
import { toast } from "sonner";
import { useAdminData } from "@/contexts/AdminDataContext";
import { Kontrakan } from "@/types";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

export default function AdminKontrakListPage() {
  const { kontrakans, deleteKontrakan, toggleUnitAvailability, isLoaded } = useAdminData();
  const [deleteTarget, setDeleteTarget] = useState<Kontrakan | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "full">("all");

  const filtered = kontrakans.filter((k) => {
    const matchSearch =
      k.title.toLowerCase().includes(search.toLowerCase()) ||
      k.location.toLowerCase().includes(search.toLowerCase()) ||
      k.ownerName.toLowerCase().includes(search.toLowerCase());

    const hasAvailable = k.units.some((u) => u.available);
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "available" && hasAvailable) ||
      (statusFilter === "full" && !hasAvailable);

    return matchSearch && matchStatus;
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteKontrakan(deleteTarget.id);
      toast.success(`"${deleteTarget.title}" berhasil dihapus`);
      setDeleteTarget(null);
    } catch {
      toast.error("Gagal menghapus kontrakan. Silakan coba lagi.");
    }
  };

  if (!isLoaded) return <ListSkeleton />;

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-black text-black text-lg">Semua Kontrakan</h2>
            <p className="text-gray-500 text-sm mt-0.5">
              {kontrakans.length} kontrakan terdaftar
            </p>
          </div>
          <Link
            href="/admin/kontrakan/new"
            className="flex items-center gap-2 px-5 py-3 bg-[#7C3AED] text-white font-black text-sm rounded-xl border-2 border-black nb-shadow hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            Tambah Kontrakan
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, lokasi, atau pemilik..."
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black rounded-xl font-semibold text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#7C3AED] transition-all nb-shadow"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-white border-2 border-black rounded-xl p-1.5 nb-shadow">
            {[
              { value: "all", label: "Semua" },
              { value: "available", label: "Tersedia" },
              { value: "full", label: "Penuh" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value as typeof statusFilter)}
                className={`px-3.5 py-2 rounded-lg text-xs font-black transition-all ${
                  statusFilter === opt.value
                    ? "bg-[#7C3AED] text-white"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="bg-white border-2 border-black rounded-2xl p-12 text-center nb-shadow">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-black text-black text-base mb-1">
              {search || statusFilter !== "all"
                ? "Tidak Ada Hasil"
                : "Belum Ada Kontrakan"}
            </h3>
            <p className="text-gray-400 text-sm">
              {search || statusFilter !== "all"
                ? "Coba ubah filter pencarian Anda"
                : "Mulai tambahkan kontrakan pertama Anda."}
            </p>
          </div>
        )}

        {/* List */}
        <div className="space-y-4">
          {filtered.map((k, idx) => {
            const hasAvailable = k.units.some((u) => u.available);
            const minPrice = Math.min(...k.units.map((u) => u.price));

            return (
              <motion.div
                key={k.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border-2 border-black rounded-2xl overflow-hidden nb-shadow hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#7C3AED] transition-all"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative sm:w-36 h-36 sm:h-auto flex-shrink-0">
                    <img
                      src={k.images[0]}
                      alt={k.title}
                      className="w-full h-full object-cover"
                    />
                    {k.featured && (
                      <span className="absolute top-2 left-2 px-2 py-1 bg-[#7C3AED] text-white text-xs font-black rounded-full border border-white/30">
                        ✨
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-black text-black text-base leading-tight mb-1">
                          {k.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{k.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Actions */}
                        <Link
                          href={`/kontrakan/${k.id}`}
                          target="_blank"
                          className="w-9 h-9 flex items-center justify-center bg-[#F6F3FF] border-2 border-black rounded-xl text-gray-500 hover:text-[#7C3AED] nb-shadow hover:-translate-y-0.5 transition-all"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/kontrakan/${k.id}/edit`}
                          className="w-9 h-9 flex items-center justify-center bg-[#7C3AED] border-2 border-black rounded-xl text-white nb-shadow hover:-translate-y-0.5 transition-all"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(k)}
                          className="w-9 h-9 flex items-center justify-center bg-red-50 border-2 border-red-400 rounded-xl text-red-500 hover:bg-red-500 hover:text-white nb-shadow hover:-translate-y-0.5 transition-all"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-[#7C3AED] font-black text-base mb-3">
                      Mulai {formatPrice(minPrice)}
                      <span className="text-gray-400 font-medium text-sm">/bln</span>
                    </div>

                    {/* Units */}
                    <div className="flex flex-wrap gap-2">
                      {k.units.map((unit) => (
                        <button
                          key={unit.id}
                          onClick={async () => {
                            try {
                              await toggleUnitAvailability(k.id, unit.id);
                              toast.success(
                                `Status ${unit.type} diubah menjadi ${
                                  unit.available ? "Penuh" : "Tersedia"
                                }`
                              );
                            } catch {
                              toast.error("Gagal mengubah status unit");
                            }
                          }}
                          title="Klik untuk ubah status"
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all hover:-translate-y-0.5 ${
                            unit.available
                              ? "bg-green-50 border-[#25D366] text-green-700 hover:bg-green-100"
                              : "bg-red-50 border-red-400 text-red-600 hover:bg-red-100"
                          }`}
                        >
                          {unit.available ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5" />
                          )}
                          {unit.type} · {formatPrice(unit.price)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Hapus Kontrakan?"
        description={`"${deleteTarget?.title}" akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

function ListSkeleton() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-40 bg-gray-200 rounded-2xl border-2 border-black" />
      ))}
    </div>
  );
}
