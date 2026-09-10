import os
import glob

files = [
    "src/app/araclarimiz/page.tsx",
    "src/app/bolgelerimiz/page.tsx",
    "src/app/hizmetlerimiz/page.tsx",
    "src/components/FaqAndFooter.tsx",
    "src/components/SpotlightServices.tsx"
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We just need to change `case 'TR': return` to `default: return`
    content = content.replace("case 'TR': return", "default: return")
    
    # Also fix some other issues: if there is an explicit return for TR, it might still have `}` after it.
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed default cases!")
