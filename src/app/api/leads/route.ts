import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveLead } from "@/lib/leads";
import { notifyNewLead } from "@/lib/email";

const leadSchema = z.object({
  source: z.enum(["calculator", "contact", "project-cta"]),
  name: z.string().trim().min(2, "Vui lòng nhập họ tên hợp lệ").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^(0|\+84)[0-9]{9,10}$/, "Số điện thoại không hợp lệ"),
  email: z.union([z.literal(""), z.string().trim().email()]).optional(),
  address: z.string().trim().max(300).optional(),
  note: z.string().trim().max(500).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu gửi lên không hợp lệ" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Thông tin chưa hợp lệ", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const lead = await saveLead(parsed.data);
    // Không chặn phản hồi cho người dùng nếu gửi email chậm/lỗi.
    notifyNewLead(lead).catch((err) => console.error("notifyNewLead error", err));

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error("Lỗi khi lưu lead:", error);
    return NextResponse.json({ ok: false, error: "Có lỗi xảy ra, vui lòng thử lại" }, { status: 500 });
  }
}
