import os
import re

def fix_page(filepath, tr_sub, tr_title):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We just need to find the `default: return { sub: '{texts.sub}', title: ... };` line 
    # and replace the `{texts.sub}` with actual tr_sub, etc.
    import re
    # We can just replace the whole default line
    # The default line looks like: default: return { sub: '{texts.sub}', title: '<span dangerouslySetInnerHTML={{__html: texts.title}}></span>' };
    # Or in services: default: return { sub: '{texts.sub}', title: '{texts.title}', desc: '{texts.desc}' };
    
    # Actually, simpler: just find the default: return { ... } and replace it using regex.
    if "araclarimiz" in filepath:
        content = re.sub(r"default: return \{ sub: '\{texts\.sub\}', title: '<span dangerouslySetInnerHTML=\{\{__html: texts\.title\}\}></span>' \};", f"default: return {{ sub: '{tr_sub}', title: '{tr_title}' }};", content)
    elif "bolgelerimiz" in filepath or "hizmetlerimiz" in filepath:
        content = re.sub(r"default: return \{ sub: '\{texts\.sub\}', title: '\{texts\.title\}' \};", f"default: return {{ sub: '{tr_sub}', title: '{tr_title}' }};", content)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_page("src/app/araclarimiz/page.tsx", "Premium Araç Filomuz", "Yolculuğunuzu Şekillendiren<br/>Özel Koleksiyon")
fix_page("src/app/bolgelerimiz/page.tsx", "Popüler Rotalar", "Lüks Destinasyonlar & Marinalar")
fix_page("src/app/hizmetlerimiz/page.tsx", "Ayrıcalıklar", "Özel VIP Hizmetlerimiz")

# SpotlightServices
with open("src/components/SpotlightServices.tsx", 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace("default: return { sub: '{texts.sub}', title: '{texts.title}', desc: '{texts.desc}' };", "default: return { sub: 'PREMIUM HİZMETLER', title: 'Size Özel Ayrıcalıklar', desc: 'Standartların ötesinde VIP deneyimi.' };")
with open("src/components/SpotlightServices.tsx", 'w', encoding='utf-8') as f:
    f.write(content)

# FaqAndFooter
with open("src/components/FaqAndFooter.tsx", 'r', encoding='utf-8') as f:
    content = f.read()
# In FaqAndFooter the line is: default: return { faqTitle: '{texts.faqTitle}', faqSub: '{texts.faqSub}', faqHelp: '{texts.faqHelp}', footerDesc: '{texts.footerDesc}', quick: '{texts.quick}', contact: 'İletişim' };
content = re.sub(r"default: return \{ faqTitle: '\{texts\.faqTitle\}', faqSub: '\{texts\.faqSub\}', faqHelp: '\{texts\.faqHelp\}', footerDesc: '\{texts\.footerDesc\}', quick: '\{texts\.quick\}', contact: 'İletişim' \};", "default: return { faqTitle: 'Sıkça Sorulan Sorular', faqSub: 'Premium transfer deneyiminiz hakkında merak ettiğiniz her şey.', faqHelp: 'Başka bir sorunuz mu var?', footerDesc: 'Bodrum\\'un Zirvesindeki VIP Transfer Deneyimi.', quick: 'Hızlı Linkler', contact: 'İletişim' };", content)
with open("src/components/FaqAndFooter.tsx", 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed TR placeholders")
