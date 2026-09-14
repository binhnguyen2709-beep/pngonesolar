import { MapPin, Zap } from "lucide-react";
import { projectCategoryLabels, type Project } from "@/data/projects";

const gradients: Record<string, string> = {
  "ho-gia-dinh": "from-brand-500 to-brand-800",
  "nha-xuong": "from-slate-600 to-navy-900",
  "doanh-nghiep": "from-brand-700 to-navy-950",
  "trang-trai": "from-emerald-500 to-brand-800",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${gradients[project.category]}`}>
        <svg viewBox="0 0 200 120" className="h-24 w-40 opacity-90" xmlns="http://www.w3.org/2000/svg">
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={10 + i * 38} y="30" width="30" height="60" rx="3" fill="white" opacity={0.85 - i * 0.08} />
          ))}
        </svg>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy-950">
          {project.systemType}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-navy-950/70 px-3 py-1 text-xs font-semibold text-white">
          {project.completedYear}
        </span>
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {projectCategoryLabels[project.category]}
        </span>
        <h3 className="mt-2 text-lg font-bold text-navy-950">{project.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5" /> {project.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{project.summary}</p>

        <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-navy-950">
          <Zap className="h-4 w-4 text-sun-500" /> Công suất {project.capacityKwp} kWp
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.results.map((r) => (
            <li key={r} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
