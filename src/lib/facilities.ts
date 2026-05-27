import { Facility } from "@/types";

export const masterFacilities: Facility[] = [
  { id: "f1", name: "Kamar Mandi Dalam" },
  { id: "f2", name: "Kamar Mandi Luar" },
  { id: "f3", name: "Listrik PLN 900W" },
  { id: "f4", name: "Listrik PLN 1300W" },
  { id: "f5", name: "Parkir Motor" },
  { id: "f6", name: "Parkir Motor & Mobil" },
  { id: "f7", name: "Air Sumur" },
  { id: "f8", name: "Air PDAM" },
  { id: "f9", name: "Dapur" },
  { id: "f10", name: "Dapur Bersama" },
  { id: "f11", name: "WiFi" },
  { id: "f12", name: "CCTV" },
  { id: "f13", name: "Teras" },
  { id: "f14", name: "Jemuran" },
  { id: "f15", name: "Ruang Tamu" },
  { id: "f16", name: "Lemari" },
];

/**
 * Normalize facility name to prevent duplicates.
 * "wifi", " WiFi ", "WIFI" → "Wifi"
 */
export function normalizeFacilityName(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Check if a facility with the same name (normalized) already exists.
 */
export function findDuplicateFacility(
  name: string,
  facilities: Facility[]
): Facility | undefined {
  const normalized = normalizeFacilityName(name).toLowerCase();
  return facilities.find((f) => f.name.toLowerCase() === normalized);
}
