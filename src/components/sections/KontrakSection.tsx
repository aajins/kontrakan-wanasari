"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { FilterState, Kontrakan } from "@/types";
import KontrakFilterBar from "@/components/kontrakan/KontrakFilterBar";
import KontrakCard from "@/components/kontrakan/KontrakCard";

interface Props {
  initialKontrakans: Kontrakan[];
}

function filterKontrakans(
  kontrakans: Kontrakan[],
  status: string,
  unitType: string
): Kontrakan[] {
  return kontrakans.filter((k) => {
    if (status === "available" && !k.units.some((u) => u.available)) return false;
    if (status === "full" && !k.units.every((u) => !u.available)) return false;
    if (unitType !== "all" && !k.units.some((u) => u.type === unitType)) return false;
    return true;
  });
}

export default function KontrakSection({ initialKontrakans }: Props) {
  const [filter, setFilter] = useState<FilterState>({
    status: "all",
    unitType: "all",
  });

  const filteredKontrakans = filterKontrakans(
    initialKontrakans,
    filter.status,
    filter.unitType
  );

  return (
    <section id="kontrakan" className="py-16 md:py-24 bg-[#FAF7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F6F3FF] border-2 border-black rounded-full mb-5 nb-shadow">
            <Building2 className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-sm font-bold text-[#7C3AED]">Daftar Kontrakan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-4">
            Pilihan{" "}
            <span className="text-[#7C3AED]">Kontrakan Terbaik</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Temukan hunian yang sesuai kebutuhan Anda. Harga transparan, fasilitas jelas, kontak langsung ke pemilik.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <KontrakFilterBar
          filter={filter}
          onChange={setFilter}
          totalCount={filteredKontrakans.length}
        />

        {/* Grid */}
        {filteredKontrakans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {filteredKontrakans.map((k, idx) => (
              <KontrakCard key={k.id} kontrakan={k} index={idx} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-[#F6F3FF] rounded-2xl border-2 border-black nb-shadow"
          >
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="font-black text-xl text-black mb-2">Tidak Ada Kontrakan</h3>
            <p className="text-gray-500">
              Tidak ada kontrakan yang sesuai dengan filter yang dipilih.
            </p>
            <button
              onClick={() => setFilter({ status: "all", unitType: "all" })}
              className="mt-4 px-5 py-2.5 bg-[#7C3AED] text-white font-bold rounded-xl border-2 border-black nb-shadow hover:-translate-y-0.5 transition-all"
            >
              Reset Filter
            </button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 mb-4">Tidak menemukan yang cocok? Hubungi kami untuk pilihan lainnya!</p>
          <a
            href="https://wa.me/6281234567890?text=Halo,%20saya%20mencari%20kontrakan%20di%20Wanasari%20Karawang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl border-2 border-black nb-shadow hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0A0A0A] transition-all duration-150"
          >
            💬 Tanya via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
