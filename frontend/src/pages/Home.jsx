import Hero from "../components/HomeCompo/Hero";
import Marquee from "../components/HomeCompo/Marquee";
import Stats from "../components/HomeCompo/Stats";
import ProductivitySection from "../components/HomeCompo/ProductivitySection";
import CollaborationSection from "../components/HomeCompo/CollaborationSection";
import SecuritySection from "../components/HomeCompo/SecuritySection";
import OpenSourceSection from "../components/HomeCompo/OpenSourceSection";
import CTASection from "../components/HomeCompo/CTASection";

const Home = () => {
  return (
    <div className="bg-[#0d1117] min-h-screen">
      <Hero />
      <Marquee />
      <Stats />
      <ProductivitySection />
      <CollaborationSection />
      <SecuritySection />
      <OpenSourceSection />
      <CTASection />
    </div>
  );
};

export default Home;
