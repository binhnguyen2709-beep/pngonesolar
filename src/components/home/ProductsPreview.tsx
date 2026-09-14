import Link from "next/link";
import { ArrowRight, BatteryCharging, Cable, PanelTop, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productCategories, type ProductCategory } from "@/data/products";

const icons: Record<ProductCategory, typeof PanelTop> = {
  panel: PanelTop,
  inverter: Zap,
  battery: BatteryCharging,
  accessory: Cable,
};

export function ProductsPreview() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Thiết bị chính hãng"
            title="Hệ sinh thái thiết bị điện mặt trời đồng bộ"
            description="Tấm pin, biến tần, pin lưu trữ và phụ kiện được lựa chọn kỹ lưỡng, đạt chuẩn quốc tế IEC, đảm bảo hiệu suất và độ bền lâu dài."
          />
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Xem tất cả sản phẩm <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((cat) => {
            const Icon = icons[cat.key];
            return (
              <Link
                key={cat.key}
                href={`/san-pham#${cat.key}`}
                className="group flex flex-col rounded-2xl border border-slate-100 p-6 transition-all hover:-translate-y-1 hover:border-brand-100 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-navy-950">{cat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{cat.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  Xem chi tiết <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
