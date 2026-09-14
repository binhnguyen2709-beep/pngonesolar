import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessSteps() {
  const t = useTranslations("home.process");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((item, i) => (
            <div key={item.title} className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <span className="text-4xl font-extrabold text-brand-100">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-bold text-navy-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
