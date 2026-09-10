import sys
import os
import time
import re
import requests
from urllib.parse import urlparse

def load_env():
    env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    os.environ[k.strip()] = v.strip()

load_env()

APIFY_TOKEN = os.environ.get('APIFY_TOKEN')
NOTION_TOKEN = os.environ.get('NOTION_TOKEN')
DATABASE_ID = os.environ.get('NOTION_DATABASE_ID', '3d12b8333e6d8122a4cbfd8dcfdd6355')

def analyze_website(url):
    """
    Web sitesini otomatik olarak inceler:
    - Erişilebilirlik ve HTTP/SSL durumu
    - Mobil uyumluluk (viewport)
    - Telif tarihi (güncellik)
    - Teknoloji ve eski tema izleri
    """
    if not url:
        return {
            "status": "NO_WEBSITE",
            "score": "SIFIR SİTE",
            "flags": ["🚨 WEBSİTESİ HİÇ YOK (Doğrudan Sıfırdan Satış)"]
        }
        
    flags = []
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    # 1. SSL / URL kontrolü
    if url.startswith('http://') and not url.startswith('https://'):
        flags.append("🔒 SSL Yok (Güvensiz HTTP)")
        
    try:
        t0 = time.time()
        resp = requests.get(url, headers=headers, timeout=8, verify=False)
        load_time = round(time.time() - t0, 2)
        
        if resp.status_code >= 400:
            return {
                "status": "BROKEN",
                "score": "ÇÖKMÜŞ",
                "flags": [f"❌ Site Çalışmıyor (HTTP {resp.status_code})"]
            }
            
        if load_time > 4.5:
            flags.append(f"🐢 Çok Yavaş ({load_time} sn)")
            
        html = resp.text.lower()
        
        # 2. Mobil Uyumluluk (Viewport)
        if '<meta name="viewport"' not in html and "<meta name='viewport'" not in html:
            flags.append("📱 Mobil Uyumsuz (Meta Viewport Yok)")
            
        # 3. Telif / Güncellik Analizi
        years = re.findall(r'(?:copyright|©|\(c\)|telif|hakları saklıdır)[^0-9]{0,20}(20[0-2][0-9])', html)
        if years:
            latest_year = max(int(y) for y in years)
            if latest_year <= 2022:
                flags.append(f"📅 Terk Edilmiş / Eski Site (Son Telif: {latest_year})")
                
        # 4. Eski Altyapı / WordPress / Tema Tespiti
        if 'wp-content/themes' in html:
            flags.append("⚙️ Eski WordPress Teması")
        if 'table' in html and '<table' in html and ('width="100%"' in html or 'border="0"' in html):
            flags.append("🦖 90'lardan Kalma Tablo Tasarımı")
        if 'flash' in html or '.swf' in html:
            flags.append("⚠️ Flash / Çağ Dışı Teknoloji")
            
        # Puanlama
        if len(flags) >= 2:
            verdict = "🔥 ÇOK KÖTÜ SİTE (Altın Fırsat)"
        elif len(flags) == 1:
            verdict = "⚠️ ESKİ / YENİLENMELİ"
        else:
            verdict = "✅ Ortalama / İdare Eder"
            
        return {
            "status": "ANALYZED",
            "score": verdict,
            "flags": flags,
            "load_time": f"{load_time}s"
        }
        
    except requests.exceptions.SSLError:
        return {
            "status": "SSL_ERROR",
            "score": "GÜVENSİZ",
            "flags": ["🔒 SSL Sertifikası Bozuk / Güvensiz Site Uyarısı"]
        }
    except requests.exceptions.Timeout:
        return {
            "status": "TIMEOUT",
            "score": "AÇILMIYOR",
            "flags": ["⏱️ Zaman Aşımı (Site Yanıt Vermiyor)"]
        }
    except Exception as e:
        return {
            "status": "ERROR",
            "score": "HATALI",
            "flags": [f"⚠️ Bağlantı Hatası: {str(e)[:40]}"]
        }

def hunt(query, sector, limit=10):
    if not APIFY_TOKEN or not NOTION_TOKEN:
        print("[!] APIFY_TOKEN or NOTION_TOKEN missing in .env file.")
        return
        
    print(f"[*] Starting Apify smart hunt for '{query}' in sector '{sector}' (limit: {limit})...")
    
    actor_id = 'compass~crawler-google-places'
    run_url = f'https://api.apify.com/v2/acts/{actor_id}/runs?token={APIFY_TOKEN}'
    
    run_input = {
        "searchStringsArray": [query],
        "maxCrawledPlacesPerSearch": limit,
        "language": "tr",
        "countryCode": "tr",
        "allPlacesNoSearch": False
    }
    
    resp = requests.post(run_url, json=run_input)
    if resp.status_code not in (200, 201):
        print(f"[!] Failed to start Apify actor: {resp.status_code} - {resp.text}")
        return
        
    run_data = resp.json().get('data', {})
    run_id = run_data.get('id')
    dataset_id = run_data.get('defaultDatasetId')
    print(f"[*] Run started (ID: {run_id}). Waiting for Google Maps scraping...")
    
    poll_url = f'https://api.apify.com/v2/actor-runs/{run_id}?token={APIFY_TOKEN}'
    while True:
        time.sleep(4)
        status_resp = requests.get(poll_url).json().get('data', {})
        status = status_resp.get('status')
        if status in ('SUCCEEDED', 'FAILED', 'ABORTED', 'TIMED-OUT'):
            print(f"[*] Scraping finished with status: {status}")
            break
        print(f"[*] Status: {status}... waiting")
        
    if status != 'SUCCEEDED':
        print("[!] Actor run did not succeed.")
        return
        
    items_url = f'https://api.apify.com/v2/datasets/{dataset_id}/items?token={APIFY_TOKEN}&clean=true'
    items = requests.get(items_url).json()
    print(f"[*] Found {len(items)} items. Now analyzing each website automatically...\n")
    
    notion_headers = {
        'Authorization': f'Bearer {NOTION_TOKEN}',
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
    }
    
    # Insecure request warning suppress
    requests.packages.urllib3.disable_warnings()
    
    added_count = 0
    for place in items:
        title = place.get('title')
        phone = place.get('phone') or place.get('phoneUnformatted') or ""
        website = place.get('website') or ""
        rating = place.get('totalScore', 'N/A')
        reviews = place.get('reviewsCount', 0)
        
        if not title:
            continue
            
        print(f"-> Analiz ediliyor: {title} ({website or 'Websitesi Yok'})")
        analysis = analyze_website(website)
        
        # Build comprehensive notes
        notes_parts = [f"Otomatik Av | Google Puanı: {rating} ({reviews} yorum)"]
        notes_parts.append(f"Değerlendirme: {analysis['score']}")
        if analysis['flags']:
            notes_parts.append(" | ".join(analysis['flags']))
            
        full_notes = " // ".join(notes_parts)
        
        props = {
            "İşletme Adı": {"title": [{"text": {"content": title}}]},
            "Durum": {"select": {"name": "Lead"}},
            "Sektör": {"select": {"name": sector}},
            "Notlar": {"rich_text": [{"text": {"content": full_notes[:2000]}}]}
        }
        if website:
            props["Instagram / Web"] = {"url": website}
        if phone:
            props["Telefon"] = {"phone_number": phone}
            
        page_data = {
            "parent": {"database_id": DATABASE_ID},
            "properties": props
        }
        
        r = requests.post('https://api.notion.com/v1/pages', headers=notion_headers, json=page_data)
        if r.status_code == 200:
            added_count += 1
            print(f"   [OK] Eklendi -> {analysis['score']} | {', '.join(analysis['flags'])}")
        else:
            print(f"   [!] Notion Hatası: {r.text[:80]}")
            
    print(f"\n[OK] Toplam {added_count} potansiyel müşteri otomatik analiz edilip Notion CRM'e işlendi!")

if __name__ == '__main__':
    q = sys.argv[1] if len(sys.argv) > 1 else "Bodrum VIP Transfer"
    s = sys.argv[2] if len(sys.argv) > 2 else "VIP Turizm"
    l = int(sys.argv[3]) if len(sys.argv) > 3 else 5
    hunt(q, s, l)