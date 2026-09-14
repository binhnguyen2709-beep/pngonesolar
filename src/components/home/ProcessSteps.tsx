import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

export function ProcessSteps() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Quy trình làm việc"
          title="Minh bạch từng bước - từ khảo sát đến bàn giao"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((item) => (
            <div key={item.step} className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <span className="text-4xl font-extrabold text-brand-100">{item.step}</span>
              <h3 className="mt-3 text-lg font-bold text-navy-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
