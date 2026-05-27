"use client";

import { use } from "react";
import { useAdminData } from "@/contexts/AdminDataContext";
import KontrakForm from "@/components/admin/KontrakForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditKontrakPage({ params }: Props) {
  const { id } = use(params);
  const { getKontrakById, isLoaded } = useAdminData();

  if (!isLoaded) {
    return (
      <div className="p-6">
        <div className="max-w-3xl mx-auto animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded-xl w-48" />
          <div className="h-96 bg-gray-200 rounded-2xl border-2 border-black" />
        </div>
      </div>
    );
  }

  const kontrakan = getKontrakById(id);
  if (!kontrakan) notFound();

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href="/admin/kontrakan"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#7C3AED] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar
          </Link>
          <h2 className="font-black text-black text-xl mb-1">Edit Kontrakan</h2>
          <p className="text-gray-500 text-sm">
            Perbarui informasi untuk{" "}
            <span className="font-bold text-black">{kontrakan.title}</span>
          </p>
        </div>
        <KontrakForm mode="edit" defaultData={kontrakan} />
      </div>
    </div>
  );
}
