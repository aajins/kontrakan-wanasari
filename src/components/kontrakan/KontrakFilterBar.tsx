"use client";

import { FilterState } from "@/types";
import { SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  filter: FilterState;
  onChange: (filter: FilterState) => void;
  totalCount: number;
}

const statusOptions = [
  { value: "all", label: "Semua" },
  { value: "available", label: "Tersedia" },
  { value: "full", label: "Penuh" },
];

const unitTypeOptions = [
  { value: "all", label: "Semua Tipe" },
  { value: "2 Petak", label: "2 Petak" },
  { value: "3 Petak", label: "3 Petak" },
];

export default function KontrakFilterBar({ filter, onChange, totalCount }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-[#7C3AED]" />
        <span className="font-bold text-black text-sm">
          Menampilkan <span className="text-[#7C3AED]">{totalCount}</span> kontrakan
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <div className="flex items-center gap-1.5 bg-[#F6F3FF] border-2 border-black rounded-xl p-1.5 nb-shadow">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filter, status: opt.value as FilterState["status"] })}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-bold transition-all duration-150 ${
                filter.status === opt.value
                  ? "bg-[#7C3AED] text-white border-2 border-black nb-shadow"
                  : "text-gray-600 hover:text-black hover:bg-white border-2 border-transparent"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Unit Type Filter */}
        <div className="flex items-center gap-1.5 bg-[#F6F3FF] border-2 border-black rounded-xl p-1.5 nb-shadow">
          {unitTypeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filter, unitType: opt.value })}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-bold transition-all duration-150 ${
                filter.unitType === opt.value
                  ? "bg-[#0A0A0A] text-white border-2 border-black nb-shadow"
                  : "text-gray-600 hover:text-black hover:bg-white border-2 border-transparent"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
