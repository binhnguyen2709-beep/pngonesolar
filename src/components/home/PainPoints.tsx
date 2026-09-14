import { useTranslations } from "next-intl";
import { AlertTriangle, Flame, TrendingUp, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [TrendingUp, Zap, AlertTriangle, Flame];

export function PainPoints() {
  const t = useTranslations("home.painPoints");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((point, i) => {
            const Icon = icons[i];
            return (
              <div
                key={point.title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy-950">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl bg-navy-950 p-8 text-center sm:p-10">
          <p className="text-balance text-xl font-bold text-white sm:text-2xl">
            {t("bannerPrefix")} <span className="text-sun-400">{t("bannerHighlight")}</span>, {t("bannerSuffix")}
          </p>
        </div>
      </Container>
    </section>
  );
}
