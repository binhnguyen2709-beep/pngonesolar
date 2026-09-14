import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site-config";
import type { ProductCategory } from "@/data/products";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

const categoryKeys: ProductCategory[] = ["panel", "inverter", "battery", "accessory"];

export function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tCat = useTranslations("products.categories");

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/gioi-thieu", label: t("about") },
    { href: "/san-pham", label: t("products") },
    { href: "/du-an", label: t("projects") },
    { href: "/tinh-chi-phi", label: t("calculator") },
    { href: "/kien-thuc", label: t("knowledge") },
    { href: "/lien-he", label: t("contact") },
  ];

  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{siteConfig.description}</p>
            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-colors hover:bg-brand-600 hover:text-white"
              >
                <FacebookIcon />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Youtube"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-colors hover:bg-brand-600 hover:text-white"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{tFooter("quickLinks")}</h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{tFooter("products")}</h3>
            <ul className="mt-4 space-y-3">
              {categoryKeys.map((key) => (
                <li key={key}>
                  <Link href={`/san-pham#${key}`} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {tCat(`${key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{tFooter("contactInfo")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-brand-400" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-none text-brand-400" />
                <a href={`tel:${siteConfig.hotlineRaw}`} className="hover:text-white">
                  {siteConfig.hotline}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-none text-brand-400" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-slate-500">{siteConfig.workingHours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.fullName}. {tFooter("taxCode")}: {siteConfig.taxCode}.
          </p>
          <p>{tFooter("designedBy")}</p>
        </div>
      </div>
    </footer>
  );
}
