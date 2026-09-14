import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { faqGroups } from "@/data/faqs";

export function FaqPreview() {
  const items = faqGroups.flatMap((g) => g.items).slice(0, 5);

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div>
            <SectionHeading
              eyebrow="Giải đáp thắc mắc"
              title="Câu hỏi thường gặp"
              description="Những băn khoăn phổ biến nhất trước khi quyết định lắp đặt điện mặt trời áp mái."
            />
            <Link
              href="/kien-thuc"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Xem thêm kiến thức hữu ích <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-2">
            <FaqAccordion items={items} />
          </div>
        </div>
      </Container>
    </section>
  );
}
