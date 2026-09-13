const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: 'upwork_showcase/',
      size: { width: 1920, height: 1080 }
    },
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2 // Retain high quality
  });
  
  const page = await context.newPage();
  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Wait for initial hero animations
  console.log('Waiting for initial animations...');
  await page.waitForTimeout(3000);
  
  // Custom scroll logic for a smooth, cinematic 30s scroll
  console.log('Starting smooth scroll...');
  await page.evaluate(async () => {
    return new Promise((resolve) => {
      let totalHeight = 0;
      // We want to scroll slowly. 
      // 30 seconds = 30000ms. If we do ~60fps (16ms per frame), that's ~1875 frames.
      // We will step dynamically until we reach the bottom.
      const distance = 8; 
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 16);
    });
  });
  
  console.log('Reached bottom. Waiting 2 seconds...');
  await page.waitForTimeout(2000); // wait at bottom
  
  console.log('Closing browser and saving video...');
  await context.close();
  await browser.close();
  
  // Rename the video to something friendly
  const dir = path.join(__dirname, 'upwork_showcase');
  const files = fs.readdirSync(dir);
  const webmFile = files.find(f => f.endsWith('.webm'));
  if (webmFile) {
    const oldPath = path.join(dir, webmFile);
    const newPath = path.join(dir, 'easy_vip_showcase.webm');
    fs.renameSync(oldPath, newPath);
    console.log(`Saved video to ${newPath}`);
  }
})();
