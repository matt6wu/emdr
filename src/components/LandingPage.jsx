import React from "react";
import Navbar from "./landing/Navbar.jsx";
import HeroSection from "./landing/HeroSection.jsx";
import EducationSection from "./landing/EducationSection.jsx";
import FeaturesSection from "./landing/FeaturesSection.jsx";
import PricingSection from "./landing/PricingSection.jsx";
import TestimonialsSection from "./landing/TestimonialsSection.jsx";
import CTASection from "./landing/CTASection.jsx";
import Footer from "./landing/Footer.jsx";

export default function LandingPage({ enterTool }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar enterTool={enterTool} />
      <HeroSection enterTool={enterTool} />
      <EducationSection />
      <FeaturesSection />
      <PricingSection enterTool={enterTool} />
      <TestimonialsSection />
      <CTASection enterTool={enterTool} />
      <Footer />
    </div>
  );
}
