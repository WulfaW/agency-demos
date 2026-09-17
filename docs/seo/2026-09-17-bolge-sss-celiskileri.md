# Bölge sayfaları — SSS mesafe/süre çelişkileri

Tarih: 2026-09-17 · Kaynak: easyviptransfer.com (Wix), 54 bölge sayfası tarandı

## Durum

Müşterinin mevcut sitesinde **30 bölge sayfasında**, Google'a gönderilen yapılandırılmış veri (FAQPage JSON-LD) ile sayfada ziyaretçinin gördüğü SSS metni **farklı mesafe ve süre** söylüyor. Yani Google bir rakam, ziyaretçi başka bir rakam görüyor.

Bazı farklar yuvarlama düzeyinde (Bodrum: 40–45 dk / 35–45 dk). Bazıları büyük hata:

- **Antalya:** Google verisi 310 km / 3,5–4 saat, sayfada 460 km / 6 saat
- **Adabükü:** Google verisi 25 km, sayfada 50 km
- **Alaçatı, Çeşme:** 300 km vs 225–230 km

## Yeni sitede ne yapıldı

Yeni sitede SSS **tek kaynaktan** üretiliyor: sayfada görünen metin ile Google'a giden veri birebir aynı. Çelişki yapısal olarak ortadan kalktı.

Kaynak olarak **yapılandırılmış veri** seçildi (sayfa başına genelde 3 soru, görünür SSS'de 1). **Bu seçim, bazı sayfalarda muhtemelen doğru olan görünür rakamı muhtemelen yanlış olanla değiştirmiş olabilir** (örn. Antalya). Lansmandan önce aşağıdaki rakamlar müşteriyle doğrulanmalı.

## Müşteriye sorulacak

Her satır için: doğru mesafe ve süre nedir? Başlangıç noktası nedir (Milas-Bodrum Havalimanı mı, Bodrum merkez mi)?

| Bölge | Adres | Google'a giden (şu an yeni sitede) | Wix sayfasında görünen |
|---|---|---|---|
| Adabükü | `/bolgelerimiz/adabuku-transfer` | 20-30 dakika, 25 km | 50 km, 50-55 dakika |
| Akyarlar | `/bolgelerimiz/akyarlar-transfer` | 55-65 dakika, 58 km | 1 saat, 10 dakika, 60 km |
| Alaçatı | `/bolgelerimiz/alacati-transfer` | 3,5 saat, 300 km | 225 km, 3 saat, 30 dakika |
| Antalya | `/bolgelerimiz/antalya-transfer` | 3,5-4 saat, 310 km | 460 km, 6 saat |
| Bardakçı | `/bolgelerimiz/bardakci-transfer` | 35-45 dakika, 38 km | 35-40 dakika, 38 km |
| Bitez | `/bolgelerimiz/bitez-transfer` | 35-45 dakika, 40 km | 40-50 dakika, 42 km |
| Bodrum | `/bolgelerimiz/bodrum-transfer` | 36 km, 40-45 dakika | 35–45 dakika, 36 km |
| Dalaman Havalimanı | `/bolgelerimiz/dalaman-havalimani` | 190 km, 2,5-3 saat | 2 saat, 200 km, 3 saat, 45 dakika |
| Datça | `/bolgelerimiz/datca-transfer` | 1,5-2 saat, 110 km | 155 km, 2 saat, 3 saat, 45 dakika |
| Fethiye | `/bolgelerimiz/fethiye-transfer` | 2,5-3 saat, 220 km | 10 dakika, 210 km, 3 saat |
| Gümbet | `/bolgelerimiz/gumbet-transfer` | 35-45 dakika, 38 km | 39 km, 40-45 dakika |
| Gümüşlük | `/bolgelerimiz/gumusluk-transfer` | 50-60 dakika, 55 km | 1 saat, 10 dakika, 60 km |
| Gündoğan | `/bolgelerimiz/gundogan-transfer` | 50-60 dakika, 52 km | 45-55 dakika, 48 km |
| Kadıkalesi | `/bolgelerimiz/kadikalesi-transfer` | 20 km, 20-25 dakika | 50-55 dakika, 55 km |
| Kapadokya | `/bolgelerimiz/kapadokya-transfer` | 760 km, 8-9 saat | 730 km, 9-10 saat |
| Konacık | `/bolgelerimiz/konacik-transfer` | 25-35 dakika, 28 km | 30-35 dakika, 35 km |
| Marmaris | `/bolgelerimiz/marmaris-transfer` | 165 km, 2,5 saat | 135 km, 2 saat, 30 dakika |
| Ortakent | `/bolgelerimiz/ortakent-transfer` | 45-55 dakika, 50 km | 45-55 dakika, 46 km |
| Pamukkale | `/bolgelerimiz/pamukkale-transfer` | 2,5-3 saat, 210 km | 260 km, 4 saat |
| Torba | `/bolgelerimiz/torba-transfer` | 25-35 dakika, 31 km | 25-35 dakika, 31 km |
| Turgutreis | `/bolgelerimiz/turgutreis-transfer` | 45-60 dakika, 53 km | 1 saat, 55 dakika, 56 km |
| Türkbükü | `/bolgelerimiz/turkbuku-transfer` | 45-55 dakika, 48 km | 45 km, 45–55 dakika |
| Yahşi | `/bolgelerimiz/yahsi-transfer` | 45-55 dakika, 48 km | 40-45 dakika, 41 km |
| Yalıkavak | `/bolgelerimiz/yalikavak-transfer` | 55-65 dakika, 60 km | 1 saat, 45–55 dakika, 52 km |
| Yalıçiftlik | `/bolgelerimiz/yaliciftlik-transfer` | 20-30 dakika, 22 km | 1 saat, 50 dakika, 58 km |
| Çeşme | `/bolgelerimiz/cesme-transfer` | 3,5 saat, 300 km | 230 km, 3 saat, 30 dakika |
| Ölüdeniz | `/bolgelerimiz/oludeniz-transfer` | 240 km, 3,5 saat | 15 dakika, 220 km, 3 saat, 30 dakika |
| İasos | `/bolgelerimiz/iasos-transfer` | 15 km, 15-20 dakika | 1 saat, 10 dakika, 20 dakika, 70 km |
| İzmir Havalimanı | `/bolgelerimiz/izmir-havalimani-transfer` | 260 km, 3,5 saat | 240 km, 3 saat, 30 dakika |
| İçmeler | `/bolgelerimiz/icmeler-transfer` | 40-50 dakika, 42 km | 50 km, 50-55 dakika |

## Diğer bulgular

- **Güvercinlik** (`/bolgelerimiz/guvercinlik-transfer`): Wix'te sayfa boş — başlık, H1 ve metin yok, içerik yalnızca JavaScript ile oluşuyor. Yeni sitede `/bolgelerimiz`'e 308 ile yönlendiriliyor. Gerçek içerik gelince sayfa açılabilir; Lujo ve Titanic oteller bu bölgede, değerli bir sayfa.
- **Acenta kodu:** Wix sitesinde `ACENTA KODU: 11560`, yeni sitenin `transferData.ts` dosyasında `TÜRSAB Belge No: 11428`. Biri yanlış.
- **H1 yazım hataları** (yeni sitede düzeltildi, kelimeler korundu): `BODRUM tRANSFER`, `TURGUTREİS marİNA transfer`, `YALIÇİFTLİk transfer`, `kuşadası transfer`.
