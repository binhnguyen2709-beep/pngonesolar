import type { Metadata } from "next";
import { BookOpen, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { articles } from "@/data/articles";
import { faqGroups } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Kiến thức hữu ích",
  description:
    "Tổng hợp kiến thức về điện năng lượng mặt trời áp mái: hướng dẫn vận hành, bảo trì, chính sách bảo hành và giải đáp các câu hỏi thường gặp.",
};

const warrantyTable = [
  { item: "Tấm pin năng lượng mặt trời", product: "12 - 18 năm", performance: "25 - 30 năm" },
  { item: "Biến tần (Inverter)", product: "10 năm (có thể nâng cấp)", performance: "-" },
  { item: "Pin lưu trữ (Battery)", product: "10 năm", performance: "≥ 6.000 chu kỳ sạc/xả" },
  { item: "Khung giá đỡ & phụ kiện", product: "12 năm", performance: "-" },
  { item: "Công lắp đặt (PNG ONE SOLAR)", product: "5 năm", performance: "-" },
];

export default function KnowledgePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Kiến thức hữu ích"
            title="Cẩm nang điện năng lượng mặt trời áp mái"
            description="Những kiến thức thực tế giúp bạn hiểu rõ hơn về vận hành, bảo trì và quyền lợi bảo hành trước và sau khi lắp đặt hệ thống."
            light
          />
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Bài viết nổi bật" title="Kinh nghiệm sử dụng điện mặt trời hiệu quả" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {articles.map((a) => (
              <div key={a.slug} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  <BookOpen className="h-3 w-3" /> {a.category}
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy-950">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{a.excerpt}</p>
                <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Clock className="h-3.5 w-3.5" /> {a.readTime}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Chính sách bảo hành" title="Cam kết bảo hành rõ ràng cho từng hạng mục" />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-100 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-4">Hạng mục</th>
                  <th className="px-6 py-4">Bảo hành sản phẩm</th>
                  <th className="px-6 py-4">Bảo hành hiệu suất</th>
                </tr>
              </thead>
              <tbody>
                {warrantyTable.map((row) => (
                  <tr key={row.item} className="border-b border-slate-50 last:border-0">
                    <td className="px-6 py-4 font-semibold text-navy-950">{row.item}</td>
                    <td className="px-6 py-4 text-slate-600">{row.product}</td>
                    <td className="px-6 py-4 text-slate-600">{row.performance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Giải đáp thắc mắc" title="Câu hỏi thường gặp" align="center" />
          <div className="mx-auto mt-10 max-w-3xl space-y-10">
            {faqGroups.map((group) => (
              <div key={group.group}>
                <h3 className="text-sm font-bold uppercase tracking-wide text-brand-600">{group.group}</h3>
                <div className="mt-4">
                  <FaqAccordion items={group.items} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
