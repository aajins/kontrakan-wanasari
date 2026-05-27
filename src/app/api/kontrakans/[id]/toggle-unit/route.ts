import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isAuthenticated } from "@/lib/auth-check";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/kontrakans/[id]/toggle-unit
 * Body: { unitId: string }
 * Flips the `available` flag on the given unit inside the JSONB `units` column.
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { unitId }: { unitId: string } = await request.json();
  const db = getSupabaseAdmin();

  // Fetch current units array
  const { data: existing, error: fetchError } = await db
    .from("kontrakans")
    .select("units")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Kontrakan tidak ditemukan" }, { status: 404 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatedUnits = (existing.units as any[]).map((u) =>
    u.id === unitId ? { ...u, available: !u.available } : u
  );

  const { error } = await db
    .from("kontrakans")
    .update({ units: updatedUnits, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("[PATCH /api/kontrakans/[id]/toggle-unit]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
