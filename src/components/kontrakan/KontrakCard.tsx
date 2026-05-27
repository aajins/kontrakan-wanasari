"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, MessageCircle, ChevronRight, CheckCircle2, XCircle,
  Wifi, Car, Bath, Zap, UtensilsCrossed, Home
} from "lucide-react";
import { Kontrakan } from "@/types";

interface KontrakCardProps {
  kontrakan: Kontrakan;
  index?: number;
}

const facilityIcons: Record<string, React.ReactNode> = {
  "Kamar Mandi Dalam": <Bath className="w-3.5 h-3.5" />,
  "Kamar Mandi Luar": <Bath className="w-3.5 h-3.5" />,
  "Listrik PLN 900W": <Zap className="w-3.5 h-3.5" />,
  "Listrik PLN 1300W": <Zap className="w-3.5 h-3.5" />,
  "Parkir Motor": <Car className="w-3.5 h-3.5" />,
  "Parkir Motor & Mobil": <Car className="w-3.5 h-3.5" />,
  "Dapur": <UtensilsCrossed className="w-3.5 h-3.5" />,
  "Dapur Bersama": <UtensilsCrossed className="w-3.5 h-3.5" />,
  "WiFi": <Wifi className="w-3.5 h-3.5" />,
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

export default function KontrakCard({ kontrakan, index = 0 }: KontrakCardProps) {
  const [selectedUnitIdx, setSelectedUnitIdx] = useState(0);
  const selectedUnit = kontrakan.units[selectedUnitIdx];
  const minPrice = Math.min(...kontrakan.units.map((u) => u.price));
  const hasAvailable = kontrakan.units.some((u) => u.available);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-white border-2 border-black rounded-2xl overflow-hidden nb-shadow hover:-translate-y-1 hover:shadow-[6px_6px_0px_#7C3AED] transition-all duration-200 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={kontrakan.images[0]}
          alt={kontrakan.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          {hasAvailable ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white text-xs font-bold rounded-full border-2 border-black">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Tersedia
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-black">
              <XCircle className="w-3.5 h-3.5" />
              Penuh
            </span>
          )}
        </div>
        {kontrakan.rating && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1.5 bg-black/80 text-white text-xs font-bold rounded-full backdrop-blur-sm">
              ⭐ {kontrakan.rating}
            </span>
          </div>
        )}
        {kontrakan.featured && (
          <div className="absolute bottom-3 right-3">
            <span className="px-3 py-1 bg-[#7C3AED] text-white text-xs font-bold rounded-full border border-white/30">
              ✨ Unggulan
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="font-black text-base text-black mb-1.5 leading-snug">
            {kontrakan.title}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>{kontrakan.location}</span>
          </div>
        </div>

        {/* Unit Type Selector */}
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            {kontrakan.units.map((unit, idx) => (
              <button
                key={unit.id}
                onClick={() => setSelectedUnitIdx(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all duration-150 ${
                  selectedUnitIdx === idx
                    ? "bg-[#7C3AED] text-white border-black nb-shadow"
                    : "bg-[#F6F3FF] text-black border-black hover:bg-[#EDE9FE]"
                }`}
              >
                {unit.type}
                <span className="ml-1">
                  {unit.available ? (
                    <span className="text-[#25D366]">●</span>
                  ) : (
                    <span className="text-red-400">●</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Unit Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            {selectedUnit.available ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-[#25D366]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Unit ini tersedia
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-semibold text-red-500">
                <XCircle className="w-3.5 h-3.5" />
                Unit ini penuh
              </span>
            )}
          </div>

          {/* Facilities – now uses Facility objects */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {selectedUnit.facilities.slice(0, 4).map((facility) => (
              <span
                key={facility.id}
                className="flex items-center gap-1 px-2.5 py-1 bg-[#F6F3FF] text-gray-700 text-xs font-semibold rounded-lg border border-black/10"
              >
                {facilityIcons[facility.name] || <Home className="w-3.5 h-3.5" />}
                {facility.name}
              </span>
            ))}
            {selectedUnit.facilities.length > 4 && (
              <span className="px-2.5 py-1 bg-[#F6F3FF] text-gray-500 text-xs font-semibold rounded-lg border border-black/10">
                +{selectedUnit.facilities.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="pt-4 border-t-2 border-black/10">
          <div className="flex items-end justify-between mb-3">
            <div>
              <span className="text-xs text-gray-400 block">Harga sewa</span>
              <div className="text-xl font-black text-[#7C3AED]">
                {formatPrice(selectedUnit.price)}
                <span className="text-sm font-medium text-gray-500">/bln</span>
              </div>
            </div>
            {kontrakan.units.length > 1 && (
              <div className="text-right">
                <span className="text-xs text-gray-400 block">Mulai dari</span>
                <span className="text-sm font-bold text-gray-600">{formatPrice(minPrice)}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Link
              href={`/kontrakan/${kontrakan.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#F6F3FF] text-black font-bold text-sm rounded-xl border-2 border-black hover:bg-[#EDE9FE] hover:-translate-y-0.5 transition-all nb-shadow"
            >
              Detail
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${kontrakan.whatsapp}?text=${encodeURIComponent(
                `Halo ${kontrakan.ownerName}, saya tertarik dengan ${kontrakan.title} tipe ${selectedUnit.type}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#25D366] text-white font-bold text-sm rounded-xl border-2 border-black hover:-translate-y-0.5 transition-all nb-shadow"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
