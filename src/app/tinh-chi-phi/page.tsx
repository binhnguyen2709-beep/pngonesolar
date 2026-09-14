import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";

export const metadata: Metadata = {
  title: "Tính chi phí lắp đặt điện mặt trời",
  description:
    "Ước tính công suất hệ thống, chi phí đầu tư và thời gian hoàn vốn khi lắp đặt điện năng lượng mặt trời áp mái dựa trên mức tiêu thụ điện hàng tháng của bạn.",
};

export default function CalculatorPage() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Công cụ tính toán"
          title="Ước tính chi phí lắp đặt điện mặt trời áp mái"
          description="Chỉ mất 1 phút để biết công suất phù hợp và chi phí đầu tư dự kiến cho gia đình hoặc doanh nghiệp của bạn. Kết quả chi tiết sẽ hiển thị ngay sau khi bạn để lại thông tin liên hệ."
          align="center"
        />

        <div className="mt-12">
          <CalculatorForm />
        </div>
      </Container>
    </section>
  );
}
