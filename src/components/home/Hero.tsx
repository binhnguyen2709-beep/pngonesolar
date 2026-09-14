import { ArrowRight, ShieldCheck, Sparkles, TrendingDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div
        className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #ffb648 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #1c7dff 0%, transparent 70%)" }}
      />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-brand-200 ring-1 ring-white/10">
              <Sparkles className="h-3.5 w-3.5" />
              Giải pháp năng lượng mặt trời trọn gói
            </span>

            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Cắt giảm đến <span className="text-sun-400">80% tiền điện</span> với hệ áp mái từ {siteConfig.name}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Chủ động nguồn điện, không còn nơm nớp mỗi khi hóa đơn về tay. Khảo sát, thiết kế, thi công và bảo
              hành trọn gói bởi đội ngũ kỹ sư giàu kinh nghiệm - cam kết đúng tiến độ, đúng cam kết công suất.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <LinkButton href="/tinh-chi-phi" size="lg">
                Tính chi phí lắp đặt ngay
                <ArrowRight className="h-5 w-5" />
              </LinkButton>
              <LinkButton href="/du-an" variant="outline" size="lg">
                Xem dự án đã thực hiện
              </LinkButton>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <TrendingDown className="h-5 w-5 text-sun-400" />
                Hoàn vốn 4-6 năm
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <ShieldCheck className="h-5 w-5 text-sun-400" />
                Bảo hành đến 30 năm
              </div>
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:150ms]">
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <svg viewBox="0 0 400 320" className="w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1c7dff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#1c7dff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1c7dff" />
                    <stop offset="100%" stopColor="#0847c4" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="400" height="320" rx="20" fill="url(#skyGrad)" />
                <circle cx="330" cy="60" r="34" fill="#FFB648" opacity="0.9" />
                {[0, 1, 2, 3].map((g) =>
                  [0, 1, 2].map((r) => (
                    <rect
                      key={`${g}-${r}`}
                      x={40 + g * 72}
                      y={150 + r * 34}
                      width="62"
                      height="26"
                      rx="4"
                      fill="url(#panelGrad)"
                      stroke="#0a1e4d"
                      strokeWidth="1.5"
                      opacity={0.95 - r * 0.08}
                    />
                  ))
                )}
                <path d="M20 150 L200 90 L380 150 Z" fill="#0d1836" opacity="0.6" />
                <rect x="30" y="250" width="340" height="14" rx="4" fill="#0d1836" opacity="0.5" />
              </svg>

              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-2xl sm:-left-10">
                <p className="text-xs font-medium text-slate-500">Sản lượng điện hôm nay</p>
                <p className="mt-1 text-2xl font-bold text-navy-950">
                  48.2 <span className="text-sm font-medium text-slate-400">kWh</span>
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <TrendingDown className="h-3 w-3 rotate-180" /> +12% so với hôm qua
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
