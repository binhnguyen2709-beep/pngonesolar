"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/routing";

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
          light ? "text-white hover:bg-white/10" : "text-slate-600 hover:bg-slate-50"
        }`}
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" />
        <span>{localeLabels[locale].flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-100 bg-white py-1.5 shadow-xl">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchTo(l)}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                l === locale ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{localeLabels[l].flag}</span>
              {localeLabels[l].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
