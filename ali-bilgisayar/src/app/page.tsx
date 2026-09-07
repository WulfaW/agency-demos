import { Shield, Server, Wrench, Video, ChevronRight, Lock } from "lucide-react";
import * as motion from "framer-motion/client";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020202] text-neutral-200 font-sans selection:bg-orange-500/30 overflow-hidden">
      
      {/* BACKGROUND NOISE & DEEP GLOW */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-screen" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-600/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-neutral-800/30 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* FLOATING NAVBAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900/60 backdrop-blur-2xl border border-white/5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold tracking-tight text-xl">ALİ SİSTEM</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            <a href="#" className="hover:text-white transition-colors duration-300">Kurumsal</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Çözümler</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Donanım</a>
          </div>
          <button className="px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-all duration-300">
            Müşteri Girişi
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-48 pb-24 px-6 max-w-6xl mx-auto flex flex-col items-center">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl space-y-10 mb-40"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.15)]">
            <Lock className="w-3.5 h-3.5" />
            <span>Sıfır Risk, Kesintisiz Altyapı</span>
          </div>
          
          <h1 className="text-6xl md:text-[5.5rem] font-medium tracking-tighter text-white leading-[1.05]">
            İşletmenizi Yarına <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700">
              Güvenle Taşıyın.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
            Trabzon ve Karadeniz bölgesinde kurumsal bilişim, sunucu mimarisi ve yüksek teknoloji kapalı devre güvenlik sistemleri.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(234,88,12,0.6)]">
              Ücretsiz Keşif İste <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-300">
              Referanslarımız
            </button>
          </div>
        </motion.div>

        {/* BENTO GRID */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Card 1: Large (Span 8) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="md:col-span-8 group relative overflow-hidden bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-10 transition-all duration-500 hover:border-orange-500/30 hover:shadow-[0_0_40px_-10px_rgba(234,88,12,0.15)]"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
              <Server className="w-64 h-64 text-white" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[320px]">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                <Server className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="text-3xl font-medium tracking-tight text-white mb-4">Kurumsal Ağ & Sunucu</h3>
                <p className="text-neutral-400 max-w-md leading-relaxed text-lg font-light">
                  Şirketinizin tüm veri akışını yüksek performanslı yönetin. Kabin düzenlemesinden fiber altyapıya kadar anahtar teslim projeler.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Medium (Span 4) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 0.8 }}
            className="md:col-span-4 group bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-10 transition-all duration-500 hover:border-white/15 flex flex-col justify-between min-h-[320px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-white/5 flex items-center justify-center mb-6">
              <Video className="w-6 h-6 text-neutral-300 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-2xl font-medium tracking-tight text-white mb-3">CCTV Güvenlik</h3>
              <p className="text-neutral-400 leading-relaxed font-light">
                IP kameralar, plaka tanıma ve gece görüşlü kapalı devre sistemler.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Medium (Span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="md:col-span-5 group bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-10 transition-all duration-500 hover:border-white/15 flex flex-col justify-between min-h-[280px]"
          >
             <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-white/5 flex items-center justify-center mb-6">
              <Wrench className="w-6 h-6 text-neutral-300 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-2xl font-medium tracking-tight text-white mb-3">7/24 Teknik Servis</h3>
              <p className="text-neutral-400 leading-relaxed font-light">
                Yerinde veya uzak bağlantı ile anında müdahale, yedek parça ve bakım garantisi.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Large (Span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="md:col-span-7 group overflow-hidden bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-10 transition-all duration-500 hover:border-white/15 relative"
          >
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[280px]">
              <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-white/5 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-neutral-300 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-3xl font-medium tracking-tight text-white mb-3">Siber Güvenlik</h3>
                <p className="text-neutral-400 max-w-sm leading-relaxed font-light">
                  Fidye yazılımlarına ve veri hırsızlığına karşı donanımsal güvenlik duvarı (Firewall) yapılandırması.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}

