import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isAuthenticated } from "@/lib/auth-check";

// ─── GET /api/facilities ───────────────────────────────────────────────────

export async function GET() {
  const db = getSupabaseAdmin();
  const { data, error } = await db.from("facilities").select("*").order("name");

  if (error) {
    console.error("[GET /api/facilities]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

// ─── POST /api/facilities ──────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, name }: { id: string; name: string } = await request.json();
  const db = getSupabaseAdmin();

  const { data, error } = await db
    .from("facilities")
    .insert({ id, name })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      // Unique violation – return the existing record
      const { data: existing } = await db
        .from("facilities")
        .select("*")
        .eq("name", name)
        .single();
      return NextResponse.json(existing);
    }
    console.error("[POST /api/facilities]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
