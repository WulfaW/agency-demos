import Hero from "@/components/Hero";
import About from "@/components/About";
import BentoServices from "@/components/BentoServices";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-cream">
      <Hero />
      <About />
      <BentoServices />
      <Testimonials />
      <Footer />
    </main>
  );
}
