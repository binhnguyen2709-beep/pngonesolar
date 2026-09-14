import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { BookOpen, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { getLocalizedArticles } from "@/data/articles";
import { getLocalizedFaqGroups } from "@/data/faqs";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("knowledge");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function KnowledgePage() {
  const t = await getTranslations("knowledge");
  const locale = (await getLocale()) as Locale;
  const articles = getLocalizedArticles(locale);
  const faqGroups = getLocalizedFaqGroups(locale);
  const warrantyRows = t.raw("warranty.table.rows") as { item: string; product: string; performance: string }[];

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <SectionHeading eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} light />
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t("articles.eyebrow")} title={t("articles.title")} />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {articles.map((a) => (
              <div key={a.slug} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  <BookOpen className="h-3 w-3" /> {a.category}
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy-950">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{a.excerpt}</p>
                <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Clock className="h-3.5 w-3.5" /> {a.readTime}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t("warranty.eyebrow")} title={t("warranty.title")} />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-100 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-4">{t("warranty.table.item")}</th>
                  <th className="px-6 py-4">{t("warranty.table.productWarranty")}</th>
                  <th className="px-6 py-4">{t("warranty.table.performanceWarranty")}</th>
                </tr>
              </thead>
              <tbody>
                {warrantyRows.map((row) => (
                  <tr key={row.item} className="border-b border-slate-50 last:border-0">
                    <td className="px-6 py-4 font-semibold text-navy-950">{row.item}</td>
                    <td className="px-6 py-4 text-slate-600">{row.product}</td>
                    <td className="px-6 py-4 text-slate-600">{row.performance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t("faq.eyebrow")} title={t("faq.title")} align="center" />
          <div className="mx-auto mt-10 max-w-3xl space-y-10">
            {faqGroups.map((group) => (
              <div key={group.group}>
                <h3 className="text-sm font-bold uppercase tracking-wide text-brand-600">{group.group}</h3>
                <div className="mt-4">
                  <FaqAccordion items={group.items} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
