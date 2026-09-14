import { BadgeDollarSign, Home, Leaf, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: BadgeDollarSign,
    title: "Tiết kiệm chi phí điện rõ rệt",
    description:
      "Giảm đến 80-90% hóa đơn tiền điện hàng tháng, hoàn vốn đầu tư chỉ sau 4-6 năm trong khi hệ thống vận hành hơn 25 năm.",
  },
  {
    icon: ShieldCheck,
    title: "Chủ động nguồn điện, an tâm vận hành",
    description:
      "Kết hợp pin lưu trữ giúp duy trì điện cho các thiết bị thiết yếu ngay cả khi lưới điện gặp sự cố hoặc cúp điện luân phiên.",
  },
  {
    icon: Home,
    title: "Tăng giá trị bất động sản",
    description:
      "Nhà, xưởng có hệ thống điện mặt trời được đánh giá cao hơn khi mua bán, cho thuê nhờ chi phí vận hành thấp và hình ảnh hiện đại.",
  },
  {
    icon: Leaf,
    title: "Góp phần bảo vệ môi trường",
    description:
      "Sử dụng năng lượng sạch, giảm phát thải CO2, đồng thời đáp ứng các tiêu chuẩn ESG ngày càng được đối tác, khách hàng quốc tế coi trọng.",
  },
];

export function WhySolar() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Vì sao nên đầu tư ngay"
          title="Điện mặt trời áp mái - khoản đầu tư sinh lời, không phải chi phí"
          description="Đây không đơn thuần là xu hướng, mà là giải pháp tài chính thông minh giúp bạn kiểm soát chi phí điện trong dài hạn."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex flex-col items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
                <reason.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy-950">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
