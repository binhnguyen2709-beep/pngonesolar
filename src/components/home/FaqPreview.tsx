import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { getLocalizedFaqGroups } from "@/data/faqs";
import type { Locale } from "@/i18n/routing";

export function FaqPreview() {
  const t = useTranslations("home.faqPreview");
  const locale = useLocale() as Locale;
  const items = getLocalizedFaqGroups(locale)
    .flatMap((g) => g.items)
    .slice(0, 5);

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
            <Link
              href="/kien-thuc"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              {t("viewMore")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-2">
            <FaqAccordion items={items} />
          </div>
        </div>
      </Container>
    </section>
  );
}
