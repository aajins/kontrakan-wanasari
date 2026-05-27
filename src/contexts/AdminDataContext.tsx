"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Kontrakan, Facility, KontrakFormValues } from "@/types";
import { normalizeFacilityName, findDuplicateFacility } from "@/lib/facilities";

// ─────────────────────────────────────────────
// Context Type
// ─────────────────────────────────────────────

interface AdminDataContextType {
  kontrakans: Kontrakan[];
  facilities: Facility[];
  isLoaded: boolean;

  // Kontrakan CRUD (all async – call supabase via API routes)
  addKontrakan: (data: KontrakFormValues) => Promise<Kontrakan>;
  updateKontrakan: (id: string, data: KontrakFormValues) => Promise<void>;
  deleteKontrakan: (id: string) => Promise<void>;
  toggleUnitAvailability: (kontrakId: string, unitId: string) => Promise<void>;
  getKontrakById: (id: string) => Kontrakan | undefined;

  // Facility management (async)
  addFacility: (name: string) => Promise<Facility>;
  getFacilityById: (id: string) => Facility | undefined;

  // Stats
  stats: {
    total: number;
    available: number;
    full: number;
    totalUnits: number;
  };
}

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

const AdminDataContext = createContext<AdminDataContextType | null>(null);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [kontrakans, setKontrakans] = useState<Kontrakan[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // ── Initial load from Supabase via API routes ──
  useEffect(() => {
    async function load() {
      try {
        const [kRes, fRes] = await Promise.all([
          fetch("/api/kontrakans"),
          fetch("/api/facilities"),
        ]);
        const [kData, fData] = await Promise.all([kRes.json(), fRes.json()]);
        setKontrakans(Array.isArray(kData) ? kData : []);
        setFacilities(Array.isArray(fData) ? fData : []);
      } catch (err) {
        console.error("Failed to load admin data:", err);
      } finally {
        setIsLoaded(true);
      }
    }
    load();
  }, []);

  // ── Kontrakan CRUD ──

  const addKontrakan = useCallback(async (data: KontrakFormValues): Promise<Kontrakan> => {
    const res = await fetch("/api/kontrakans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error ?? "Gagal menyimpan kontrakan");
    }
    const created: Kontrakan = await res.json();
    setKontrakans((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateKontrakan = useCallback(async (id: string, data: KontrakFormValues): Promise<void> => {
    const res = await fetch(`/api/kontrakans/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error ?? "Gagal memperbarui kontrakan");
    }
    const updated: Kontrakan = await res.json();
    setKontrakans((prev) => prev.map((k) => (k.id === id ? updated : k)));
  }, []);

  const deleteKontrakan = useCallback(async (id: string): Promise<void> => {
    const res = await fetch(`/api/kontrakans/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error ?? "Gagal menghapus kontrakan");
    }
    setKontrakans((prev) => prev.filter((k) => k.id !== id));
  }, []);

  const toggleUnitAvailability = useCallback(
    async (kontrakId: string, unitId: string): Promise<void> => {
      const res = await fetch(`/api/kontrakans/${kontrakId}/toggle-unit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unitId }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Gagal mengubah status unit");
      }
      // Optimistic update in local state
      setKontrakans((prev) =>
        prev.map((k) =>
          k.id === kontrakId
            ? {
                ...k,
                units: k.units.map((u) =>
                  u.id === unitId ? { ...u, available: !u.available } : u
                ),
              }
            : k
        )
      );
    },
    []
  );

  const getKontrakById = useCallback(
    (id: string) => kontrakans.find((k) => k.id === id || k.slug === id),
    [kontrakans]
  );

  // ── Facility management ──

  const addFacility = useCallback(
    async (name: string): Promise<Facility> => {
      const normalized = normalizeFacilityName(name);
      const existing = findDuplicateFacility(normalized, facilities);
      if (existing) return existing;

      const newId = `f-${Date.now()}`;
      const res = await fetch("/api/facilities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: newId, name: normalized }),
      });
      const facility: Facility = await res.json();
      setFacilities((prev) => [...prev, facility]);
      return facility;
    },
    [facilities]
  );

  const getFacilityById = useCallback(
    (id: string) => facilities.find((f) => f.id === id),
    [facilities]
  );

  // ── Stats ──
  const stats = {
    total: kontrakans.length,
    available: kontrakans.filter((k) => k.units.some((u) => u.available)).length,
    full: kontrakans.filter((k) => k.units.every((u) => !u.available)).length,
    totalUnits: kontrakans.reduce((acc, k) => acc + k.units.length, 0),
  };

  return (
    <AdminDataContext.Provider
      value={{
        kontrakans,
        facilities,
        isLoaded,
        addKontrakan,
        updateKontrakan,
        deleteKontrakan,
        toggleUnitAvailability,
        getKontrakById,
        addFacility,
        getFacilityById,
        stats,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData(): AdminDataContextType {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within AdminDataProvider");
  return ctx;
}
