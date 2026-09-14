import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Award, HeartHandshake, Target, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

const valueIcons = [Target, Award, HeartHandshake, Users];

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tStats = await getTranslations("stats");
  const values = t.raw("values.items") as { title: string; description: string }[];
  const milestones = t.raw("milestones.items") as { year: string; event: string }[];

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <SectionHeading eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} light />
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                {t("story.eyebrow")}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-navy-950">{t("story.title")}</h2>
              <p className="mt-4 leading-relaxed text-slate-600">{t("story.p1")}</p>
              <p className="mt-4 leading-relaxed text-slate-600">{t("story.p2")}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {siteConfig.stats.map((s) => (
                <div key={s.key} className="rounded-2xl bg-slate-50 p-6 text-center">
                  <p className="text-3xl font-extrabold text-brand-600">{s.value}+</p>
                  <p className="mt-1 text-sm font-medium text-slate-600">{tStats(s.key)}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t("values.eyebrow")} title={t("values.title")} align="center" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <div key={v.title} className="rounded-2xl bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-navy-950">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t("milestones.eyebrow")} title={t("milestones.title")} align="center" />
          <div className="mx-auto mt-14 max-w-3xl">
            <ol className="relative border-l border-slate-200 pl-8">
              {milestones.map((m) => (
                <li key={m.year} className="mb-10 last:mb-0">
                  <div className="absolute -ml-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {m.year.slice(2)}
                  </div>
                  <p className="text-sm font-bold text-brand-600">{m.year}</p>
                  <p className="mt-1 text-base text-slate-700">{m.event}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t("partners.eyebrow")} title={t("partners.title")} description={t("partners.description")} />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="relative overflow-hidden rounded-3xl lg:col-span-3">
              <div className="relative h-72 w-full sm:h-96">
                <Image
                  src="/partners/austa-factory.jpg"
                  alt={t("partners.austaName")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <p className="text-lg font-bold text-white">{t("partners.austaName")}</p>
                <p className="mt-1 max-w-md text-sm text-slate-200">{t("partners.austaDesc")}</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-2">
              <div className="relative flex-1 overflow-hidden rounded-3xl">
                <Image
                  src="/partners/felicity-campus.jpg"
                  alt={t("partners.felicityName")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-base font-bold text-white">{t("partners.felicityName")}</p>
                  <p className="mt-0.5 text-xs text-slate-200">{t("partners.felicityDesc")}</p>
                </div>
              </div>
              <div className="relative h-28 overflow-hidden rounded-3xl sm:h-32">
                <Image
                  src="/partners/felicity-office.jpg"
                  alt={t("partners.felicityName")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">{t("partners.disclaimer")}</p>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
