import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export function StatsBar() {
  return (
    <section className="border-y border-slate-100 bg-white py-10">
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-brand-600 sm:text-4xl">{stat.value}+</p>
              <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
