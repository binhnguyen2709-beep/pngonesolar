import { useLocale, useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import type { Locale } from "@/i18n/routing";

export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const locale = useLocale() as Locale;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => {
            const tr = testimonial.i18n[locale] ?? testimonial.i18n.vi;
            return (
              <div key={testimonial.slug} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex gap-0.5 text-sun-500">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">&ldquo;{tr.quote}&rdquo;</p>
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <p className="text-sm font-bold text-navy-950">{tr.name}</p>
                  <p className="text-xs text-slate-500">
                    {tr.role} - {tr.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
