"use client";

import { motion } from "framer-motion";
import { Train, ShoppingBag, Factory, Clock, Map } from "lucide-react";

const locations = [
  {
    id: 1,
    icon: Train,
    title: "Stasiun Whoosh Karawang",
    description: "Stasiun Kereta Cepat Jakarta-Bandung yang menghubungkan Karawang dengan ibu kota dalam waktu singkat.",
    distance: "± 3 km",
    time: "± 10 menit",
    color: "#7C3AED",
    bgColor: "#F6F3FF",
    tag: "Transportasi Cepat",
  },
  {
    id: 2,
    icon: ShoppingBag,
    title: "Grand Outlet Karawang",
    description: "Pusat belanja dan hiburan modern terbesar di Karawang, lengkap dengan berbagai brand ternama.",
    distance: "± 5 km",
    time: "± 15 menit",
    color: "#9333EA",
    bgColor: "#F5F0FF",
    tag: "Pusat Perbelanjaan",
  },
  {
    id: 3,
    icon: Factory,
    title: "Kawasan Industri Karawang",
    description: "Dekat dengan KIM, KIIC, dan GIIC – kawasan industri terbesar di Karawang tempat ribuan perusahaan beroperasi.",
    distance: "± 2 km",
    time: "± 7 menit",
    color: "#0A0A0A",
    bgColor: "#F0F0F0",
    tag: "Kawasan Industri",
  },
];

export default function LocationCarousel() {
  return (
    <section className="py-16 md:py-24 bg-[#F6F3FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-full mb-5 nb-shadow">
            <Map className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-sm font-bold text-black">Lokasi Strategis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-4">
            Strategis di{" "}
            <span className="text-[#7C3AED]">Semua Arah</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Lokasi kami di Wanasari memberikan akses mudah ke berbagai fasilitas penting Karawang
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc, idx) => {
            const Icon = loc.icon;
            return (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group"
              >
                <div
                  className="bg-white border-2 border-black rounded-2xl p-6 nb-shadow hover:-translate-y-1 hover:shadow-[6px_6px_0px_#7C3AED] transition-all duration-200 h-full flex flex-col"
                >
                  {/* Tag */}
                  <div className="inline-flex mb-5">
                    <span
                      className="px-3 py-1 text-xs font-bold rounded-full border-2 border-black"
                      style={{ backgroundColor: loc.bgColor, color: loc.color }}
                    >
                      {loc.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl border-2 border-black flex items-center justify-center mb-5 nb-shadow"
                    style={{ backgroundColor: loc.color }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-black text-lg text-black mb-3">{loc.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{loc.description}</p>

                  {/* Distance & Time */}
                  <div className="flex items-center gap-4 pt-4 border-t-2 border-black">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-black"
                        style={{ backgroundColor: loc.bgColor }}
                      >
                        <Map className="w-4 h-4" style={{ color: loc.color }} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-medium">Jarak</div>
                        <div className="font-black text-sm text-black">{loc.distance}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-black"
                        style={{ backgroundColor: loc.bgColor }}
                      >
                        <Clock className="w-4 h-4" style={{ color: loc.color }} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-medium">Waktu</div>
                        <div className="font-black text-sm text-black">{loc.time}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 p-6 md:p-8 bg-[#7C3AED] rounded-2xl border-2 border-black nb-shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ boxShadow: "8px 8px 0px #0A0A0A" }}
        >
          <div className="text-center md:text-left">
            <h3 className="font-black text-white text-xl md:text-2xl mb-2">
              Tertarik dengan lokasinya?
            </h3>
            <p className="text-purple-200 text-sm">
              Hubungi kami untuk jadwalkan survey langsung ke lokasi kontrakan.
            </p>
          </div>
          <a
            href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20jadwalkan%20survey%20kontrakan%20Wanasari"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3.5 bg-white text-[#7C3AED] font-black rounded-xl border-2 border-black hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#0A0A0A] transition-all duration-150"
            style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.3)" }}
          >
            📍 Jadwalkan Survey
          </a>
        </motion.div>
      </div>
    </section>
  );
}
