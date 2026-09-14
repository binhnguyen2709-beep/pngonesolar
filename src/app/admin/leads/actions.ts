"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { deleteLead } from "@/lib/leads";

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export async function deleteLeadAction(formData: FormData) {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  const id = String(formData.get("id") || "");
  if (id) {
    await deleteLead(id);
  }
  revalidatePath("/admin/leads");
}
