import os
import re

file_path = "src/components/ui/3d-parallax-unfurling-gallery.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add import Image from "next/image" if missing
if 'import Image from "next/image"' not in content:
    content = content.replace("import { motion,", 'import Image from "next/image";\nimport { motion,')

# Replace <img ... /> with <Image ... />
# The original img looks like:
#       <img
#         src={src}
#         alt="Gallery Asset"
#         loading="lazy"
#         onLoad={onLoad}
#         className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
#       />
content = re.sub(r'<img[^>]+/>', '<Image src={src} alt="Gallery Asset" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" onLoad={onLoad} className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
