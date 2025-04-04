import React from "react";
import HeroSection from "../component/HeroSection";
import AboutUsSection from "../component/AboutUsSection";
import ChooseUsSection from "../component/ChooseUsSection";
import Testimonials from "../component/Testimonials";
import FAQsSection from "../component/FAQsSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutUsSection />
      <ChooseUsSection />
      <Testimonials />
      <FAQsSection />
    </div>
  );
}

export default Home;