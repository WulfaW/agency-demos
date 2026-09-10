"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ComparisonSection from "@/components/ComparisonSection";
import EngineLayers from "@/components/EngineLayers";
import ShowcaseSection from "@/components/ShowcaseSection";
import CommissionCalculator from "@/components/CommissionCalculator";
import QualityManifesto from "@/components/QualityManifesto";
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");

  const handleOpenContact = (msg: string = "") => {
    setInitialMessage(msg);
    setIsContactOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#070709] text-[#ededed] relative selection:bg-white selection:text-black">
      {/* Floating Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Hero Section */}
      <Hero onOpenContact={handleOpenContact} />

      {/* Direct Contrast: Standard Agency vs AURA Engine */}
      <ComparisonSection />

      {/* 6 Engine Architectural Layers */}
      <EngineLayers onOpenContact={handleOpenContact} />

      {/* Flagship Case Study: Easy VIP Transfer */}
      <ShowcaseSection onOpenContact={handleOpenContact} />

      {/* Interactive Intermediary Loss & Commission Calculator */}
      <CommissionCalculator onOpenContact={handleOpenContact} />

      {/* Zero-Slop Quality Manifesto */}
      <QualityManifesto />

      {/* Footer */}
      <Footer />

      {/* Contact & Live Demo Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialMessage={initialMessage}
      />
    </main>
  );
}
