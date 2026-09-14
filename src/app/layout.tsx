import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { siteConfig } from "@/lib/site-config";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pngonesolar.vn"),
  title: {
    default: `${siteConfig.name} - Thi công điện năng lượng mặt trời áp mái`,
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
    title: `${siteConfig.name} - Thi công điện năng lượng mặt trời áp mái`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${beVietnam.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[15px] text-navy-950">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
