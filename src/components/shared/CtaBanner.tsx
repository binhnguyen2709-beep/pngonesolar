import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export function CtaBanner() {
  const t = useTranslations("ctaBanner");

  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-balance text-2xl font-bold text-white sm:text-3xl">{t("title")}</h2>
          <p className="max-w-xl text-sm text-slate-300 sm:text-base">{t("description")}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <LinkButton href="/tinh-chi-phi" variant="secondary" size="lg">
              {t("cta")}
            </LinkButton>
            <a
              href={`tel:${siteConfig.hotlineRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-5 w-5" /> {siteConfig.hotline}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
