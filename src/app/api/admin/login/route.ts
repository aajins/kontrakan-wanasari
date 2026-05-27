import { cookies } from "next/headers";
import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "kw-admin-auth";

function signToken(data: string, secret: string): string {
  return createHmac("sha256", secret).update(data).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.SESSION_SECRET || "default-secret-key-must-be-32-chars";

    if (!validUsername || !validPassword) {
      return NextResponse.json(
        { error: "Konfigurasi server tidak lengkap" },
        { status: 500 }
      );
    }

    if (username !== validUsername || password !== validPassword) {
      // Artificial delay to prevent brute force
      await new Promise((r) => setTimeout(r, 500));
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    const payload = `${username}:${Date.now()}`;
    const token = signToken(payload, secret);

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Login berhasil" });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
