import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { PainPoints } from "@/components/home/PainPoints";
import { WhySolar } from "@/components/home/WhySolar";
import { ScenariosSection } from "@/components/home/ScenariosSection";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { CalculatorPromo } from "@/components/home/CalculatorPromo";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqPreview } from "@/components/home/FaqPreview";
import { CtaBanner } from "@/components/shared/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <PainPoints />
      <WhySolar />
      <ScenariosSection />
      <ProductsPreview />
      <CalculatorPromo />
      <ProcessSteps />
      <ProjectsPreview />
      <Testimonials />
      <FaqPreview />
      <CtaBanner />
    </>
  );
}
