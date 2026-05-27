"use client";

import { motion } from "framer-motion";
import { MessageCircle, Building2, MapPin, Zap, Star, ChevronRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Kontrakan", value: "10+", icon: Building2 },
  { label: "Penyewa Puas", value: "200+", icon: Star },
  { label: "Lokasi Strategis", value: "1 Area", icon: MapPin },
];

const highlights = [
  "Dekat Stasiun KCIC/Whoosh",
  "Dekat Grand Outlet Karawang",
  "Dekat Kawasan Industri",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF7FF] py-16 md:py-24">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#7C3AED]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#9333EA]/5 rounded-full blur-3xl" />
        {/* Brutalist Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, #0A0A0A, #0A0A0A 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #0A0A0A, #0A0A0A 1px, transparent 1px, transparent 40px)"
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F6F3FF] border-2 border-black rounded-full mb-6 nb-shadow">
              <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
              <span className="text-sm font-bold text-[#7C3AED]">Unit Tersedia Sekarang</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight text-black mb-6">
              Cari Kontrakan{" "}
              <span className="relative inline-block">
                <span className="text-[#7C3AED]">Strategis</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 6C50 2 100 2 198 6" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              di Karawang{" "}
              <span className="inline-block bg-[#7C3AED] text-white px-3 py-1 rounded-lg border-2 border-black nb-shadow-lg">
                Tanpa Ribet
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-lg">
              Hunian nyaman di <strong className="text-black">Desa Wanasari</strong>, Telukjambe Barat.
              Dekat kawasan industri, akses mudah, harga terjangkau. Hubungi langsung pemilik via WhatsApp.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2 mb-8">
              {highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-black rounded-lg text-sm font-semibold nb-shadow"
                >
                  <Zap className="w-3.5 h-3.5 text-[#7C3AED]" />
                  {h}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20menyewa%20kontrakan%20di%20Wanasari"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-bold rounded-xl border-2 border-black nb-shadow hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0A0A0A] transition-all duration-150 text-base"
              >
                <MessageCircle className="w-5 h-5" />
                Hubungi via WhatsApp
              </a>
              <Link
                href="/#kontrakan"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#7C3AED] text-white font-bold rounded-xl border-2 border-black nb-shadow hover:-translate-y-1 hover:shadow-[6px_6px_0px_#7C3AED] hover:shadow-purple-800 transition-all duration-150 text-base"
              >
                <Building2 className="w-5 h-5" />
                Lihat Kontrakan
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center p-3 bg-white border-2 border-black rounded-xl nb-shadow"
                  >
                    <Icon className="w-5 h-5 text-[#7C3AED] mb-1" />
                    <span className="text-xl font-black text-black">{stat.value}</span>
                    <span className="text-xs text-gray-500 font-medium text-center">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Main Card */}
            <div className="relative z-10">
              <div className="bg-white border-3 border-black rounded-2xl overflow-hidden nb-shadow-xl" style={{ border: "3px solid #0A0A0A", boxShadow: "8px 8px 0px #7C3AED" }}>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
                    alt="Kontrakan Wanasari"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-[#25D366] text-white text-xs font-bold rounded-full border-2 border-black">
                      ✓ Tersedia
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-black text-white text-xs font-bold rounded-full">
                      ⭐ 4.8
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-lg mb-1">Kontrakan Wanasari Indah</h3>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Wanasari, Telukjambe Barat</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400">Mulai dari</span>
                      <div className="text-xl font-black text-[#7C3AED]">Rp 700.000<span className="text-sm font-medium text-gray-500">/bln</span></div>
                    </div>
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#7C3AED] text-white text-sm font-bold rounded-xl border-2 border-black nb-shadow hover:-translate-y-0.5 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WA
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-[#7C3AED] text-white rounded-xl p-4 border-2 border-black nb-shadow z-20"
            >
              <div className="text-2xl font-black">10+</div>
              <div className="text-xs font-semibold opacity-90">Unit Tersedia</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -left-6 bg-[#25D366] text-white rounded-xl p-4 border-2 border-black nb-shadow z-20"
            >
              <div className="text-lg font-black">Chat Langsung</div>
              <div className="text-xs font-semibold opacity-90">via WhatsApp</div>
            </motion.div>

            {/* Decorative Shape */}
            <div className="absolute top-0 right-0 w-full h-full border-2 border-black rounded-2xl bg-[#F6F3FF] -z-10 translate-x-4 translate-y-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
