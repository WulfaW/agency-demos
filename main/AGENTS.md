# ORTAK AJANS KURALLARI — Anti-Slop Protokolü

> Bu dosya **Claude ve Antigravity/Gemini** için ortak kural setidir. `web siteleri/` altındaki tüm projeler (easyvip, alibilgisayar, yeni işler) bu kurallara tabidir.
> Kaynak analiz: [`ANALIZ-jetdigital-mavitransfer.md`](ANALIZ-jetdigital-mavitransfer.md)

---

## 0. TEMEL İLKE

**"AI ile yapılmış" görünen her şey, zengin/kurumsal müşteride güven değil ŞÜPHE üretir.**
2026'da hedef kitle bu kalıpları tanıyor. Bir öğe her AI sitesinde varsa, o öğe artık ikna etmiyor — tersine "bu site şablon" sinyali veriyor.

Kural: **Her iddia doğrulanabilir olmalı. Doğrulanamayan iddiayı yazma, sil.**

---

## 1. KLİŞE SAYAÇ YASAĞI ⛔

Aşağıdaki blok **hiçbir projede kullanılmayacak:**

```
❌ 1000+ Günlük Transfer   ❌ 4.9/5 Puan        ❌ 500+ Mutlu Müşteri
❌ 10.000+ Proje          ❌ %98 Memnuniyet    ❌ 15+ Yıllık Deneyim
❌ 7/24 Destek (rozet olarak)                  ❌ 1M+ Tamamlanan İşlem
```

**Neden:** Bu üçlü/dörtlü sayaç dizisi AI landing page'lerinin imzası. Yuvarlak sayı + "+" işareti = uydurma sinyali.

### Yerine ne koyulacak — DOĞRULANABİLİR KANIT

| Klişe | Yerine |
|---|---|
| "1000+ günlük transfer" | **"Bugün 14 sefer · 3'ünde yer var"** (canlı veri, tıklanabilir) |
| "4.9/5 puan" | **Google Places API'den canlı çekilmiş gerçek yorum kartları** (isim + tarih + link) |
| "500+ mutlu müşteri" | **3 gerçek vaka: isim, tarih, ne yapıldı, ölçülen sonuç** |
| "%98 memnuniyet" | **Gerçek NPS veya hiç** |
| "15+ yıl deneyim" | **"2011'den beri"** — tek yerde, tek format, matematiği doğru |

**Sayı gösterilecekse üç şart:** (a) kaynağı belli, (b) tıklanınca doğrulanabilir, (c) yuvarlak değil (`847` > `800+`).

---

## 2. SAHTE SOSYAL KANIT YASAĞI ⛔

- ❌ Uydurma isimli referans. Özellikle **"Ayşe Yılmaz / Mehmet Öztürk / Fatma Kaya"** üçlüsü — bu isimler placeholder olarak damgalanmış.
- ❌ Fotoğrafsız + linksiz + tarihsiz yorum.
- ❌ Stock foto avatar.
- ❌ "Doğrulanmış müşteri" etiketi, doğrulama mekanizması olmadan.
- ❌ Az sayıda yorum ile büyük yorum sayısı iddia etmek (3 yorum göster + "800+ yorumumuz var" de = iddiayı kendin çürütürsün).

**Kural:** Gerçek yorum yoksa **yorum bölümü koyma.** Boş bırakmak, uydurmaktan iyidir. Alternatif: "Google'daki 847 yorumumuzu okuyun →" tek satır + gerçek link.

---

## 3. GÖRSEL SLOP YASAKLARI

| Yasak | Sebep | Yerine |
|---|---|---|
| `rounded-2xl` her yerde | AI default'u | **Tek radius ölçeği** tanımla (`--radius-sm/md/lg`), 2-3 değeri geçme |
| `backdrop-blur` + `bg-gradient-to-*` kombosu | 2024 AI landing dini | Düz yüzey + doğru gölge hiyerarşisi |
| Her başlıkta `tracking-tight` | Refleks | Sadece 32px+ display başlıklarda |
| Mor/mavi gradient (`from-purple-600 to-blue-500`) | En bilinen AI imzası | Markanın gerçek rengi |
| Emoji ikon | Ucuz | Lucide/Phosphor, tutarlı stroke |
| Karusel/kayan kutu | Tıklanmıyor, ölçülüyor | Grid veya tek güçlü görsel |
| Stock "gülümseyen ekip" fotoğrafı | Sahte | Gerçek fotoğraf veya hiç |
| Sıfır animasyon | "Lüks" iddiası ile çelişir | Ölçülü motion (aşağıya bak) |

### Design Token Zorunluluğu
```
❌ bg-primary ve bg-[#00A3E0] aynı projede yan yana
✅ Tüm marka renkleri CSS değişkeni / Tailwind theme'de. Hardcoded hex = code review'da red.
```
Sebep: renk hardcode'lanınca marka güncellemesi 150 dosyaya yayılır. Bu bakım borcudur, kısayol değil.

---

## 4. METİN SLOP YASAKLARI

**Yasak kalıplar:**
- "Dijital dünyada fark yaratın", "zirveye taşıyın", "bir adım öne geçin", "yenilikçi çözümler", "veri odaklı yaklaşım", "sonuç odaklı stratejiler"
- Her paragrafın tek cümle olması (LLM ritmi)
- Hedge yığını: *"olabilir, değişebilir, değerlendirilebilir, faydalıdır"* — hiçbir şey iddia etmeyen metin
- Aynı sayfada çelişen sayılar (bir yerde "24 saat", başka yerde "3 gün")

**Kural — Birinci El Bilgi Testi:**
Bir blog/rehber yazısı yayınlanmadan önce sor: *"Bu yazıda ChatGPT'nin bilemeyeceği tek bir bilgi var mı?"*
Yoksa yayınlama. Gerçek fiyat, gerçek saat, gerçek peron, gerçek firma adı, gerçek fotoğraf, karşılaştırma tablosu — en az biri olmalı.

---

## 5. TEKNİK ZORUNLULUKLAR (Rakiplerin düştüğü tuzaklar)

Bunlar sahada **doğrulanmış gerçek hatalar.** Her teslimattan önce kontrol edilecek.

### 5.1 SSR / Hydration
- ⛔ **Sayaç animasyonları sunucuda `0` render edilmiyor.** Jet Digital'in sitesinde HTML'de birebir `%0 Müşteri Memnuniyeti`, `7/0 Kesintisiz Destek` yazıyor. JS çalıştırmayan bot "%0 memnuniyet" okuyor. → Sayaç bileşeni **başlangıç değeri olarak son rakamı** render etmeli, animasyon üstüne binmeli.
- ⛔ **Para sayfası CSR olamaz.** `Sayfa hazırlanıyor…` SSR HTML'de görünüyorsa iş bitmemiştir. Rezervasyon/fiyat arayüzü SSR'lı olacak.
- ⛔ **Responsive için DOM kopyalama yok.** `max-lg:hidden` + `lg:hidden` ile aynı bölümü iki kez render etmek HTML'i 2× şişirir (rakipte anasayfa 1.04 MB oldu). Tek DOM, CSS ile responsive.

### 5.2 SEO
- ⛔ **Sitemap'te 404 olamaz.** Yayın öncesi her sitemap URL'i için status kontrolü zorunlu.
- ⛔ **JSON-LD `afterInteractive` ile enjekte edilmez.** SSR HTML'de statik olmalı — yoksa GPTBot/ClaudeBot/PerplexityBot/Bing schema'yı hiç görmez.
- ⛔ **Slugify Türkçe karakteri SİLMEZ, ÇEVİRİR.** `ı→i, ş→s, ğ→g, ü→u, ö→o, ç→c`. (Rakipte `nasıl→nasl`, `ulaşım→ulam`, `havalimanından→havalimanndan` oldu — kalıcı hasar.)
- ⛔ **Aynı içerik için iki URL olamaz.** (`dalaman-fethiye-transfer` + `dalaman-havalimani-fethiye-transfer` = kanibalizasyon.)
- ⛔ **Çok dilli sitede slug'lar da çevrilir.** `/en/sizi-arayalim` kabul edilmez.
- ⛔ **robots.txt kuralları gerçek URL yapısıyla eşleşmeli.** Locale prefix'i unutulursa kural hiçbir şeyi engellemez.
- ✅ **Zorunlu schema seti:** `Organization`, `WebSite`+`SearchAction`, `BreadcrumbList` (2+ eleman), sektöre uygun `Service`/`Product` + `Offer`+`priceCurrency`, `FAQPage`, ve gerçek yorum varsa `AggregateRating`.
- ✅ **Sitede yazan her rakam schema'da da olmalı.** "4.9/5, 800 yorum" yazıp `AggregateRating` koymamak = bedava yıldızı çöpe atmak.

### 5.3 Performans
- Pazarlama sayfaları **cache'lenebilir olmalı.** `cache-control: no-store` bir landing page'de hatadır (rakipte anasayfa hiç cache'lenmiyor).
- Hedef: ham HTML < 150 KB, gzip < 40 KB. (Rakipler: 531 KB ve 1.04 MB.)
- Next.js **Plesk/Passenger üstünde koşturulmaz.** Vercel veya düzgün bir Node/edge deployment.

### 5.4 GEO / AEO (AI Arama Optimizasyonu) — burada rakibi geçeceğiz
- ✅ `llms.txt` zorunlu (rakip yapıyor, biz daha iyisini yapacağız).
- ✅ `robots.txt`'te GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot → `Allow`.
- ✅ Ek olarak: rota/ürün bazlı `llms-full.txt`, `Speakable` schema, AI botları için yapılandırılmış fiyat & süre tabloları.

---

## 6. TİCARİ ZORUNLULUK — "Site" değil "Sistem"

Rakip ajansın en büyük açığı: **kurdukları site rezervasyon almıyor, form topluyor.**

Bir rezervasyon/sipariş işi alındığında **minimum kapsam:**
1. Gerçek online ödeme + 3D Secure (iyzico / Craftgate / PayTR)
2. Kapora seçeneği (no-show'u öldürür — en güçlü satış argümanı)
3. Çok para birimi, gerçek kur
4. Otomatik onay: e-posta + SMS + WhatsApp Business API (manuel `wa.me` linki yeterli değil)
5. Yönetim paneli (atama, doluluk, ciro, iptal)
6. B2B portal (otel/acente, kendi komisyon oranı) — bu sektörde asıl para burada

**Konumlandırma cümlesi:** *"Onlar web sitesi kuruyor. Biz komisyonsuz kendi rezervasyon sisteminizi kuruyoruz."*

---

## 7. TESLİMAT ÖNCESİ CHECKLIST

Her proje tesliminde bu listeyi çalıştır ve sonucu raporla:

```
[ ] Sitemap'teki her URL 200 dönüyor mu?
[ ] JS kapalıyken sayaçlar doğru rakamı gösteriyor mu? (0 değil)
[ ] JSON-LD ham HTML'de (view-source) görünüyor mu?
[ ] Aynı sayfada çelişen sayı/vaat var mı?
[ ] Tüm slug'lar Türkçe karakterden arındırılmış (silinmiş değil, çevrilmiş) mi?
[ ] Hardcoded hex renk var mı? (grep: bg-\[#)
[ ] Uydurma referans / stock avatar var mı?
[ ] Klişe sayaç bloğu var mı?
[ ] Ham HTML < 150 KB mi?
[ ] Pazarlama sayfaları cache'leniyor mu?
[ ] EN/DE slug'lar çevrilmiş mi?
[ ] robots.txt kuralları gerçek locale-prefix'li URL'lerle eşleşiyor mu?
[ ] Ödeme + kapora + otomatik onay çalışıyor mu?
```

---

## 8. TASARIM KALİTE ÇITASI (mevcut kuralın devamı)

Tasarımlar asla "ham" kalmayacak: mikro boşluklar, doğru padding, ölçülü gölge/glow, lüks tipografi. Referans standart: **Apple, VistaJet, Aman Resorts.**

Ama dikkat: **"lüks" = ağır efekt değil.** Rakip sitede sıfır animasyon var (Framer Motion / GSAP / Lenis yüklü değil) ve bu "VIP" iddiasıyla çelişiyor. Bizim çizgimiz:
- Ölçülü motion (scroll reveal, 200-400ms, `ease-out`) — evet
- Parallax şovu, otomatik karusel, glow patlaması — hayır
- Gerçek yüksek çözünürlüklü fotoğraf (araç içi, bölge) — zorunlu. Boş/kuru metin bırakılmaz.

---

## 9. MÜŞTERİ AVCILIĞI & CRM SENKRONİZASYONU (Antigravity & Claude)

Apify Google Maps Lead Scraper (`scripts/hunt_leads.py`) ile taranan işletmeler otomatik olarak ortak Notion CRM'e işlenmektedir.

### Güncel Durum (10 Eylül 2026):
- **Taranan Sektörler:** 
  - Marmaris Tekne Turu & Yatçılık (20 işletme)
  - **YENİ:** VIP Araç Tasarım & Karavan Dönüşüm (10 işletme)
  - **YENİ:** Lüks Rekreasyon / At Çiftlikleri (10 işletme)
  - **YENİ:** Modüler Ev / Tiny House Üreticileri (10 işletme - Taraması yapıldı)
- **Başarı Oranı:** Taranan işletmelerin **%90'ından fazlasının** ya *Websitesi Hiç Yok* ya da *SSL'siz / Çökmüş / Çok Yavaş* siteler olduğu tespit edildi. Özellikle VIP Araç, At Çiftlikleri ve Tiny House sektörlerinde "Sıfır Site" oranı inanılmaz yüksek.
- **Teklif Stratejisi:** Bu işletmelere "Site kurma" değil; **"Doğrudan online rezervasyon/satış motoru ve dijital vitrin"** teklif ediliyor.

### ❓ Alper & Claude ile Tartışılacak Açık Kararlar:
1. **Sıradaki Öncelikli Sektörler:**
   - Seçenek A: **Bodrum / Antalya VIP Transfer** (Easy VIP Transfer demosuyla doğrudan satış)
   - Seçenek B: **Göcek / Fethiye Özel Yat & Gulet Kiralama** (Yüksek sepet tutarı, komisyonsuz doğrudan rezervasyon)
   - Seçenek C: **Kalkan / Kaş Lüks Villa Kiralama** (Kapora dolandırıcılığına karşı kurumsal 3D Secure çözümü)
   - Seçenek D: **E-Ticaret Butikleri** (İkas geçişi & Meta CAPI optimizasyonu — Örn: Sermoda)
2. **Cold Outreach Formatı:** WhatsApp / SMS doğrudan demo linki mi, yoksa Instagram DM üzerinden teknik audit mi?

