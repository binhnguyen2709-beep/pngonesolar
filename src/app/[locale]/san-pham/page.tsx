import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BatteryCharging, Cable, PanelTop, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { CertificationStrip } from "@/components/products/CertificationStrip";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { getProductsByCategory, productCategories, type ProductCategory } from "@/data/products";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("products");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

const icons: Record<ProductCategory, typeof PanelTop> = {
  panel: PanelTop,
  inverter: Zap,
  battery: BatteryCharging,
  accessory: Cable,
};

export default async function ProductsPage() {
  const t = await getTranslations("products");
  const tCat = await getTranslations("products.categories");

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <SectionHeading eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} light />

          <div className="mt-8 flex flex-wrap gap-3">
            {productCategories.map((cat) => (
              <a
                key={cat.key}
                href={`#${cat.key}`}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15"
              >
                {tCat(`${cat.key}.title`)}
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400">{t("hero.priceNote")}</p>
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
                  <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl">{tCat(`${cat.key}.title`)}</h2>
                  <p className="mt-1 max-w-2xl text-sm text-slate-600 sm:text-base">{tCat(`${cat.key}.description`)}</p>
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
