import nodemailer from "nodemailer";
import type { LeadRecord } from "./leads";

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

/**
 * Gửi email thông báo lead mới cho đội sale. Nếu chưa cấu hình SMTP trong .env
 * thì bỏ qua bước gửi email (lead vẫn được lưu vào data/leads.json).
 */
export async function notifyNewLead(lead: LeadRecord) {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, reason: "SMTP chưa được cấu hình" };

  const notifyTo = process.env.LEAD_NOTIFY_EMAIL || process.env.SMTP_USER;

  const sourceLabel: Record<LeadRecord["source"], string> = {
    calculator: "Công cụ tính chi phí",
    contact: "Form liên hệ",
    "project-cta": "CTA trang dự án",
  };

  try {
    await transporter.sendMail({
      from: `"PNG ONE SOLAR - Website" <${process.env.SMTP_USER}>`,
      to: notifyTo,
      subject: `[Lead mới] ${lead.name} - ${sourceLabel[lead.source]}`,
      html: `
        <h2>Có khách hàng mới để lại thông tin</h2>
        <p><b>Nguồn:</b> ${sourceLabel[lead.source]}</p>
        <p><b>Họ tên:</b> ${lead.name}</p>
        <p><b>Điện thoại:</b> ${lead.phone}</p>
        <p><b>Email:</b> ${lead.email || "-"}</p>
        <p><b>Địa chỉ:</b> ${lead.address || "-"}</p>
        <p><b>Ghi chú:</b> ${lead.note || "-"}</p>
        <p><b>Thời gian:</b> ${new Date(lead.createdAt).toLocaleString("vi-VN")}</p>
        ${lead.meta ? `<pre>${JSON.stringify(lead.meta, null, 2)}</pre>` : ""}
      `,
    });
    return { sent: true };
  } catch (error) {
    console.error("Gửi email thông báo lead thất bại:", error);
    return { sent: false, reason: "Gửi email thất bại" };
  }
}
