import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: `Liên hệ ${siteConfig.name} để được khảo sát và tư vấn miễn phí giải pháp điện năng lượng mặt trời áp mái.`,
};

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapEmbedQuery)}&output=embed`;

  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Liên hệ"
          title="Sẵn sàng tư vấn giải pháp phù hợp với bạn"
          description="Để lại thông tin qua form bên dưới hoặc liên hệ trực tiếp qua hotline / Zalo, đội ngũ PNG ONE SOLAR luôn sẵn sàng hỗ trợ."
        />

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
                    <p className="text-sm font-semibold text-navy-950">Địa chỉ văn phòng</p>
                    <p className="mt-1 text-sm text-slate-600">{siteConfig.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-950">Hotline</p>
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
                    <p className="text-sm font-semibold text-navy-950">Email</p>
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
                    <p className="text-sm font-semibold text-navy-950">Giờ làm việc</p>
                    <p className="mt-1 text-sm text-slate-600">{siteConfig.workingHours}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
              <iframe
                title="Bản đồ văn phòng PNG ONE SOLAR"
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
