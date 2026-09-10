# Reverse-Engineering: Mavi Transfer × Jet Digital

**Tarih:** 2026-09-10
**Yöntem:** Ham HTML, HTTP header, sitemap.xml, robots.txt, llms.txt, JSON-LD ve asset ağırlığı analizi (canlı fetch).
**Amaç:** Bu ajansın ne sattığını, nasıl inşa ettiğini ve nerede kırılgan olduğunu bilerek aynı sektöre daha iyi teklif vermek.

---

## 0. TEK CÜMLELİK ÖZET

> Jet Digital bir **web ajansı değil, ikas bayisi + performans pazarlama ajansı.** Mavi Transfer onların portföyünde bir **istisna** (tek servis-işletmesi projesi, e-ticaret değil). Site teknik olarak "iyi başlamış, bitirilmemiş" — altyapı doğru (Next.js + shadcn), ama içerik, güven katmanı ve rezervasyon motoru yarım. **Asıl açık: sitede online ödeme yok. Site rezervasyon almıyor, form topluyor.**

---

# 1. TEKNOLOJİ VE AI İZLERİ

## 1.1 Mavi Transfer stack'i (kanıtlı)

| Katman | Tespit | Kanıt |
|---|---|---|
| Framework | **Next.js App Router** (RSC) | `self.__next_f`, `main-app-*.js`, `vary: rsc,next-router-state-tree` |
| CSS | **Tailwind CSS v4** | `size-8`, `max-md:`, `text-[length:var(--nav-fs-mobile)]` arbitrary value sözdizimi |
| UI Kit | **shadcn/ui** | `radix` ×11, `lucide` ikon ×334, `muted-foreground` / `bg-primary` / `text-primary-foreground` token'ları |
| Hosting | Kendi sunucusu + **Cloudflare** önünde | `server: cloudflare`, `cf-ray`, `x-middleware-rewrite` |
| Medya | Ayrı CDN subdomain | `cdn.mavitransfer.com` (45 referans) |
| i18n | TR / EN / DE, cookie tabanlı | `mavitransfer-locale` cookie, 3 ayrı sitemap |
| Analytics | Sadece GTM | `googletagmanager.com` |
| Ödeme | **YOK** | HTML'de iyzico/PayTR/Stripe/Craftgate/Sipay izi sıfır |
| Structured data | LocalBusiness + FAQPage (SSR'lı, doğru) | `<script application/ld+json>` @graph |

**Ağırlık:** Anasayfa 531 KB ham HTML (82 KB gzip) + ~281 KB JS. TTFB 0.52s.
**Kırmızı bayrak:** `cache-control: private, no-cache, no-store, max-age=0` — anasayfa **hiç cache'lenmiyor.** Cloudflare önde ama `cf-cache-status: DYNAMIC`. Pazarlama sitesinde her istek origin'e gidiyor. Sezonda trafik patlarsa ilk düşecek yer burası.

## 1.2 AI üretimi bariz olan bölümler

Şunlar "v0/Claude çıktısı, üstüne insan dokunmamış" imzası taşıyor:

1. **`rounded-2xl` 178 kez, `rounded-3xl` 25 kez.** Tek bir radius sistemi yok, her komponent kendi köşesini seçmiş. Bu AI'ın default'u.
2. **`tracking-tight` 107 kez.** Her başlığa refleks olarak yapıştırılmış.
3. **Token disiplini çökmüş:** `bg-primary` (shadcn token) ile `bg-[#00A3E0]`, `bg-[#1e3a5f]`, `bg-[#f4f6f9]`, `bg-[#060a12]` **aynı dosyalarda yan yana.** Yani: AI shadcn temasıyla üretmiş, sonra insan tema token'larını güncellemek yerine her yere hardcoded hex yazmış. `slate-*` 157 kez + marka hex'i karışık. Design system yok, "renk yapıştırma" var.
4. **`backdrop-blur` 41 kez + `bg-gradient-to-*` 26 kez.** Glassmorphism + gradient — 2024-2026 AI landing page dini.
5. **Rakam bloğu:** `7/24 · Dakiklik Garantisi · Profesyonel Ekip` üçlüsü + `1000+ Günlük transfer · 4.9/5 Google puanı · 11+ Yıllık deneyim · 50+ Şoför · 1M+ Transfer · 800+ Yorum`. Tam klasik AI counter dizilimi.
6. **Referanslar sahte duruyor:** *Ayşe Yılmaz, Mehmet Öztürk, Fatma Kaya.* Türkçe placeholder isimlerin en jenerik üçlüsü. Fotoğraf yok, Google embed yok, link yok. İkisinin kaynağı "Doğrudan" (yani doğrulanamaz), biri "Google Reviews" diyor ama linki yok. **"800+ Google yorumu" iddiasının yanında 3 uydurma yorum göstermek, iddiayı da öldürüyor.**
7. **Aceternity / Magic UI izi YOK.** Framer Motion, GSAP, Lenis, Swiper, Embla — hiçbiri yüklü değil. Yani animasyon katmanı yok; sadece Tailwind `transition-colors` ve `group-hover:`. Site "hareketsiz". Marquee (`pointer-events-none invisible absolute flex w-max flex-nowrap`) elle yazılmış CSS animasyonu.

## 1.3 Gerçek buglar (satışta kullanılabilir)

- **Slugify fonksiyonu Türkçe karakterleri siliyor, çevirmiyor.**
  `dalaman-havalimanndan-marmarise-nasl-gidilir-2026-ulam-rehberi`
  → *havalimanından* → `havalimanndan` (ı düşmüş), *nasıl* → `nasl`, *ulaşım* → `ulam` (ş düşmüş).
  3 blog URL'i bu şekilde bozuk. Kalıcı SEO hasarı, düzeltmek 301 gerektirir.
- **CMS ID'si URL'e sızmış:** `/tr/shuttle-mavitys-62274` ve sayfa başlığı olarak `Shuttle Mavitys` görünüyor (llms.txt'de de var).
- **Duplicate/kanibalizasyon:** Hem `/tr/dalaman-fethiye-transfer` hem `/tr/dalaman-havalimani-fethiye-transfer` var. EN'de de aynı: `dalaman-fethiye-transfer` + `dalaman-airport-fethiye-transfer`. İki sayfa aynı anahtar kelime için birbiriyle yarışıyor.
- **EN slug'lar yarım çevrilmiş:** `/en/dalaman-airport-fethiye-transfer` (çevrilmiş) ama `/en/dalaman-havalimani-dalyan-transfer` (Türkçe kalmış). Tutarsız.
- **Para sayfası CSR:** `/tr/transfer` sunucudan `Sayfa hazırlanıyor…` dönüyor. Rezervasyon arayüzü SSR'da yok → LCP cezası + indekslenecek içerik yok.
- **Veri tutarsızlığı:** "2011'den beri" + "11+ yıllık deneyim" + "13 yıllık deneyimimizle" aynı sayfada. 2026'da 2011 = 15 yıl. Üç farklı sayı, üçü de yanlış.

---

# 2. AJANSIN SATIŞ & TEKLİF STRATEJİSİ

## 2.1 Jet Digital kendini nasıl konumlandırıyor?

**Yazılımcı değil, "büyüme ortağı" olarak.** Ana sayfada tek bir teknoloji kelimesi geçmiyor. Geçenler: *satış, dönüşüm, ciro, büyüme, marka bilinirliği.*

Gerçek iş modeli üç ayaklı:
1. **ikas bayiliği** (asıl motor) — "Ödüllü ikas iş ortağı". `/tr/ikas-x-jetdigital` sayfası ikas'ın kendi pazarlama metninin **birebir kopyası**; testimonial'lar bile ikas'ın müşterileri (WUNDER, MUGO, PROTEINOCEAN, HARLEY DAVIDSON). Yani ürün onların değil, **dağıtım onların.**
2. **Reklam yönetimi retainer'ı** — Google Ads, Meta Ads, TikTok Ads, sosyal medya, influencer.
3. **Yazılım/site** — sadece ikas'ın yetmediği yerde. Mavi Transfer tam olarak bu kutuya düşüyor.

**Kilit teklif yapısı (ana sayfa CTA bloğu):**
> "24 Saat İçinde Anahtar Teslim Kurulum · Reklam Yönetim Desteği · **12 Ay Boyunca Kesintisiz Destek**"

Bu bir proje satışı değil, **12 aylık abonelik kilidi.** Kurulum ucuz/hızlı (hatta zararına), para retainer'da.

**Huni:** `Sizi Arayalım` (düşük sürtünme, telefon) → `Hızlı Randevu` (Cal.com üzerinden takvim) → satış görüşmesi. İki katmanlı CTA merdiveni; e-posta formu değil, **telefon** hedefliyorlar. Türkiye KOBİ pazarında doğru karar.

**Lead magnet stratejisi:** Ücretsiz araçlar — KDV Hesaplama, Trendyol/Hepsiburada/n11 Komisyon Hesaplama, Desi Hesaplama, Open Graph Önizleme, Meta Title Önizleme. Hepsi **e-ticaret satıcısının günlük acısı.** Doğru fikir. Ama 7 araçtan **5'i "YAKINDA"** — menüyü ürün bitmeden yayınlamışlar.

## 2.2 Mavi Transfer'e ne satıldı? (Muhtemel acı noktası)

Kanıtlardan geriye giderek okunan pitch:

1. **"Aracıların komisyonundan kurtulun."** Transferz, Kiwitaxi, Jayride, Booking.com transfer, otel konsiyerjleri — hepsi %20-30 komisyon alıyor. Kendi rezervasyon kanalı = direkt marj. En güçlü ve en satılabilir argüman.
2. **"Alman ve İngiliz turisti kendi dilinde yakalayın."** TR/EN/DE — Dalaman'ın trafiği ağırlıklı UK + DE charter. Bu üç dil tesadüf değil, hedeflenmiş.
3. **"Google'da rota bazında çıkın."** Her destinasyon için ayrı landing page (`dalaman-datca-transfer`, `dalaman-kalkan-transfer`...). Klasik ve doğru local-SEO oyunu.
4. **"AI aramalarda görünün" (GEO/AEO).** Bu en modern ve en satış-değeri yüksek kalem: `llms.txt` yayınlamışlar, `robots.txt`'te **GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot açıkça `Allow`**, Bytespider `Disallow`. 2026'da "ChatGPT'ye 'Dalaman'dan Datça'ya nasıl giderim' diye sorulunca sizi göstersin" cümlesi müşteride kesin karşılık bulur. **Bunu kopyalayacağız, ama daha iyisini yapacağız.**
5. **"Shuttle'ı ürünleştirin."** Sitede canlı günlük shuttle sefer tablosu var (`Hızla doluyor` / `SON KOLTUKLAR` / `Müsait`). Yani operasyon verisi siteye bağlanmış. Bu teknik olarak projenin en değerli parçası ve muhtemelen faturanın çoğu buradan çıktı.

**Fiyat ankrajı:** Rota sayfalarında "Başlangıç fiyatı ₺1.300 – ₺8.150" gösteriliyor. Yani "fiyat sormak için ara" değil, "fiyatı gör" stratejisi. Doğru.

---

# 3. İÇERİK & SEO STRATEJİSİ

## 3.1 Ölçek: iddia büyük, uygulama küçük

| | Mavi Transfer | Jet Digital (kendi sitesi) |
|---|---|---|
| TR sitemap URL | **66** | **19** |
| EN / DE | 62 / 62 | 19 / — |
| Blog yazısı | 21 | **0** |
| Rota sayfası | ~30 | — |

**Programmatic SEO YOK.** 66 URL elle yazılmış bir sitedir. Gerçek programmatic olsaydı bu sektörde 500–5.000 sayfa görürdük. Yaptıkları: tek yönlü `Dalaman → X` şablonu.

**Bırakılan devasa boşluk:**
- ❌ Ters yön yok (`Datça → Dalaman`) — dönüş transferi aramanın **yarısı.**
- ❌ Çapraz rota yok (`Fethiye → Bodrum`, `Marmaris → Dalaman`).
- ❌ Otel bazlı sayfa yok (`Dalaman Havalimanı → Hillside Beach Club transfer`) — en yüksek dönüşümlü uzun kuyruk.
- ❌ Araç × rota kombinasyonu yok (`Dalaman Fethiye 8 kişilik minibüs transfer`).
- ❌ Fiyat intent sayfası yok (`dalaman fethiye transfer fiyat 2026`).
- ❌ Bodrum sadece 4 sayfa — Milas-Bodrum havalimanı neredeyse boş bırakılmış.

**Kaba matematik:** 25 nokta × 2 yön = 50; + 5 araç sınıfı = 250; + 200 otel = 450+ sayfa. Üç dilde **1.350+.** Onlar 190'da (3 dil toplam) kalmış.

## 3.2 Blog kalitesi: "güvenli AI içeriği" = Helpful Content cezası riski

Örnek incelendi (`dalaman-havalimanndan-marmarise-nasl-gidilir`):
- ✅ Yapı doğru: mesafe → süre → seçenekler → kime uygun. Informational intent yakalanmış.
- ❌ **Sıfır birinci-el bilgi.** Otobüs saati yok, gerçek taksi ücreti yok, firma adı yok, peron numarası yok, fotoğraf yok, harita yok, karşılaştırma tablosu yok.
- ❌ Her cümle hedge: *"değişebilir", "olabilir", "değerlendirilebilir", "faydalıdır."* Hiçbir şey iddia etmiyor.
- ❌ Her paragraf tek cümle. LLM ritmi.
- Sonuç: Google'ın "experience" (E-E-A-T'nin ilk E'si) sinyali sıfır. 2026'da bu içerik sıralamaz.

## 3.3 Structured data: yarım bırakılmış

**Mavi'de VAR:** LocalBusiness + FAQPage (SSR'lı, teknik olarak doğru).
**Mavi'de YOK ve bu bir servet kaybı:**
- `AggregateRating` — sitede "4.9/5, 800+ yorum" **yazıyor** ama schema'ya konmamış. Google'da yıldız çıkmıyor. Tek satır JSON, doğrudan CTR.
- `Product`/`Service` + `Offer` + `priceCurrency` — sayfalarda "₺3.000'den başlayan" **yazıyor** ama fiyat schema'sı yok.
- `BreadcrumbList`, `Organization`, `WebSite`+`SearchAction`, `geo`, `areaServed`, `openingHoursSpecification`, `TaxiService`/`TouristTrip` — hiçbiri yok.

## 3.4 Jet Digital kendi SEO'sunda çakılmış (en sert bölüm)

SEO satan bir ajansın kendi sitesinde:

1. **`/tr/blogs` HTTP 404 veriyor — ve bu URL kendi sitemap.xml'lerinde listeli.** Google'a "beni indeksle" dedikleri sayfa 404. Üstelik 404 sayfası **198 KB.**
2. **Blog yazısı sayısı: 0.** İçerik pazarlaması satıp kendi blogu boş.
3. **Sayaçlar sunucuda `0` olarak render ediliyor.** HTML'de birebir şunlar var: `%0 Müşteri Memnuniyeti`, `+0 Mutlu İşletme`, `+0Mn Yönetilen Reklam Bütçesi`, `7/0 Kesintisiz Destek`. JS'siz crawler ve AI botları "%0 müşteri memnuniyeti" okuyor.
4. **JSON-LD `strategy: "afterInteractive"` ile enjekte ediliyor** — yani schema SSR HTML'de yok, hydration sonrası ekleniyor. JS çalıştırmayan GPTBot/ClaudeBot/PerplexityBot/Bing için **schema yok sayılır.** Ayrıca BreadcrumbList tek elemanlı ("Anasayfa") — işlevsiz.
5. **EN sürümü Türkçe slug kullanıyor:** `/en/dijital-pazarlama-cozumlerimiz`, `/en/sizi-arayalim`, `/en/sss`. İngilizce SEO'da sıfır şansı var.
6. **robots.txt işlevsiz:** `Disallow: /sizi-arayalim` yazmışlar ama gerçek URL `/tr/sizi-arayalim`. Prefix eşleşmediği için kural hiçbir şeyi engellemiyor. Aynı anda `/tr/randevu` hem "engellenmek istenmiş" hem sitemap'te.
7. **Vaat çelişkisi:** Ana sayfa "**24 Saat** İçinde Anahtar Teslim Kurulum", ikas sayfası aynı blokta "**3 Gün** İçinde Anahtar Teslim Kurulum". Aynı hizmet, iki farklı söz.
8. **Hosting:** `nginx + Phusion Passenger 6.1.8 + Plesk`. Yani Next.js **Plesk paneli üstünde** koşuyor. Vercel/CDN yok. "Hız" satan bir ajans, kendi sitesini paylaşımlı panel mimarisinde barındırıyor.
9. **Ağırlık:** Ana sayfa **1.04 MB ham HTML** (256 KB gzip) + 525 KB JS. Sebep: **her bölümü iki kez render ediyorlar** — bir `max-lg:hidden`, bir `lg:hidden`. Responsive CSS yerine DOM kopyalama. Metin çıktısında her başlık ve paragraf iki kez görünüyor.
10. **Kendi sitesi hazır tema.** `text-paragraph`, `bg-gray`, `dark:bg-dark`, `max-mb:` breakpoint'i, `stop-color-dark` — bunlar shadcn değil, satın alınmış bir Next.js ajans template'inin token'ları. Müşteriye custom shadcn build veriyorlar, kendilerine template.

---

# 4. ZAYIF, UCUZ VE YAPAY DURAN KISIMLAR (Anti-Slop Envanteri)

Sıralama: satış görüşmesinde en çok işe yarayandan aşağı.

| # | Bulgu | Neden ölümcül |
|---|---|---|
| 1 | **Online ödeme yok.** SSS: "Ödemelerinizi nakit veya kredi kartı ile **araçta** yapabilirsiniz." | Site rezervasyon almıyor, **talep formu** topluyor. No-show riski %100 müşteride. Aracı platformlar tam bu yüzden kazanıyor. |
| 2 | **Sahte referanslar.** Ayşe Yılmaz / Mehmet Öztürk / Fatma Kaya, fotoğrafsız, linksiz. | 800+ yorum iddiasının yanında 3 uydurma yorum, tüm sosyal kanıtı çürütüyor. |
| 3 | **Klişe sayaç dizisi.** 1000+/4.9/50+/1M+/11+ | Artık her AI sitesinde aynı. Zengin/kurumsal kitlede güven değil **yapaylık** hissi. |
| 4 | **Rakamlar kendi içinde çelişiyor.** 2011'den beri / 11+ yıl / 13 yıl. | Tek bir dikkatli okuyucu güveni sıfırlar. |
| 5 | **Para sayfası (`/tr/transfer`) SSR'da boş** — "Sayfa hazırlanıyor…" | LCP cezası + indekslenecek içerik yok. |
| 6 | **Anasayfa hiç cache'lenmiyor** (`no-store`) | Sezon zirvesinde ilk çöken yer. |
| 7 | **AggregateRating + Offer schema yok** | Google'da yıldız ve fiyat çıkmıyor. Bedava CTR'ı çöpe atıyorlar. |
| 8 | **Slug'larda Türkçe karakter siliniyor** (`nasl`, `ulam`, `havalimanndan`) | Kalıcı URL hasarı. |
| 9 | **Duplicate rota sayfaları** (fethiye ×2) | Kendi kendine kanibalizasyon. |
| 10 | **Ters yön ve çapraz rota sayfaları yok** | Aramanın yarısını görmüyorlar. |
| 11 | **Blog: sıfır birinci-el veri, sıfır görsel, sıfır tablo** | E-E-A-T yok. |
| 12 | **Sıfır animasyon/hareket** (Framer/GSAP/Lenis yok) | "VIP/lüks" iddiası ile statik his çelişiyor. |
| 13 | **Design token yok** — `bg-primary` ile `bg-[#00A3E0]` yan yana | Marka güncellemesi = 150 dosya. Bakım borcu. |
| 14 | **Canlı sefer tablosu kıtlık dilini kullanıyor** ("SON KOLTUKLAR", "Hızla doluyor") ama koltuk sayısı göstermiyor | Doğrulanamaz kıtlık = sahte aciliyet algısı. |
| 15 | **Ajansın kendi sitesi:** 404 sitemap'te, blog boş, sayaçlar 0, EN slug'lar Türkçe, Plesk hosting, 1 MB HTML | **Ajansın kendi vitrini, sattığı hizmetin reklamını çürütüyor.** |

---

# 5. NASIL EZERİZ — TEKLİF SİLAHLARI

## 5.1 Konumlandırma (tek cümle)

> **"Jet Digital size bir web sitesi kurdu. Biz size bir rezervasyon sistemi kuruyoruz — komisyonsuz kendi Booking.com'unuzu."**

Onlar "dijital pazarlama" satıyor. Biz **operasyon + gelir altyapısı** satacağız. Farklı kategori, kıyaslanamaz fiyat.

## 5.2 Onların yapamadığı 10 özellik (teklif maddeleri)

**A. Gelir katmanı — asıl fark burada**
1. **Gerçek online ödeme + 3D Secure** (iyzico / Craftgate / PayTR). Tam ödeme *veya* %20-30 kapora seçeneği.
2. **Kapora modeli = no-show'u öldürür.** Rakibin en büyük operasyonel maliyeti bu; sayısal olarak konuşulabilecek tek argüman.
3. **Çok para birimi + gerçek kur** (₺/€/£). Alman turist €'yu görmek ister, "TRY..." yazan bir dropdown değil.
4. **Otomatik onay:** e-posta + SMS + WhatsApp Business API. Rakipte sadece `wa.me` linki var (manuel).
5. **Uçuş takibi gerçek entegrasyon** (AeroDataBox/FlightAware). Onlar "uçuş takip sistemimiz var" **diyor**; biz uçuş kodundan rötarı gösteren canlı bir widget koyarız. İddia vs. kanıt.

**B. SEO — ölçek farkı**
6. **Gerçek programmatic SEO:** `N × M × araç × dil` matrisi. Onlar 66 sayfa, biz **1.000+.** Ters yön + çapraz rota + otel bazlı + fiyat intent sayfaları.
7. **Tam schema paketi:** `AggregateRating` (gerçek Google Review API'sinden çekilen), `Offer` + `priceCurrency`, `TaxiService`, `BreadcrumbList`, `WebSite`+`SearchAction`, `geo`. Hepsi **SSR'lı** — afterInteractive değil.
8. **GEO/AEO'yu bir üst seviyeye:** `llms.txt` + rota bazlı `llms-full.txt` + `Speakable` schema + AI botlarına özel yapılandırılmış fiyat/süre tabloları. Onların yaptığı şeyin bitmiş hali.

**C. Güven — Anti-Slop**
9. **Google Reviews canlı embed.** Uydurma "Ayşe Yılmaz" yerine Places API'den gerçek isim + gerçek tarih + gerçek yıldız. Bu tek hamle onların en zayıf noktasını doğrudan vurur.
10. **Sayaç yerine kanıt:** "1000+ günlük transfer" yerine **"Bugün 14 sefer, 3'ünde yer var"** (canlı, doğrulanabilir). "4.9/5" yerine gerçek review kartları. Rakamı büyütmek değil, **doğrulanabilir kılmak.**

**D. Operasyon — onların hiç girmediği alan**
11. **Şoför paneli** (mobil): görev listesi, "yolcuyu aldım/bıraktım", canlı konum linki.
12. **Yönetim paneli:** araç-şoför atama, doluluk, günlük ciro, iptal yönetimi.
13. **B2B portal:** otel ve acente girişi, kendi komisyon oranı, toplu rezervasyon. Transfer sektöründe gerçek para **B2B'de.**

## 5.3 Teklif sunumunda kullanılacak "kanıt slaytı"

Şu 5 bulguyu ekran görüntüsüyle göster — hepsi doğrulanabilir, hepsi tartışmasız:

1. `curl -I https://jetdigital.co/tr/blogs` → **404**, ve aynı URL kendi sitemap.xml'lerinde.
2. Jet Digital ana sayfa HTML'inde **`%0 Müşteri Memnuniyeti` / `7/0 Kesintisiz Destek`**.
3. Ana sayfada "**24 saat**", ikas sayfasında "**3 gün**" — aynı vaat, iki rakam.
4. Mavi Transfer referansları: **Ayşe Yılmaz, Mehmet Öztürk, Fatma Kaya** — fotoğrafsız, linksiz.
5. Mavi Transfer'de "2011'den beri" + "11+ yıl" + "13 yıl" aynı sayfada.

**Sunum cümlesi:**
> "Bunlar tasarım tercihi değil, bitirilmemiş iş. Biz teslim ettiğimiz her siteye canlı bir denetim raporu ekliyoruz — 404 yok, sayaç 0 yok, sahte yorum yok."

## 5.4 Fiyatlandırma stratejisi

Onların modeli: ucuz kurulum + 12 ay retainer kilidi.
Bizim modelimiz iki seçenekten biri olmalı:

- **Seçenek A — Kategori atlama:** Tek seferlik yüksek kurulum (rezervasyon motoru + panel + ödeme) + düşük bakım. "Bu bir web sitesi değil, yazılım."
- **Seçenek B — Onların dilinde ama daha keskin:** Rezervasyon başına küçük komisyon (%3-5). Aracılar %25 alıyor. Kıyas otomatik olarak bizim lehimize. Ve ajansı değil, **aracıyı** rakip yaparız — müşteri için kararı kolaylaştırır.

---

## EK: Ham Teknik Kanıt Tablosu

| Ölçüm | Mavi Transfer | Jet Digital |
|---|---|---|
| Ham HTML (anasayfa) | 531.386 B | **1.041.588 B** |
| Gzip HTML | 82 KB | **256 KB** |
| Statik JS/CSS (transfer) | ~281 KB | ~525 KB |
| Inline script (RSC payload) oranı | %49 | %43 |
| TTFB | 0.52 s | 0.23 s |
| Sunucu | Cloudflare → origin | nginx + **Phusion Passenger + Plesk** |
| Cache | `no-store` (cache yok) | `s-maxage=31536000`, `x-nextjs-cache: HIT` |
| Sitemap URL (TR) | 66 | 19 |
| Blog yazısı | 21 | **0** |
| JSON-LD | SSR'lı (LocalBusiness, FAQPage) | **afterInteractive** (SSR'da yok) |
| Ödeme altyapısı | **yok** | — |
| UI kit | shadcn/ui + Radix + Lucide | satın alınmış tema |
| Animasyon kütüphanesi | yok | yok |
| Analytics | GTM | GTM + Clarity + TikTok Pixel |
| Randevu | WhatsApp linki | Cal.com |
