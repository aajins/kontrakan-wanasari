import Link from "next/link";
import { Building2, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7FF] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* 404 Big */}
        <div className="relative mb-8">
          <div className="text-9xl font-black text-[#F6F3FF] select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-[#7C3AED] border-2 border-black rounded-2xl flex items-center justify-center nb-shadow-xl" style={{ boxShadow: "8px 8px 0px #0A0A0A" }}>
              <Building2 className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        <h1 className="font-black text-3xl text-black mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-500 mb-8">
          Kontrakan atau halaman yang Anda cari tidak ada. Mungkin sudah dipindah atau URL-nya salah.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#7C3AED] text-white font-bold rounded-xl border-2 border-black nb-shadow hover:-translate-y-0.5 transition-all"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/#kontrakan"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl border-2 border-black nb-shadow hover:-translate-y-0.5 transition-all"
          >
            <Search className="w-4 h-4" />
            Cari Kontrakan
          </Link>
        </div>
      </div>
    </div>
  );
}
