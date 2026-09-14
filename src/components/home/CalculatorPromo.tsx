import { useTranslations } from "next-intl";
import { Calculator, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export function CalculatorPromo() {
  const t = useTranslations("home.calculatorPromo");
  const bullets = t.raw("bullets") as string[];

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
              <h2 className="mt-6 text-balance text-3xl font-bold text-white sm:text-4xl">{t("title")}</h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-50">{t("description")}</p>
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
                  {t("cta")}
                </LinkButton>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm sm:p-8">
              <div className="space-y-4">
                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs font-medium text-slate-500">{t("recommendedPower")}</p>
                  <p className="mt-1 text-2xl font-extrabold text-navy-950">8.5 kWp</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs font-medium text-slate-500">{t("monthlySavings")}</p>
                    <p className="mt-1 text-lg font-bold text-emerald-600">{t("exampleSavings")}</p>
                  </div>
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs font-medium text-slate-500">{t("payback")}</p>
                    <p className="mt-1 text-lg font-bold text-navy-950">{t("examplePayback")}</p>
                  </div>
                </div>
                <p className="text-center text-xs text-brand-100">{t("disclaimer")}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
