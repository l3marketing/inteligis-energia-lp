import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import PainSection from "@/components/PainSection";
import HowItWorks from "@/components/HowItWorks";
import SavingsCalculator from "@/components/SavingsCalculator";
import SocialProof from "@/components/SocialProof";
import Testimonials from "@/components/Testimonials";
import Guarantees from "@/components/Guarantees";
import Partnership from "@/components/Partnership";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrustBar />
      <PainSection />
      <HowItWorks />
      <SavingsCalculator />
      <SocialProof />
      <Testimonials />
      <Guarantees />
      <Partnership />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
