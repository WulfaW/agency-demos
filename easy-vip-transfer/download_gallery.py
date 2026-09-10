import os
import urllib.request
import re

file_path = "src/components/ui/3d-parallax-unfurling-gallery.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract URLs
urls = re.findall(r'"(https://static\.wixstatic\.com[^"]+)"', content)

# Create gallery dir
gallery_dir = "public/images/gallery"
os.makedirs(gallery_dir, exist_ok=True)

new_array_items = []
for i, url in enumerate(urls):
    filename = f"gallery_{i}.jpg"
    local_path = os.path.join(gallery_dir, filename)
    print(f"Downloading {url} to {local_path}...")
    try:
        urllib.request.urlretrieve(url, local_path)
        new_array_items.append(f'  "/images/gallery/{filename}",')
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        new_array_items.append(f'  "{url}",') # Fallback if download fails

new_array_str = "const GALLERY_IMAGES = [\n" + "\n".join(new_array_items) + "\n];"

# Replace the UNSPLASH_IMAGES array
content = re.sub(r'const UNSPLASH_IMAGES = \[[^\]]+\];', new_array_str, content, flags=re.MULTILINE|re.DOTALL)
content = content.replace("UNSPLASH_IMAGES", "GALLERY_IMAGES")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Gallery updated successfully.")
