import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { siteConfig } from "@/lib/site-config";
import { routing, type Locale } from "@/i18n/routing";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const htmlLangByLocale: Record<Locale, string> = { vi: "vi", en: "en", zh: "zh-CN" };
const ogLocaleByLocale: Record<Locale, string> = { vi: "vi_VN", en: "en_US", zh: "zh_CN" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: "brand" });
  const fullTitle = `${siteConfig.name} - ${t("defaultTitle")}`;

  return {
    metadataBase: new URL("https://pngonesolar.vn"),
    title: {
      default: fullTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      "điện năng lượng mặt trời áp mái",
      "lắp đặt điện mặt trời",
      "pin năng lượng mặt trời",
      "solar rooftop",
      "PNG ONE SOLAR",
    ],
    openGraph: {
      title: fullTitle,
      description: siteConfig.description,
      siteName: siteConfig.name,
      locale: ogLocaleByLocale[locale],
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={htmlLangByLocale[locale as Locale]} className={`${beVietnam.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[15px] text-navy-950">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
