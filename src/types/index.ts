// ─────────────────────────────────────────────
// Core Entities
// ─────────────────────────────────────────────

export interface Facility {
  id: string;
  name: string;
  icon?: string;
}

export interface UnitType {
  id: string;
  type: string;
  price: number;
  available: boolean;
  facilities: Facility[];
  description?: string;
  images?: string[];
  maxOccupants?: number;
  size?: string;
}

export interface Kontrakan {
  id: string;
  title: string;
  slug: string;
  location: string;
  address: string;
  whatsapp: string;
  ownerName: string;
  description: string;
  images: string[];
  units: UnitType[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  nearbyPlaces?: string[];
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  createdAt: string;
}

// ─────────────────────────────────────────────
// Form & Filter Types
// ─────────────────────────────────────────────

export interface FilterState {
  status: "all" | "available" | "full";
  unitType: string;
  priceRange?: [number, number];
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ─────────────────────────────────────────────
// Form Values (for React Hook Form)
// ─────────────────────────────────────────────

export interface UnitFormValues {
  id: string;
  type: string;
  price: number;
  available: boolean;
  facilities: Facility[];
  size?: string;
  maxOccupants?: number;
  description?: string;
}

export interface KontrakFormValues {
  title: string;
  location: string;
  address: string;
  whatsapp: string;
  ownerName: string;
  description: string;
  images: string[];
  units: UnitFormValues[];
  nearbyPlaces: string[];
  featured: boolean;
  slug?: string;
}
