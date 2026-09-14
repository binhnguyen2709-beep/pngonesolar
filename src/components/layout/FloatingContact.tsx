"use client";

import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={siteConfig.socials.zalo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-500 text-white shadow-xl shadow-blue-500/30 transition-transform hover:scale-105"
        style={{ height: 52, width: 52 }}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={`tel:${siteConfig.hotlineRaw}`}
        aria-label={`Gọi ${siteConfig.hotline}`}
        className="flex items-center justify-center rounded-full bg-sun-500 text-navy-950 shadow-xl shadow-sun-500/30 transition-transform hover:scale-105 animate-pulse"
        style={{ height: 52, width: 52 }}
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
