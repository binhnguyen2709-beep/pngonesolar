import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scenarios } from "@/data/scenarios";

export function ScenariosSection() {
  const t = useTranslations("home.scenarios");

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} align="center" />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {scenarios.map((s) => (
            <div key={s.slug} className="group relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={s.image}
                alt={t(`items.${s.slug}`)}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white">{t(`items.${s.slug}`)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
