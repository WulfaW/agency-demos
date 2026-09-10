"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PartnersBar from "@/components/PartnersBar";
import ServicesSection from "@/components/ServicesSection";
import StatsCounter from "@/components/StatsCounter";
import Showcase from "@/components/Showcase";
import ToolsSection from "@/components/ToolsSection";
import FaqSection from "@/components/FaqSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactMode, setContactMode] = useState<string>("general");
  const [initialMessage, setInitialMessage] = useState<string>("");

  const handleOpenContact = (mode: string = "general", note: string = "") => {
    setContactMode(mode);
    setInitialMessage(note);
    setIsContactOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#131312] text-[#ededed] relative selection:bg-[#ff5b00] selection:text-white">
      {/* Jet Digital Header */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Hero with Sizi Arayalım input & Brand Marquee */}
      <Hero onOpenContact={handleOpenContact} />

      {/* Official Partners: İkas, Shopify, Meta, Google, TikTok, Stripe */}
      <PartnersBar />

      {/* Core Services (İkas, Meta Ads, Google Ads, TikTok, AI & Software) */}
      <ServicesSection onOpenContact={handleOpenContact} />

      {/* Agency Stats Counter */}
      <StatsCounter />

      {/* Successful Case Studies & References */}
      <Showcase onOpenContact={handleOpenContact} />

      {/* Interactive Free E-Commerce Tools & ROAS Calculator */}
      <ToolsSection onOpenContact={handleOpenContact} />

      {/* Sıkça Sorulan Sorular */}
      <FaqSection />

      {/* Bottom CTA Banner */}
      <CallToAction onOpenContact={handleOpenContact} />

      {/* Footer */}
      <Footer />

      {/* Contact & Fast Appointment Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        mode={contactMode}
        initialMessage={initialMessage}
      />
    </main>
  );
}
