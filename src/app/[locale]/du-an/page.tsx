import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { CtaBanner } from "@/components/shared/CtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projects");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ProjectsPage() {
  const t = await getTranslations("projects");

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <SectionHeading eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} light />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <ProjectGallery />
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
