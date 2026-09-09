import os

def process_file(filepath, texts_dict, tr_replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
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

# SpotlightServices
process_file(
    "src/components/SpotlightServices.tsx",
    {
        "EN": "{ sub: 'PREMIUM SERVICES', title: 'Exclusive Privileges', desc: 'Beyond standards, an Aegean VIP experience.' }",
        "RU": "{ sub: 'ПРЕМИУМ УСЛУГИ', title: 'Эксклюзивные Привилегии', desc: 'За гранью стандартов, эгейский VIP-опыт.' }",
        "DE": "{ sub: 'PREMIUM-DIENSTE', title: 'Exklusive Privilegien', desc: 'Jenseits von Standards, ein VIP-Erlebnis in der Ägäis.' }",
        "AR": "{ sub: 'خدمات ممتازة', title: 'امتيازات حصرية', desc: 'خارج المعايير، تجربة كبار الشخصيات في بحر إيجة.' }",
        "TR": "{ sub: 'PREMIUM HİZMETLER', title: 'Size Özel Ayrıcalıklar', desc: 'Standartların ötesinde VIP deneyimi.' }"
    },
    {
        "PREMIUM HİZMETLER": "{texts.sub}",
        "Size Özel Ayrıcalıklar": "{texts.title}",
        "Standartların ötesinde VIP deneyimi.": "{texts.desc}"
    }
)

# FaqAndFooter
process_file(
    "src/components/FaqAndFooter.tsx",
    {
        "EN": "{ faqTitle: 'Frequently Asked Questions', faqSub: 'Everything you need to know about your luxury transfer experience.', faqHelp: 'Do you have another question?', footerDesc: 'Bodrum\\'s Premier Luxury Chauffeur Service.', quick: 'Quick Links', contact: 'Contact' }",
        "RU": "{ faqTitle: 'Часто Задаваемые Вопросы', faqSub: 'Все, что вам нужно знать о вашем роскошном трансфере.', faqHelp: 'У вас есть другой вопрос?', footerDesc: 'Премиум VIP Трансфер в Бодруме.', quick: 'Ссылки', contact: 'Контакты' }",
        "DE": "{ faqTitle: 'Häufig Gestellte Fragen', faqSub: 'Alles, was Sie über Ihren luxuriösen Transfer wissen müssen.', faqHelp: 'Haben Sie eine andere Frage?', footerDesc: 'Bodrums Erstklassiger VIP-Transfer.', quick: 'Links', contact: 'Kontakt' }",
        "AR": "{ faqTitle: 'الأسئلة الشائعة', faqSub: 'كل ما تحتاج لمعرفته حول تجربة النقل الفاخر الخاصة بك.', faqHelp: 'هل لديك سؤال آخر؟', footerDesc: 'خدمة نقل كبار الشخصيات الأولى في بودروم.', quick: 'روابط', contact: 'اتصال' }",
        "TR": "{ faqTitle: 'Sıkça Sorulan Sorular', faqSub: 'Premium transfer deneyiminiz hakkında merak ettiğiniz her şey.', faqHelp: 'Başka bir sorunuz mu var?', footerDesc: 'Bodrum\\'un Zirvesindeki VIP Transfer Deneyimi.', quick: 'Hızlı Linkler', contact: 'İletişim' }"
    },
    {
        "Sıkça Sorulan Sorular": "{texts.faqTitle}",
        "Premium transfer deneyiminiz hakkında merak ettiğiniz her şey.": "{texts.faqSub}",
        "Başka bir sorunuz mu var?": "{texts.faqHelp}",
        "Bodrum'un Zirvesindeki VIP Transfer Deneyimi.": "{texts.footerDesc}",
        "Hızlı Linkler": "{texts.quick}",
        ">İletişim<": ">{texts.contact}<"
    }
)

print("Components processed successfully!")
