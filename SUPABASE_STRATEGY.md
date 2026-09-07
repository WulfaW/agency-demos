# 🏗️ Ajans Supabase Veritabanı Mimarisi

Bu belge, Antigravity ve Claude Code ajanlarının veritabanı tasarlarken ve kodlarken uyması gereken mimari kuralları içerir.

## 🔴 Temel Problem
Supabase, geliştirici başına global olarak en fazla **2 adet ücretsiz proje** açılmasına izin vermektedir. Her müşteri veya demo site için ayrı bir Supabase projesi açmak ücretsiz planda imkansızdır. Ajans kasasından para çıkmadan onlarca projeyi yönetmek için aşağıdaki strateji uygulanacaktır.

## 🟢 1. Demo ve Geliştirme Aşaması (Multi-Tenant)
Ajansın tüm potansiyel müşterileri ve demoları **tek bir 'Master' Supabase projesi** üzerinde yaşayacaktır.

**Ajanlar İçin Kodlama Kuralları:**
1. Supabase'de açılan tüm tablolara (örn: users, content, settings) mutlaka 	enant_id (string) sütunu eklenecektir.
2. 	enant_id, projenin kısa adıdır (örn: easy-vip-transfer, dr-ferhat).
3. Next.js uygulamasında, tüm veritabanı sorguları bu 	enant_id ile filtrelenmelidir.
4. RLS (Row Level Security) kuralları yazılırken, kullanıcıların sadece kendi 	enant_id'lerine ait verileri okuyup yazabileceği güvence altına alınmalıdır.

## 🚀 2. Müşteriye Teslimat (Handoff & Production)
Müşteri projeyi onaylayıp ödemeyi yaptığında, veritabanını ayırmak **çok kolaydır**. Kodu baştan yazmaya gerek yoktur.

**Teslimat Adımları:**
1. Müşteriden kendi şirket e-postası ile ücretsiz bir Supabase hesabı açması istenir.
2. Ajan (Claude/Antigravity), Master veritabanındaki şemayı (SQL tablolarını) dışa aktarır ve müşterinin boş Supabase projesine kurar.
3. Vercel'deki canlı ortam değişkenlerinde (.env), Master DB'nin API key'leri yerine **Müşterinin Supabase API Key'leri** yapıştırılır.
4. Kod yapısı aynı kalır. .env üzerinden NEXT_PUBLIC_TENANT_ID=easy-vip-transfer verilerek müşterinin kendi sunucusunda sadece kendi verisiyle izole ve ücretsiz çalışması sağlanır.