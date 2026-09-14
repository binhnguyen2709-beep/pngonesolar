import type { Metadata } from "next";
import { BatteryCharging, Cable, PanelTop, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { CertificationStrip } from "@/components/products/CertificationStrip";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { getProductsByCategory, productCategories, type ProductCategory } from "@/data/products";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description:
    "Tấm pin năng lượng mặt trời, biến tần (inverter), pin lưu trữ và phụ kiện chính hãng, đạt chuẩn quốc tế IEC.",
};

const icons: Record<ProductCategory, typeof PanelTop> = {
  panel: PanelTop,
  inverter: Zap,
  battery: BatteryCharging,
  accessory: Cable,
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Sản phẩm & thiết bị"
            title="Thiết bị đồng bộ, chính hãng - hiệu suất tối ưu, bền bỉ theo thời gian"
            description={`${siteConfig.name} chỉ lựa chọn thiết bị từ các nhà sản xuất đạt chứng nhận quốc tế IEC 61215/61730, đảm bảo hiệu suất cam kết trong suốt vòng đời sử dụng.`}
            light
          />

          <div className="mt-8 flex flex-wrap gap-3">
            {productCategories.map((cat) => (
              <a
                key={cat.key}
                href={`#${cat.key}`}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15"
              >
                {cat.title}
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400">
            *Giá niêm yết đã bao gồm VAT, chưa bao gồm công lắp đặt. Giá có thể thay đổi theo thời điểm, vui lòng
            liên hệ để được báo giá chính xác nhất.
          </p>
        </Container>
      </section>

      {productCategories.map((cat, idx) => {
        const Icon = icons[cat.key];
        const items = getProductsByCategory(cat.key);
        return (
          <section key={cat.key} id={cat.key} className={`py-20 sm:py-24 ${idx % 2 === 1 ? "bg-slate-50" : ""}`}>
            <Container>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-brand-600 text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl">{cat.title}</h2>
                  <p className="mt-1 max-w-2xl text-sm text-slate-600 sm:text-base">{cat.description}</p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="py-16">
        <Container>
          <CertificationStrip />
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
