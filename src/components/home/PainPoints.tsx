import { AlertTriangle, Flame, TrendingUp, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const painPoints = [
  {
    icon: TrendingUp,
    title: "Hóa đơn tiền điện tăng vọt mỗi mùa nắng nóng",
    description:
      "Giá điện sinh hoạt tính theo bậc thang - dùng càng nhiều, giá mỗi kWh càng đắt. Bật điều hòa cả ngày hè, hóa đơn có thể tăng gấp 2-3 lần so với ngày thường.",
  },
  {
    icon: Zap,
    title: "Cúp điện, sụt áp làm gián đoạn sinh hoạt và sản xuất",
    description:
      "Mất điện đột ngột khiến hàng hóa trong kho lạnh hư hỏng, dây chuyền sản xuất ngưng trệ, gây thiệt hại tiền bạc không đáng có.",
  },
  {
    icon: AlertTriangle,
    title: "Lo ngại đơn vị thi công thiếu uy tín",
    description:
      "Thi công ẩu gây thấm dột mái, thiết bị trôi nổi không rõ nguồn gốc, cam kết bảo hành mập mờ khiến nhiều gia đình, doanh nghiệp e ngại đầu tư.",
  },
  {
    icon: Flame,
    title: "Mái tôn hấp nhiệt, không gian sống oi bức",
    description:
      "Mái nhà, nhà xưởng hấp thụ nhiệt lớn vào ban ngày khiến không gian bên dưới nóng bức, tốn thêm chi phí làm mát.",
  },
];

export function PainPoints() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Vấn đề bạn đang gặp phải"
          title="Những nỗi lo quen thuộc với hóa đơn tiền điện mỗi tháng"
          description="Nếu bạn đang gặp một trong những vấn đề dưới đây, đã đến lúc chủ động nguồn điện cho gia đình và doanh nghiệp của mình."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <point.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy-950">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-navy-950 p-8 text-center sm:p-10">
          <p className="text-balance text-xl font-bold text-white sm:text-2xl">
            PNG ONE SOLAR giúp bạn <span className="text-sun-400">chủ động nguồn điện</span>, biến chi phí điện hàng
            tháng thành khoản đầu tư sinh lời.
          </p>
        </div>
      </Container>
    </section>
  );
}
