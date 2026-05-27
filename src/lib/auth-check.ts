import { cookies } from "next/headers";

const AUTH_COOKIE = "kw-admin-auth";

/**
 * Check whether the incoming request has a valid admin auth cookie.
 * Used in API route handlers to protect write endpoints.
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE);
  return !!authCookie?.value;
}
