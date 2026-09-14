import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("calculator");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function CalculatorPage() {
  const t = await getTranslations("calculator");

  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          description={t("hero.description")}
          align="center"
        />

        <div className="mt-12">
          <CalculatorForm />
        </div>
      </Container>
    </section>
  );
}
