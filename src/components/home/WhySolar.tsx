import { useTranslations } from "next-intl";
import { BadgeDollarSign, Home, Leaf, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [BadgeDollarSign, ShieldCheck, Home, Leaf];

export function WhySolar() {
  const t = useTranslations("home.whySolar");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((reason, i) => {
            const Icon = icons[i];
            return (
              <div key={reason.title} className="flex flex-col items-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy-950">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
