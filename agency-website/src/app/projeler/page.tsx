import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export default function ProjelerPage() {
  const projects = [
    {
      title: "Easy VIP Transfer",
      category: "VIP Turizm & Havacılık",
      location: "Bodrum & Yalıkavak",
      status: "Canlı Demo Hazır",
      description: "2016 model eski bir şablonun, canlı Bodrum rota simülatörü, dinamik fiyatlama ve çok dilli Maybach iç mekan atmosferiyle baştan yaratılmış hali.",
      tech: ["Next.js 15", "Tailwind CSS", "Canlı Harita API", "WhatsApp Bot"],
      link: "http://localhost:3000",
      featured: true
    },
    {
      title: "Dr. Ferhat Klinik",
      category: "Klinik & Estetik",
      location: "Nişantaşı, İstanbul",
      status: "Geliştirme Aşamasında",
      description: "Medikal estetik ve saç ekimi operasyonları için yüksek kontrastlı, güven aşılayan, hasta sonuçları galerisi odaklı dijital klinik vitrini.",
      tech: ["Next.js 15", "Supabase", "Bento Grid"],
      link: "#",
      featured: false
    },
    {
      title: "Teknik Yapı Lüks Konut",
      category: "Mimarlık & İnşaat",
      location: "Suadiye / Kadıköy",
      status: "Konsept Tasarım",
      description: "Bağdat Caddesi lüks konut projeleri için 3D kat planları ve interaktif daire seçim motoru barındıran mimari sunum platformu.",
      tech: ["Next.js 15", "Three.js", "Tailwind"],
      link: "#",
      featured: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      <header className="space-y-4 max-w-2xl">
        <div className="text-xs font-mono tracking-widest uppercase text-[#C5A880]">PORTFOLYO & REFERANSLAR</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Seçilmiş İşler ve Canlı Demolar
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          Müşterilerimize "sitenizi şöyle yapacağız" diye sunum yapmıyoruz. Doğrudan çalışan, etkileşimli ve ciroyu artıran canlı prototipler üretiyoruz.
        </p>
      </header>

      {/* Projects Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p, idx) => (
          <article key={idx} className="glass-panel rounded-3xl p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-[#C5A880]">
                  {p.category}
                </span>
                <span className="text-xs font-mono text-neutral-500">{p.location}</span>
              </div>
              <h2 className="text-2xl font-bold text-white group-hover:text-[#C5A880] transition-colors">
                {p.title}
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                {p.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t, tidx) => (
                  <span key={tidx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {p.status}
                </span>
                {p.link !== "#" ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold px-4 py-2 rounded-full bg-white text-black hover:bg-neutral-200 transition-all flex items-center gap-1"
                  >
                    <span>Demoyu İncele</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-neutral-600">Önizleme Yakında</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}