import { useTranslations } from "next-intl";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#0A5CF0" />
      <path d="M20 6L11 21H18L15.5 34L29 17H21.5L20 6Z" fill="#FFB648" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  const t = useTranslations("brand");

  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="flex flex-col leading-tight">
        <span className={`text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-navy-950"}`}>
          PNG ONE <span className="text-brand-500">SOLAR</span>
        </span>
        <span className={`text-[11px] font-medium tracking-wide ${light ? "text-slate-300" : "text-slate-500"}`}>
          {t("slogan")}
        </span>
      </span>
    </span>
  );
}
