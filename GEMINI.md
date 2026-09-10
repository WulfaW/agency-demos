# Ajans Operasyon Kuralları (Agency Operations Rules)

## 1. ZORUNLU: CRM, Takım Çalışması ve Git Senkronizasyonu (Antigravity & Claude)
Bu klasör (gency-demos) altında iki farklı geliştirici ve yapay zeka (Antigravity ve Claude) çalışmaktadır. Çakışmaları önlemek ve senkronize kalmak için:
- **GİT KURALLARI:** Kodlamaya veya yeni bir projeye başlamadan önce DAİMA git pull yap. Görev bitiminde (veya gün sonunda) mutlaka git push yap.
- **NOTION CRM:** Müşteri eklendiğinde veya durumu değiştiğinde doğrudan ortak Notion CRM veritabanını (API üzerinden) güncelle. Hem sen hem Claude aynı Notion tablosuna bağlısınız. Veriler her zaman orada tutulacak. Anahtarlar .env dosyasındadır.
- **LİNEAR TAKİBİ:** Görevlere başlarken Linear durumunu In Progress, bitince Done olarak güncelle.

## 2. OTOMATİK MÜŞTERİ AVCILIĞI (Apify Google Maps Lead Scraper)
Ajansımız için toplu müşteri çekmek amacıyla Apify entegre edilmiştir.
- Otomatik Av Komutu: python scripts/hunt_leads.py "<Arama Kelimesi>" "<Sektör>" <Adet>
- Örnek: python scripts/hunt_leads.py "Göcek Yat Kiralama" "Yat & Tekne Kiralama" 10
Bu komut Google Haritalar'dan işletmeleri, telefonları ve web sitelerini kazıyıp doğrudan Notion CRM'e ekler.

## 3. Tasarım Kalitesi (Anti-Slop)
Her zaman Global kurallardaki Anti-Slop High-End Design kurallarına uy. Tasarımlar asla "ham" kalmamalı; her zaman mikro boşluklar, doğru padding'ler, subtle glow efektleri ve lüks tipografi ile 20.000 TL'lik premium hissiyatı vermelidir.

## 4. EASY VIP TRANSFER PROJESİ ÖZEL NOTU
Bu proje ajansımızın İLK büyük vitrin projesidir. Tasarımda ve kod kalitesinde amatörlüğe (sıradan şablonlara, kayan kutulara, ucuz renklere) SIFIR TOLERANS gösterilecektir. Sitenin her bir pikseli uluslararası lüks markalar (Apple, VistaJet, Aman Resorts) standartlarında, 'Gerçekten Profesyonel ve VIP' görünecektir.