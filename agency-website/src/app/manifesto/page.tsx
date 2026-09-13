import Link from "next/link";
import { ArrowUpRight, Flame, ShieldAlert, Sparkles } from "lucide-react";

export default function ManifestoPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      <header className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-400 mb-4">
          <Flame className="w-3.5 h-3.5" />
          <span>ANTİ-SLOP AJANS MANİFESTOSU</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Şablon Çöplüğüne Karşı Dijital Zanaatkarlık.
        </h1>
        <p className="text-neutral-400 text-base max-w-2xl mx-auto leading-relaxed">
          Piyasa; müşteriye 50 dolarlık hazır tema kurup, üstüne 100.000 TL fatura kesen ve teslim ettikten sonra telefonlara bakmayan "ajanslarla" doldu. Biz bu oyunu bozuyoruz.
        </p>
      </header>

      <article className="space-y-12 text-neutral-300 text-sm sm:text-base leading-relaxed">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 space-y-4 border border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>1. Sıfır Hazır Tema Garantisi</span>
          </h2>
          <p className="text-neutral-400 text-sm">
            Biz tek bir satır WordPress veya satın alınmış tema kullanmıyoruz. Sitenizin her bir bileşeni, React ve Next.js kullanılarak markanızın kurumsal ağırlığına özel olarak kodlanır. Sunucudan 0.8 saniyede çıkar, Google botlarına ışık hızı sunar.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-10 space-y-4 border border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>2. Sahte Rakamlar ve Klişeler Yasak</span>
          </h2>
          <p className="text-neutral-400 text-sm">
            Rakiplerimizin sitelerinde gördüğünüz "%100 Müşteri Memnuniyeti", "350+ Başarılı Proje" gibi uydurma metrikler ve sahte müşteri fotoğrafları bizim dünyamızda yer alamaz. Müşterilerimize net kanıtlar, gerçek canlı demolar ve ölçülebilir sonuçlar sunarız.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-10 space-y-4 border border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>3. Doğrudan Kurucularla İletişim</span>
          </h2>
          <p className="text-neutral-400 text-sm">
            Araya junior müşteri temsilcileri veya stajyerler koymuyoruz. Projenizin başında doğrudan sistemi tasarlayan ve mimarisini kuran mühendisler durur. Her revizyon saatler içinde hayat bulur.
          </p>
        </div>
      </article>

      <div className="text-center pt-8">
        <Link href="/iletisim" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all">
          <span>Bizimle Tanışın (Keşif Randevusu)</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}