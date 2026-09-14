"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projectCategoryLabelKeys, projects, type ProjectCategory } from "@/data/projects";

const categoryOrder = Object.keys(projectCategoryLabelKeys) as ProjectCategory[];

export function ProjectGallery() {
  const t = useTranslations("projects");
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  const filters: { key: ProjectCategory | "all"; label: string }[] = [
    { key: "all", label: t("filterAll") },
    ...categoryOrder.map((key) => ({ key, label: t(`categories.${projectCategoryLabelKeys[key]}`) })),
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === f.key ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
