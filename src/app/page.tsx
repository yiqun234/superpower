import HeroSection from '@/components/HeroSection';
import { Navbar } from '@/components/Navbar';
import ProtocolsSection from '@/components/ProtocolsSection';
import AdvisorsSection from '@/components/AdvisorsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import FinalSection from '@/components/FinalSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ProtocolsSection />
      <AdvisorsSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <FinalSection />
      <Footer />
    </main>
  );
}
