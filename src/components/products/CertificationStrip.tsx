import Image from "next/image";
import { certifications } from "@/data/certifications";

export function CertificationStrip() {
  return (
    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8 sm:p-10">
      <p className="text-center text-sm font-semibold text-slate-500">
        Thiết bị đạt các chứng nhận quốc tế từ nhà sản xuất
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {certifications.map((cert) => (
          <div key={cert.slug} className="relative h-10 w-20 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <Image src={cert.image} alt={cert.name} fill className="object-contain" sizes="80px" />
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-slate-400">
        *Chứng nhận áp dụng cho dòng thiết bị (biến tần, pin lưu trữ) từ nhà sản xuất, không phải chứng nhận riêng của PNG ONE SOLAR.
      </p>
    </div>
  );
}
