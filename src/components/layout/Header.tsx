"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/gioi-thieu", label: t("about") },
    { href: "/san-pham", label: t("products") },
    { href: "/du-an", label: t("projects") },
    { href: "/tinh-chi-phi", label: t("calculator") },
    { href: "/kien-thuc", label: t("knowledge") },
    { href: "/lien-he", label: t("contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" aria-label={siteConfig.name}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50 hover:text-navy-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <a
            href={`tel:${siteConfig.hotlineRaw}`}
            className="flex items-center gap-2 text-sm font-semibold text-navy-950"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Phone className="h-4 w-4" />
            </span>
            {siteConfig.hotline}
          </a>
          <Link
            href="/tinh-chi-phi"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700"
          >
            {t("getQuote")}
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-navy-950"
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-3 text-base font-medium ${
                  pathname === link.href ? "bg-brand-50 text-brand-700" : "text-slate-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={`tel:${siteConfig.hotlineRaw}`}
              className="flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-navy-950"
            >
              <Phone className="h-4 w-4" /> {siteConfig.hotline}
            </a>
            <Link
              href="/tinh-chi-phi"
              className="flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white"
            >
              {t("getQuote")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
