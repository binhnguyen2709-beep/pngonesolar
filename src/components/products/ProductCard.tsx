import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import type { Product } from "@/data/products";
import { formatVnd } from "@/lib/calculator";

function getDisplayPrice(product: Product): string | null {
  if (product.category === "panel" && product.wattPeak && product.pricePerWatt) {
    return `${formatVnd(Math.round(product.wattPeak * product.pricePerWatt))} / tấm`;
  }
  if (product.price) {
    return formatVnd(product.price);
  }
  return null;
}

export function ProductCard({ product }: { product: Product }) {
  const displayPrice = getDisplayPrice(product);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-brand-50 to-slate-50">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-contain p-4"
          />
        ) : (
          <svg viewBox="0 0 120 80" className="h-20 w-32" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="14" width="108" height="52" rx="6" fill="#0A5CF0" opacity="0.12" />
            {product.category === "panel" &&
              [0, 1, 2].map((c) =>
                [0, 1].map((r) => (
                  <rect key={`${c}-${r}`} x={16 + c * 34} y={22 + r * 24} width="28" height="18" rx="2" fill="#0A5CF0" opacity={0.9 - r * 0.15} />
                ))
              )}
            {product.category === "inverter" && (
              <>
                <rect x="35" y="18" width="50" height="44" rx="6" fill="#0A5CF0" />
                <rect x="42" y="26" width="36" height="14" rx="2" fill="#FFB648" />
                <circle cx="48" cy="50" r="3" fill="white" />
                <circle cx="60" cy="50" r="3" fill="white" />
                <circle cx="72" cy="50" r="3" fill="white" />
              </>
            )}
            {product.category === "battery" && (
              <>
                <rect x="30" y="20" width="60" height="40" rx="6" fill="#0A5CF0" />
                <rect x="88" y="32" width="6" height="16" rx="2" fill="#0A5CF0" />
                <rect x="38" y="28" width="10" height="24" rx="2" fill="#FFB648" />
                <rect x="52" y="28" width="10" height="24" rx="2" fill="#FFB648" opacity="0.7" />
                <rect x="66" y="28" width="10" height="24" rx="2" fill="#FFB648" opacity="0.4" />
              </>
            )}
            {product.category === "accessory" && (
              <>
                <rect x="20" y="36" width="80" height="8" rx="4" fill="#0A5CF0" />
                <circle cx="30" cy="40" r="7" fill="#0A5CF0" opacity="0.5" />
                <circle cx="60" cy="40" r="7" fill="#0A5CF0" opacity="0.5" />
                <circle cx="90" cy="40" r="7" fill="#0A5CF0" opacity="0.5" />
              </>
            )}
          </svg>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">{product.brand}</span>
          {displayPrice && (
            <span className="whitespace-nowrap rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
              {displayPrice}
            </span>
          )}
        </div>
        <h3 className="mt-1 text-lg font-bold text-navy-950">{product.name}</h3>
        <p className="mt-1 text-sm font-medium text-slate-500">{product.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.description}</p>

        <ul className="mt-4 space-y-2">
          {product.specs.slice(0, 4).map((spec) => (
            <li key={spec.label} className="flex items-center justify-between text-sm">
              <span className="text-slate-500">{spec.label}</span>
              <span className="font-semibold text-navy-950">{spec.value}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          {product.highlights.map((h) => (
            <span key={h} className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-3 w-3" /> {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
