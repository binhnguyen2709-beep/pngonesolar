"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, createSessionToken, isAdminConfigured, verifyPassword } from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  if (!isAdminConfigured()) {
    redirect("/admin/login?error=not-configured");
  }

  const password = String(formData.get("password") || "");
  if (!verifyPassword(password)) {
    redirect("/admin/login?error=invalid");
  }

  const token = createSessionToken();
  if (!token) {
    redirect("/admin/login?error=not-configured");
  }

  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin/leads");
}
