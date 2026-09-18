import Hero from "@/components/Hero";
import About from "@/components/About";
import BentoServices from "@/components/BentoServices";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-cream">
      <Hero />
      <About />
      <BentoServices />
      <Footer />
    </main>
  );
}
