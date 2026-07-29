import CtaSection from "@/components/CtaSection";
import FeaturedDogs from "@/components/FeaturedDogs";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Nav from "@/components/Nav";
import SearchSection from "@/components/SearchSection";
import StorySection from "@/components/StorySection";
import WhySection from "@/components/WhySection";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <SearchSection />
      <FeaturedDogs />
      <StorySection />
      <HowItWorks />
      <WhySection />
      <CtaSection />
      <Footer />
    </main>
  );
}
