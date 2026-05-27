"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, Check, ChevronDown } from "lucide-react";
import { Facility } from "@/types";
import { normalizeFacilityName, findDuplicateFacility } from "@/lib/facilities";

interface FacilitySelectorProps {
  value: Facility[];
  onChange: (facilities: Facility[]) => void;
  masterFacilities: Facility[];
  onAddFacility: (name: string) => Promise<Facility>;
  error?: string;
  label?: string;
}

export default function FacilitySelector({
  value,
  onChange,
  masterFacilities,
  onAddFacility,
  error,
  label = "Fasilitas Unit",
}: FacilitySelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [addingNew, setAddingNew] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus search when opened
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  const filtered = masterFacilities.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const isSelected = useCallback(
    (facility: Facility) => value.some((v) => v.id === facility.id),
    [value]
  );

  const toggleFacility = (facility: Facility) => {
    if (isSelected(facility)) {
      onChange(value.filter((v) => v.id !== facility.id));
    } else {
      onChange([...value, facility]);
    }
  };

  const removeFacility = (facilityId: string) => {
    onChange(value.filter((v) => v.id !== facilityId));
  };

  const handleAddNew = async () => {
    if (!search.trim()) return;
    const normalized = normalizeFacilityName(search);
    const existing = findDuplicateFacility(normalized, masterFacilities);
    if (existing) {
      // Already exists, just select it
      if (!isSelected(existing)) toggleFacility(existing);
      setSearch("");
      setAddingNew(false);
      return;
    }
    const newFacility = await onAddFacility(normalized);
    onChange([...value, newFacility]);
    setSearch("");
    setAddingNew(false);
  };

  const exactMatch = masterFacilities.some(
    (f) => f.name.toLowerCase() === search.trim().toLowerCase()
  );
  const showAddNew = search.trim().length > 0 && !exactMatch;

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-sm font-black text-black mb-2">{label}</label>
      )}

      {/* Selected Tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {value.map((facility) => (
            <span
              key={facility.id}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7C3AED] text-white text-xs font-bold rounded-xl border-2 border-black nb-shadow"
            >
              {facility.name}
              <button
                type="button"
                onClick={() => removeFacility(facility.id)}
                className="hover:opacity-75 transition-opacity ml-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-3 bg-[#FAF7FF] border-2 rounded-xl font-semibold text-sm transition-all ${
          error ? "border-red-500" : open ? "border-[#7C3AED]" : "border-black hover:border-[#7C3AED]"
        }`}
      >
        <span className={value.length > 0 ? "text-black" : "text-gray-400"}>
          {value.length > 0
            ? `${value.length} fasilitas dipilih`
            : "Pilih fasilitas..."}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500">{error}</p>
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-0 right-0 top-full mt-2 bg-white border-2 border-black rounded-2xl nb-shadow-purple overflow-hidden"
            style={{ boxShadow: "4px 4px 0px #7C3AED" }}
          >
            {/* Search */}
            <div className="p-3 border-b-2 border-black/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (showAddNew) handleAddNew();
                      else if (filtered.length > 0) toggleFacility(filtered[0]);
                    }
                  }}
                  placeholder="Cari atau tambah fasilitas..."
                  className="w-full pl-9 pr-4 py-2.5 bg-[#F6F3FF] border-2 border-black rounded-xl text-sm font-semibold text-black placeholder:text-gray-400 focus:outline-none focus:border-[#7C3AED] transition-colors"
                />
              </div>
            </div>

            {/* List */}
            <div className="max-h-52 overflow-y-auto p-2">
              {filtered.length === 0 && !showAddNew && (
                <div className="py-8 text-center text-gray-400 text-sm font-medium">
                  Tidak ada fasilitas ditemukan
                </div>
              )}

              {filtered.map((facility) => (
                <button
                  key={facility.id}
                  type="button"
                  onClick={() => toggleFacility(facility)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isSelected(facility)
                      ? "bg-[#F6F3FF] text-[#7C3AED]"
                      : "text-gray-700 hover:bg-[#F6F3FF] hover:text-black"
                  }`}
                >
                  <span>{facility.name}</span>
                  {isSelected(facility) && (
                    <Check className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
                  )}
                </button>
              ))}

              {/* Add New Option */}
              {showAddNew && (
                <button
                  type="button"
                  onClick={handleAddNew}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#7C3AED] hover:bg-[#F6F3FF] transition-all border-t-2 border-dashed border-black/10 mt-1 pt-3"
                >
                  <Plus className="w-4 h-4 flex-shrink-0" />
                  <span>
                    Tambah &quot;{normalizeFacilityName(search)}&quot; sebagai fasilitas baru
                  </span>
                </button>
              )}
            </div>

            {/* Footer */}
            {value.length > 0 && (
              <div className="px-4 py-3 border-t-2 border-black/10 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">
                  {value.length} dipilih
                </span>
                <button
                  type="button"
                  onClick={() => onChange([])}
                  className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                >
                  Hapus semua
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
