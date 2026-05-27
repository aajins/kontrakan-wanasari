import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isAuthenticated } from "@/lib/auth-check";
import { Kontrakan, KontrakFormValues } from "@/types";

// ─── Row ↔ Type Mappers ────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Kontrakan {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    location: row.location,
    address: row.address,
    whatsapp: row.whatsapp,
    ownerName: row.owner_name,
    description: row.description,
    images: row.images ?? [],
    units: row.units ?? [],
    coordinates: row.coordinates ?? undefined,
    nearbyPlaces: row.nearby_places ?? [],
    rating: row.rating ?? undefined,
    reviewCount: row.review_count ?? undefined,
    featured: row.featured ?? false,
    createdAt: row.created_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRows(rows: any[]): Kontrakan[] {
  return rows.map(mapRow);
}

// ─── GET /api/kontrakans ───────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") ?? "all";
  const unitType = searchParams.get("unitType") ?? "all";

  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from("kontrakans")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[GET /api/kontrakans]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let result = mapRows(data ?? []);

  if (status === "available") {
    result = result.filter((k) => k.units.some((u) => u.available));
  } else if (status === "full") {
    result = result.filter((k) => k.units.every((u) => !u.available));
  }
  if (unitType !== "all") {
    result = result.filter((k) => k.units.some((u) => u.type === unitType));
  }

  return NextResponse.json(result);
}

// ─── POST /api/kontrakans ──────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: KontrakFormValues = await request.json();

  const id = `k-${Date.now()}`;
  const slug =
    body.slug ||
    body.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60);

  const row = {
    id,
    title: body.title,
    slug,
    location: body.location,
    address: body.address,
    whatsapp: body.whatsapp,
    owner_name: body.ownerName,
    description: body.description,
    images: body.images,
    units: body.units.map((u) => ({
      ...u,
      id: u.id || `u-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    })),
    coordinates: null,
    nearby_places: body.nearbyPlaces ?? [],
    rating: null,
    review_count: 0,
    featured: body.featured ?? false,
    created_at: new Date().toISOString().split("T")[0],
  };

  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from("kontrakans")
    .insert(row)
    .select()
    .single();

  if (error) {
    console.error("[POST /api/kontrakans]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(mapRow(data), { status: 201 });
}
