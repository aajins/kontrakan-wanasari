import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isAuthenticated } from "@/lib/auth-check";
import { KontrakFormValues, Kontrakan } from "@/types";

// ─── Row ↔ Type Mapper ─────────────────────────────────────────────────────

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

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ─── GET /api/kontrakans/[id] ──────────────────────────────────────────────

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const db = getSupabaseAdmin();

  const { data, error } = await db
    .from("kontrakans")
    .select("*")
    .or(`id.eq.${id},slug.eq.${id}`)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Kontrakan tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(mapRow(data));
}

// ─── PUT /api/kontrakans/[id] ──────────────────────────────────────────────

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body: KontrakFormValues = await request.json();
  const db = getSupabaseAdmin();

  // Fetch existing record to preserve immutable fields
  const { data: existing, error: fetchError } = await db
    .from("kontrakans")
    .select("slug, created_at")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Kontrakan tidak ditemukan" }, { status: 404 });
  }

  const updatedRow = {
    title: body.title,
    slug: body.slug || existing.slug,
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
    nearby_places: body.nearbyPlaces ?? [],
    featured: body.featured ?? false,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await db
    .from("kontrakans")
    .update(updatedRow)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[PUT /api/kontrakans/[id]]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(mapRow(data));
}

// ─── DELETE /api/kontrakans/[id] ───────────────────────────────────────────

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getSupabaseAdmin();

  const { error } = await db.from("kontrakans").delete().eq("id", id);

  if (error) {
    console.error("[DELETE /api/kontrakans/[id]]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
