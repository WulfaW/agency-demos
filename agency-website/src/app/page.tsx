"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoServices from "@/components/BentoServices";
import Showcase from "@/components/Showcase";
import TechStack from "@/components/TechStack";
import RoiCalculator from "@/components/RoiCalculator";
import Process from "@/components/Process";
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");

  const handleOpenContact = (msg?: string) => {
    if (msg) {
      setInitialMessage(msg);
    } else {
      setInitialMessage("");
    }
    setIsContactOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#ededed] relative selection:bg-white selection:text-black">
      {/* Floating Navbar */}
      <Navbar onOpenContact={() => handleOpenContact()} />

      {/* Hero Section */}
      <Hero onOpenContact={() => handleOpenContact()} />

      {/* Bento Grid Capabilities */}
      <BentoServices />

      {/* Showcase / Case Studies */}
      <Showcase onOpenContact={() => handleOpenContact()} />

      {/* Production Gold Standard Tech Stack */}
      <TechStack />

      {/* Interactive ROI & Velocity Simulator */}
      <RoiCalculator onOpenContact={handleOpenContact} />

      {/* 14-Day Delivery Process */}
      <Process />

      {/* Footer */}
      <Footer />

      {/* Global Contact / Strategy Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialMessage={initialMessage}
      />
    </main>
  );
}
