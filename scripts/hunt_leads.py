import sys
import os
import time
import requests

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

def hunt(query, sector, limit=10):
    if not APIFY_TOKEN or not NOTION_TOKEN:
        print("[!] APIFY_TOKEN or NOTION_TOKEN missing in .env file.")
        return
        
    print(f"[*] Starting Apify hunt for '{query}' in sector '{sector}' (limit: {limit})...")
    
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
    print(f"[*] Run started (ID: {run_id}). Waiting for completion...")
    
    poll_url = f'https://api.apify.com/v2/actor-runs/{run_id}?token={APIFY_TOKEN}'
    while True:
        time.sleep(4)
        status_resp = requests.get(poll_url).json().get('data', {})
        status = status_resp.get('status')
        if status in ('SUCCEEDED', 'FAILED', 'ABORTED', 'TIMED-OUT'):
            print(f"[*] Run finished with status: {status}")
            break
        print(f"[*] Status: {status}... waiting")
        
    if status != 'SUCCEEDED':
        print("[!] Actor run did not succeed.")
        return
        
    items_url = f'https://api.apify.com/v2/datasets/{dataset_id}/items?token={APIFY_TOKEN}&clean=true'
    items = requests.get(items_url).json()
    print(f"[*] Found {len(items)} items from Google Maps.")
    
    notion_headers = {
        'Authorization': f'Bearer {NOTION_TOKEN}',
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
    }
    
    added_count = 0
    for place in items:
        title = place.get('title')
        phone = place.get('phone') or place.get('phoneUnformatted') or ""
        website = place.get('website') or ""
        rating = place.get('totalScore', 'N/A')
        reviews = place.get('reviewsCount', 0)
        
        if not title:
            continue
            
        notes = f"Google Maps Otomatik Av. Puan: {rating} ({reviews} yorum)."
        if not website:
            notes += " [WEBSİTESİ YOK - Sıfırdan satış adayı]"
            
        props = {
            "İşletme Adı": {"title": [{"text": {"content": title}}]},
            "Durum": {"select": {"name": "Lead"}},
            "Sektör": {"select": {"name": sector}},
            "Notlar": {"rich_text": [{"text": {"content": notes}}]}
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
            print(f"  [+] Added: {title} | Tel: {phone} | Web: {website or 'YOK'}")
        else:
            print(f"  [-] Failed to add {title}: {r.text}")
            
    print(f"\n[OK] Successfully added {added_count} leads to Notion CRM!")

if __name__ == '__main__':
    q = sys.argv[1] if len(sys.argv) > 1 else "Bodrum VIP Transfer"
    s = sys.argv[2] if len(sys.argv) > 2 else "VIP Turizm"
    l = int(sys.argv[3]) if len(sys.argv) > 3 else 5
    hunt(q, s, l)