import type { Metadata } from "next";
import Image from "next/image";
import { Award, HeartHandshake, Target, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: `Tìm hiểu về ${siteConfig.name} - đơn vị thi công điện năng lượng mặt trời áp mái uy tín với đội ngũ kỹ sư giàu kinh nghiệm.`,
};

const values = [
  {
    icon: Target,
    title: "Minh bạch",
    description: "Báo giá rõ ràng, không phát sinh chi phí ẩn, hợp đồng chi tiết từng hạng mục.",
  },
  {
    icon: Award,
    title: "Chất lượng",
    description: "Chỉ sử dụng thiết bị đạt chuẩn quốc tế IEC, có nguồn gốc xuất xứ rõ ràng.",
  },
  {
    icon: HeartHandshake,
    title: "Tận tâm",
    description: "Đồng hành cùng khách hàng từ tư vấn, thi công đến bảo hành trong suốt vòng đời hệ thống.",
  },
  {
    icon: Users,
    title: "Chuyên nghiệp",
    description: "Đội ngũ kỹ sư được đào tạo bài bản, giàu kinh nghiệm thi công trên mọi loại mái.",
  },
];

const milestones = [
  { year: "2017", event: "Thành lập, thi công dự án điện mặt trời áp mái đầu tiên tại TP.HCM" },
  { year: "2019", event: "Mở rộng thị trường ra khu vực Đông Nam Bộ và Tây Nam Bộ" },
  { year: "2021", event: "Vượt mốc 500 dự án hộ gia đình và doanh nghiệp được bàn giao" },
  { year: "2023", event: "Ra mắt trung tâm giám sát vận hành hệ thống từ xa 24/7" },
  { year: "2025", event: "Vượt mốc 1.250 dự án, hiện diện tại hơn 32 tỉnh thành" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Về chúng tôi"
            title={`${siteConfig.name} - Đối tác tin cậy cho hành trình chuyển đổi năng lượng sạch`}
            description="Chúng tôi tin rằng mỗi mái nhà, mái xưởng đều có thể trở thành một nhà máy điện thu nhỏ - giúp khách hàng chủ động chi phí và nguồn điện trong dài hạn."
            light
          />
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                Câu chuyện của chúng tôi
              </span>
              <h2 className="mt-4 text-3xl font-bold text-navy-950">Từ đội kỹ thuật nhỏ đến đơn vị EPC hàng đầu</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                {siteConfig.name} được thành lập bởi đội ngũ kỹ sư điện - điện tử nhiều năm kinh nghiệm trong lĩnh
                vực năng lượng tái tạo. Xuất phát từ mong muốn giúp các hộ gia đình Việt Nam giảm gánh nặng chi
                phí điện sinh hoạt, chúng tôi đã không ngừng mở rộng năng lực thi công để phục vụ cả các dự án
                công nghiệp quy mô lớn.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                Đến nay, PNG ONE SOLAR tự hào là đối tác được hàng nghìn khách hàng tin tưởng lựa chọn nhờ quy
                trình làm việc minh bạch, đội ngũ thi công chuyên nghiệp và chính sách bảo hành rõ ràng, dài hạn.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {siteConfig.stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-slate-50 p-6 text-center">
                  <p className="text-3xl font-extrabold text-brand-600">{s.value}+</p>
                  <p className="mt-1 text-sm font-medium text-slate-600">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Giá trị cốt lõi" title="Điều làm nên sự khác biệt của PNG ONE SOLAR" align="center" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy-950">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Hành trình phát triển" title="Các cột mốc đáng nhớ" align="center" />
          <div className="mx-auto mt-14 max-w-3xl">
            <ol className="relative border-l border-slate-200 pl-8">
              {milestones.map((m) => (
                <li key={m.year} className="mb-10 last:mb-0">
                  <div className="absolute -ml-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {m.year.slice(2)}
                  </div>
                  <p className="text-sm font-bold text-brand-600">{m.year}</p>
                  <p className="mt-1 text-base text-slate-700">{m.event}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Hậu thuẫn vững chắc"
            title="Đối tác sản xuất thiết bị hàng đầu thế giới"
            description="PNG ONE SOLAR trực tiếp nhập khẩu và phân phối thiết bị từ các nhà sản xuất năng lượng tái tạo uy tín toàn cầu - không phải cơ sở của PNG ONE SOLAR, đây là nơi sản xuất ra biến tần và pin lưu trữ chúng tôi đang cung cấp."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="relative overflow-hidden rounded-3xl lg:col-span-3">
              <div className="relative h-72 w-full sm:h-96">
                <Image
                  src="/partners/austa-factory.jpg"
                  alt="Nhà máy sản xuất AUSTA / OSDA Group"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <p className="text-lg font-bold text-white">AUSTA - OSDA Group</p>
                <p className="mt-1 max-w-md text-sm text-slate-200">
                  Nhà máy sản xuất biến tần &amp; pin lưu trữ tại Trung Quốc, công suất PV lên đến 12GW, hiện diện tại
                  150+ quốc gia.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-2">
              <div className="relative flex-1 overflow-hidden rounded-3xl">
                <Image
                  src="/partners/felicity-campus.jpg"
                  alt="Khuôn viên nhà máy Felicity Solar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-base font-bold text-white">Felicity Solar</p>
                  <p className="mt-0.5 text-xs text-slate-200">Guangzhou, Trung Quốc - 85.000m², 2.000+ nhân sự</p>
                </div>
              </div>
              <div className="relative h-28 overflow-hidden rounded-3xl sm:h-32">
                <Image
                  src="/partners/felicity-office.jpg"
                  alt="Văn phòng Felicity Solar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            *Hình ảnh do đối tác sản xuất cung cấp trong tài liệu catalogue chính hãng, không phải trụ sở/nhà xưởng
            của PNG ONE SOLAR.
          </p>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
