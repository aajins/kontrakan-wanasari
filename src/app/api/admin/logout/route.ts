import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const AUTH_COOKIE = "kw-admin-auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  return NextResponse.json({ success: true, message: "Logout berhasil" });
}
