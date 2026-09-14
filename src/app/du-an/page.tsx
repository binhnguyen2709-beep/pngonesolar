import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Dự án đã thực hiện",
  description: `Hơn 1.250 dự án điện năng lượng mặt trời áp mái đã được ${siteConfig.name} thi công và bàn giao trên toàn quốc.`,
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Dự án tiêu biểu"
            title="Hơn 1.250 công trình đã bàn giao trên toàn quốc"
            description="Từ hộ gia đình, nhà xưởng đến trang trại nông nghiệp - mỗi dự án là một minh chứng cho chất lượng thi công và cam kết đồng hành lâu dài của PNG ONE SOLAR."
            light
          />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <ProjectGallery />
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
