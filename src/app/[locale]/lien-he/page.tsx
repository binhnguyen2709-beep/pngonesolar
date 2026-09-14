import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapEmbedQuery)}&output=embed`;

  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-950">{t("info.address")}</p>
                    <p className="mt-1 text-sm text-slate-600">{siteConfig.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-950">{t("info.hotline")}</p>
                    <a href={`tel:${siteConfig.hotlineRaw}`} className="mt-1 block text-sm text-brand-600 hover:underline">
                      {siteConfig.hotline}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-950">{t("info.email")}</p>
                    <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-sm text-brand-600 hover:underline">
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-950">{t("info.workingHours")}</p>
                    <p className="mt-1 text-sm text-slate-600">{siteConfig.workingHours}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
              <iframe
                title={siteConfig.name}
                src={mapSrc}
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
