import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export function ProjectsPreview() {
  const t = useTranslations("home.projectsPreview");
  const featured = projects.slice(0, 3);

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          <Link
            href="/du-an"
            className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            {t("viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
