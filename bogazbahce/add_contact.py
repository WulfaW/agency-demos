import os

contact_section = """
      {/* İletişim / Rezervasyon Section */}
      <section id="iletisim" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Sol - İçerik & Bilgi */}
          <div className="flex flex-col">
            <h2 className="text-sm tracking-widest text-gold-600 font-mono uppercase mb-4">Rezervasyon</h2>
            <h3 className="text-4xl md:text-5xl font-display text-luxury-text tracking-tight mb-8">
              Hayalinizdeki Günü <br/>
              <span className="italic text-gold-500">Birlikte Planlayalım</span>
            </h3>
            <p className="text-luxury-text/70 font-light leading-relaxed mb-10 max-w-md">
              Lüks, konfor ve kusursuz detaylarla dolu bir etkinlik için formu doldurun. Etkinlik danışmanlarımız en kısa sürede sizinle iletişime geçecektir.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-luxury-bg flex items-center justify-center text-gold-500">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-luxury-text/60 font-mono uppercase tracking-widest mb-1">Bizi Arayın</p>
                  <a href="tel:+905326679661" className="text-lg font-medium text-luxury-text hover:text-gold-600 transition-colors">+90 532 667 96 61</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-luxury-bg flex items-center justify-center text-gold-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-luxury-text/60 font-mono uppercase tracking-widest mb-1">E-Posta Gönderin</p>
                  <a href="mailto:info@bogazbahce.com" className="text-lg font-medium text-luxury-text hover:text-gold-600 transition-colors">info@bogazbahce.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ - Form */}
          <div className="bg-luxury-bg p-8 md:p-12 rounded-[2rem] shadow-sm border border-black/5">
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-luxury-text/60">Adınız Soyadınız</label>
                  <input type="text" className="bg-transparent border-b border-black/10 pb-2 outline-none focus:border-gold-500 transition-colors text-luxury-text" placeholder="Örn: Ayşe Yılmaz" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-luxury-text/60">Telefon Numaranız</label>
                  <input type="tel" className="bg-transparent border-b border-black/10 pb-2 outline-none focus:border-gold-500 transition-colors text-luxury-text" placeholder="05XX XXX XX XX" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-luxury-text/60">Etkinlik Türü</label>
                  <select className="bg-transparent border-b border-black/10 pb-2 outline-none focus:border-gold-500 transition-colors text-luxury-text cursor-pointer">
                    <option>Kır Düğünü</option>
                    <option>Kına / Nişan</option>
                    <option>Kurumsal Davet</option>
                    <option>Mezuniyet / Parti</option>
                    <option>Diğer</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-luxury-text/60">Tahmini Kişi Sayısı</label>
                  <input type="number" className="bg-transparent border-b border-black/10 pb-2 outline-none focus:border-gold-500 transition-colors text-luxury-text" placeholder="Örn: 250" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-widest text-luxury-text/60">Ekstra Talepleriniz</label>
                <textarea rows={3} className="bg-transparent border-b border-black/10 pb-2 outline-none focus:border-gold-500 transition-colors text-luxury-text resize-none" placeholder="Varsa özel isteklerinizi buraya yazabilirsiniz..."></textarea>
              </div>

              <button type="button" className="mt-4 bg-luxury-text text-luxury-bg px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-black/80 transition-all flex items-center justify-center gap-2">
                Teklif İste <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
"""

with open('src/app/page.tsx', 'r', encoding='utf8') as f:
    content = f.read()

content = content.replace('{/* Footer Section */}', contact_section + '\n      {/* Footer Section */}')

with open('src/app/page.tsx', 'w', encoding='utf8') as f:
    f.write(content)
