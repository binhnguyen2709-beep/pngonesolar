import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_SESSION_COOKIE = "admin_session";

// Phiên đăng nhập admin hết hạn sau 7 ngày - phải đăng nhập lại bằng ADMIN_PASSWORD.
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret(): string | null {
  return process.env.ADMIN_PASSWORD || null;
}

export function isAdminConfigured(): boolean {
  return getSecret() !== null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/** So sánh mật khẩu người dùng nhập với ADMIN_PASSWORD, tránh timing attack. */
export function verifyPassword(input: string): boolean {
  const secret = getSecret();
  if (!secret) return false;

  const inputBuf = Buffer.from(input);
  const secretBuf = Buffer.from(secret);
  if (inputBuf.length !== secretBuf.length) return false;
  return timingSafeEqual(inputBuf, secretBuf);
}

/**
 * Token phiên đăng nhập = thời điểm hết hạn + chữ ký HMAC (khóa = ADMIN_PASSWORD), nên đổi
 * mật khẩu sẽ tự động vô hiệu hóa mọi phiên cũ mà không cần lưu trạng thái phía server.
 */
export function createSessionToken(): string | null {
  const secret = getSecret();
  if (!secret) return null;

  const payload = String(Date.now() + SESSION_TTL_MS);
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  const secret = getSecret();
  if (!secret || !token) return false;

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  let expectedBuf: Buffer;
  let sigBuf: Buffer;
  try {
    expectedBuf = Buffer.from(sign(payload, secret), "hex");
    sigBuf = Buffer.from(sig, "hex");
  } catch {
    return false;
  }
  if (expectedBuf.length !== sigBuf.length || !timingSafeEqual(expectedBuf, sigBuf)) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

/** Gọi ở đầu mỗi trang admin cần đăng nhập - tự động chuyển hướng nếu chưa có phiên hợp lệ. */
export async function requireAdminSession() {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }
}
