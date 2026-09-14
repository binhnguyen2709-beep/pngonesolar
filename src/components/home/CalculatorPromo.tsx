import { Calculator, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

const bullets = [
  "Nhập số tiền điện hoặc số kWh tiêu thụ hàng tháng",
  "Nhận ngay công suất hệ thống và chi phí đầu tư ước tính",
  "Xem thời gian hoàn vốn và mức tiết kiệm hàng tháng",
];

export function CalculatorPromo() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-600">
          <div
            className="absolute -right-16 -top-16 h-72 w-72 rounded-full opacity-20 blur-2xl"
            style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
          />
          <div className="relative grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:p-16">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Calculator className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-balance text-3xl font-bold text-white sm:text-4xl">
                Ước tính chi phí lắp đặt chỉ trong 1 phút
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-50">
                Công cụ tính toán thông minh giúp bạn nắm được công suất phù hợp và chi phí đầu tư dự kiến, trước
                khi đội ngũ kỹ thuật khảo sát thực tế và đưa ra báo giá chính xác.
              </p>
              <ul className="mt-6 space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-white">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-sun-400" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <LinkButton href="/tinh-chi-phi" variant="secondary" size="lg">
                  Tính chi phí ngay
                </LinkButton>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm sm:p-8">
              <div className="space-y-4">
                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs font-medium text-slate-500">Công suất đề xuất</p>
                  <p className="mt-1 text-2xl font-extrabold text-navy-950">8.5 kWp</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs font-medium text-slate-500">Tiết kiệm / tháng</p>
                    <p className="mt-1 text-lg font-bold text-emerald-600">~2.1 triệu đ</p>
                  </div>
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs font-medium text-slate-500">Hoàn vốn</p>
                    <p className="mt-1 text-lg font-bold text-navy-950">~5.2 năm</p>
                  </div>
                </div>
                <p className="text-center text-xs text-brand-100">*Số liệu minh họa, kết quả thực tế tùy nhu cầu của bạn</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
