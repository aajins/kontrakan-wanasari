"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, MapPin, MessageCircle, CheckCircle2, XCircle, Star,
  Bath, Car, Zap, UtensilsCrossed, Home, Wifi, Train, ShoppingBag,
  Factory, ChevronLeft, ChevronRight, Users, SquareStack, Phone
} from "lucide-react";
import { Kontrakan } from "@/types";

interface Props {
  kontrakan: Kontrakan;
}

const facilityIcons: Record<string, React.ReactNode> = {
  "Kamar Mandi Dalam": <Bath className="w-5 h-5" />,
  "Kamar Mandi Luar": <Bath className="w-5 h-5" />,
  "Listrik PLN 900W": <Zap className="w-5 h-5" />,
  "Listrik PLN 1300W": <Zap className="w-5 h-5" />,
  "Parkir Motor": <Car className="w-5 h-5" />,
  "Parkir Motor & Mobil": <Car className="w-5 h-5" />,
  "Dapur": <UtensilsCrossed className="w-5 h-5" />,
  "Dapur Bersama": <UtensilsCrossed className="w-5 h-5" />,
  "WiFi": <Wifi className="w-5 h-5" />,
};

const nearbyIcons: Record<string, React.ReactNode> = {
  "Stasiun": <Train className="w-4 h-4" />,
  "Grand": <ShoppingBag className="w-4 h-4" />,
  "Kawasan": <Factory className="w-4 h-4" />,
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

export default function KontrakDetailClient({ kontrakan }: Props) {
  const [selectedUnitIdx, setSelectedUnitIdx] = useState(0);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const selectedUnit = kontrakan.units[selectedUnitIdx];
  const allImages = kontrakan.images;

  const prevImage = () =>
    setCurrentImageIdx((p) => (p - 1 + allImages.length) % allImages.length);
  const nextImage = () =>
    setCurrentImageIdx((p) => (p + 1) % allImages.length);

  const whatsappMessage = `Halo ${kontrakan.ownerName}, saya tertarik dengan ${kontrakan.title} tipe ${selectedUnit.type}. Apakah masih tersedia?`;

  return (
    <div className="min-h-screen bg-[#FAF7FF]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <Link
          href="/#kontrakan"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#7C3AED] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Kontrakan
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main Content ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-white border-2 border-black rounded-2xl overflow-hidden"
              style={{ boxShadow: "6px 6px 0px #7C3AED" }}
            >
              <div className="relative h-72 sm:h-96 md:h-[450px]">
                <img
                  src={allImages[currentImageIdx]}
                  alt={`${kontrakan.title} foto ${currentImageIdx + 1}`}
                  className="w-full h-full object-cover"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-black rounded-xl flex items-center justify-center nb-shadow hover:-translate-x-0.5 hover:-translate-y-1/2 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-black rounded-xl flex items-center justify-center nb-shadow hover:translate-x-0.5 hover:-translate-y-1/2 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/80 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                  {currentImageIdx + 1} / {allImages.length}
                </div>
                <div className="absolute top-3 left-3">
                  {kontrakan.units.some((u) => u.available) ? (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white text-xs font-bold rounded-full border-2 border-black">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Ada yang Tersedia
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-black">
                      <XCircle className="w-3.5 h-3.5" />
                      Semua Penuh
                    </span>
                  )}
                </div>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-3 p-4">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIdx(idx)}
                    className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      currentImageIdx === idx
                        ? "border-[#7C3AED] nb-shadow-purple"
                        : "border-black hover:border-[#7C3AED]"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Title & Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border-2 border-black rounded-2xl p-6 nb-shadow"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-black mb-2">
                    {kontrakan.title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-4 h-4 text-[#7C3AED]" />
                    <span className="text-sm">{kontrakan.address}</span>
                  </div>
                </div>
                {kontrakan.rating && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#F6F3FF] border-2 border-black rounded-xl nb-shadow">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-black text-black">{kontrakan.rating}</span>
                    <span className="text-gray-400 text-sm">({kontrakan.reviewCount} ulasan)</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed">{kontrakan.description}</p>
            </motion.div>

            {/* Unit Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border-2 border-black rounded-2xl p-6 nb-shadow"
            >
              <h2 className="font-black text-lg text-black mb-5">Pilih Tipe Unit</h2>
              <div className="flex gap-3 flex-wrap mb-6">
                {kontrakan.units.map((unit, idx) => (
                  <button
                    key={unit.id}
                    onClick={() => setSelectedUnitIdx(idx)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border-2 transition-all duration-150 ${
                      selectedUnitIdx === idx
                        ? "bg-[#7C3AED] text-white border-black nb-shadow"
                        : "bg-[#F6F3FF] text-black border-black hover:bg-[#EDE9FE]"
                    }`}
                  >
                    <SquareStack className="w-4 h-4" />
                    {unit.type}
                    {unit.available ? (
                      <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                  </button>
                ))}
              </div>

              {/* Selected Unit Detail */}
              <div className="bg-[#F6F3FF] rounded-xl border-2 border-black p-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl border-2 border-black flex items-center justify-center nb-shadow">
                      <SquareStack className="w-5 h-5 text-[#7C3AED]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Tipe</div>
                      <div className="font-black text-sm">{selectedUnit.type}</div>
                    </div>
                  </div>
                  {selectedUnit.size && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl border-2 border-black flex items-center justify-center nb-shadow">
                        <Home className="w-5 h-5 text-[#7C3AED]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Luas</div>
                        <div className="font-black text-sm">{selectedUnit.size}</div>
                      </div>
                    </div>
                  )}
                  {selectedUnit.maxOccupants && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl border-2 border-black flex items-center justify-center nb-shadow">
                        <Users className="w-5 h-5 text-[#7C3AED]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Kapasitas</div>
                        <div className="font-black text-sm">{selectedUnit.maxOccupants} orang</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="mb-5">
                  {selectedUnit.available ? (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border-2 border-[#25D366] rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
                      <span className="font-bold text-[#25D366]">
                        Unit ini tersedia untuk disewa
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border-2 border-red-400 rounded-xl">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="font-bold text-red-500">
                        Unit ini sedang penuh / tidak tersedia
                      </span>
                    </div>
                  )}
                </div>

                {/* Facilities – uses Facility objects */}
                <div>
                  <h3 className="font-bold text-black text-sm mb-3">Fasilitas Unit</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedUnit.facilities.map((facility) => (
                      <div
                        key={facility.id}
                        className="flex items-center gap-2.5 px-3 py-2.5 bg-white border-2 border-black rounded-xl"
                      >
                        <span className="text-[#7C3AED]">
                          {facilityIcons[facility.name] || (
                            <CheckCircle2 className="w-5 h-5" />
                          )}
                        </span>
                        <span className="text-sm font-semibold text-black">
                          {facility.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedUnit.description && (
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed border-t-2 border-black/10 pt-4">
                    {selectedUnit.description}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Nearby Places */}
            {kontrakan.nearbyPlaces && kontrakan.nearbyPlaces.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white border-2 border-black rounded-2xl p-6 nb-shadow"
              >
                <h2 className="font-black text-lg text-black mb-5">Lokasi Strategis</h2>
                <div className="space-y-3">
                  {kontrakan.nearbyPlaces.map((place, idx) => {
                    const iconKey = Object.keys(nearbyIcons).find((k) => place.includes(k));
                    const Icon = iconKey ? nearbyIcons[iconKey] : <MapPin className="w-4 h-4" />;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 px-4 py-3 bg-[#F6F3FF] rounded-xl border-2 border-black"
                      >
                        <span className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                          {Icon}
                        </span>
                        <span className="font-semibold text-black text-sm">{place}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Maps Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border-2 border-black rounded-2xl overflow-hidden nb-shadow"
            >
              <div className="p-4 border-b-2 border-black">
                <h2 className="font-black text-lg text-black">Lokasi di Peta</h2>
              </div>
              <div className="h-64 bg-[#F6F3FF] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-black nb-shadow">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-bold text-black text-sm px-4 text-center">{kontrakan.address}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(kontrakan.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white text-sm font-bold rounded-xl border-2 border-black nb-shadow hover:-translate-y-0.5 transition-all"
                  >
                    Buka Google Maps
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Sidebar ───────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-5">
              {/* Price Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border-2 border-black rounded-2xl p-6"
                style={{ boxShadow: "6px 6px 0px #7C3AED" }}
              >
                <div className="mb-2">
                  <span className="text-sm text-gray-400">Harga sewa</span>
                </div>
                <div className="text-3xl font-black text-[#7C3AED] mb-1">
                  {formatPrice(selectedUnit.price)}
                </div>
                <div className="text-gray-500 text-sm mb-5">
                  per bulan • {selectedUnit.type}
                </div>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${kontrakan.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#25D366] text-white font-black rounded-xl border-2 border-black nb-shadow hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0A0A0A] transition-all duration-150"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Hubungi via WhatsApp
                  </a>
                  <a
                    href={`tel:+${kontrakan.whatsapp}`}
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#F6F3FF] text-black font-bold rounded-xl border-2 border-black nb-shadow hover:-translate-y-0.5 transition-all"
                  >
                    <Phone className="w-5 h-5 text-[#7C3AED]" />
                    Telepon Pemilik
                  </a>
                </div>

                <div className="mt-5 pt-5 border-t-2 border-black/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-[#7C3AED] rounded-full flex items-center justify-center text-white font-black text-sm">
                      {kontrakan.ownerName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-black text-sm">{kontrakan.ownerName}</div>
                      <div className="text-gray-400 text-xs">Pemilik Kontrakan</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Location Info */}
              {kontrakan.nearbyPlaces && kontrakan.nearbyPlaces.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#0A0A0A] border-2 border-black rounded-2xl p-5 nb-shadow"
                >
                  <h3 className="font-black text-white mb-4 text-sm">📍 Info Lokasi</h3>
                  <div className="space-y-2.5">
                    {kontrakan.nearbyPlaces.slice(0, 3).map((place, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-gray-300 text-xs"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 flex-shrink-0" />
                        {place}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#F6F3FF] border-2 border-black rounded-2xl p-5 nb-shadow"
              >
                <div className="space-y-3">
                  {[
                    "✓ Informasi akurat & terverifikasi",
                    "✓ Kontak langsung ke pemilik",
                    "✓ Tidak ada biaya perantara",
                    "✓ Survey lokasi bisa diatur",
                  ].map((text, idx) => (
                    <div key={idx} className="text-sm font-semibold text-black">
                      {text}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
