import os

def process_file(filepath, texts_dict, tr_replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "use client" not in content:
        content = "'use client';\n" + content
    
    if "useLanguage" not in content:
        content = content.replace("import React from 'react';", "import React from 'react';\nimport { useLanguage } from '@/context/LanguageContext';")
    
    # insert lang and getTexts inside the component
    func_def_index = content.find("export default function")
    func_body_start = content.find("{", func_def_index) + 1
    
    if "const { lang } = useLanguage();" not in content:
        texts_str = "  const { lang } = useLanguage();\n  const getTexts = () => {\n    switch(lang) {\n"
        for k, v in texts_dict.items():
            texts_str += f"      case '{k}': return {v};\n"
        texts_str += "    }\n  };\n  const texts = getTexts();\n"
        
        content = content[:func_body_start] + "\n" + texts_str + content[func_body_start:]
        
    for k, v in tr_replacements.items():
        content = content.replace(k, v)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Araclarimiz
process_file(
    "src/app/araclarimiz/page.tsx",
    {
        "EN": "{ sub: 'Premium Fleet', title: 'The Exclusive Collection<br/>Shaping Your Journey' }",
        "RU": "{ sub: 'Премиум Автопарк', title: 'Эксклюзивная Коллекция<br/>Для Вашего Путешествия' }",
        "DE": "{ sub: 'Premium-Flotte', title: 'Die exklusive Kollektion<br/>für Ihre Reise' }",
        "AR": "{ sub: 'أسطول فاخر', title: 'المجموعة الحصرية<br/>التي تشكل رحلتك' }",
        "TR": "{ sub: 'Premium Araç Filomuz', title: 'Yolculuğunuzu Şekillendiren<br/>Özel Koleksiyon' }"
    },
    {
        "Premium Araç Filomuz": "{texts.sub}",
        "Yolculuğunuzu Şekillendiren<br/>Özel Koleksiyon": "<span dangerouslySetInnerHTML={{__html: texts.title}}></span>"
    }
)

# Hizmetlerimiz
process_file(
    "src/app/hizmetlerimiz/page.tsx",
    {
        "EN": "{ sub: 'Privileges', title: 'Our Exclusive VIP Services' }",
        "RU": "{ sub: 'Привилегии', title: 'Эксклюзивные VIP-Услуги' }",
        "DE": "{ sub: 'Privilegien', title: 'Unsere Exklusiven VIP-Dienste' }",
        "AR": "{ sub: 'الامتيازات', title: 'خدماتنا الحصرية لكبار الشخصيات' }",
        "TR": "{ sub: 'Ayrıcalıklar', title: 'Özel VIP Hizmetlerimiz' }"
    },
    {
        "Ayrıcalıklar": "{texts.sub}",
        "Özel VIP Hizmetlerimiz": "{texts.title}"
    }
)

# Bolgelerimiz
process_file(
    "src/app/bolgelerimiz/page.tsx",
    {
        "EN": "{ sub: 'Popular Routes', title: 'Luxury Destinations & Marinas' }",
        "RU": "{ sub: 'Популярные Маршруты', title: 'Элитные Направления и Марины' }",
        "DE": "{ sub: 'Beliebte Routen', title: 'Luxusziele & Yachthäfen' }",
        "AR": "{ sub: 'الطرق الشائعة', title: 'الوجهات الفاخرة والمراسي' }",
        "TR": "{ sub: 'Popüler Rotalar', title: 'Lüks Destinasyonlar & Marinalar' }"
    },
    {
        "Popüler Rotalar": "{texts.sub}",
        "Lüks Destinasyonlar & Marinalar": "{texts.title}"
    }
)

print("Pages processed successfully!")
