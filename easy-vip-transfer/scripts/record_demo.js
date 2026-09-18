const { chromium } = require('playwright');
const path = require('path');

async function smoothScroll(page, distance, duration) {
  const steps = 60; // 60 FPS
  const interval = duration / steps;
  const stepDistance = distance / steps;
  
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, stepDistance);
    await page.waitForTimeout(interval);
  }
}

(async () => {
  console.log('🎬 Kayıt başlıyor... Lütfen localhost:3000 açık olduğundan emin olun.');
  
  // Launch browser with slowMo for natural human-like speed
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: path.join(__dirname, '..', 'demo_videos'),
      size: { width: 1920, height: 1080 },
    }
  });

  const page = await context.newPage();

  console.log('🌐 Siteye gidiliyor...');
  await page.goto('http://localhost:3000');
  
  // Wait for initial animations
  await page.waitForTimeout(2000);

  console.log('📜 Yumuşak kaydırma testi...');
  
  // Slowly scroll down the hero section
  await smoothScroll(page, 500, 2000);
  await page.waitForTimeout(1000);

  // Scroll to Price Calculator
  await smoothScroll(page, 500, 2000);
  await page.waitForTimeout(1000);

  console.log('🖱️ Rezervasyon formu tıklamaları (Demo)...');
  
  // Just click inside the date or from/to location to show interaction
  await page.mouse.move(960, 500); // Move mouse to center
  
  // Scroll down more to see the fleet
  console.log('🚗 Araçlar bölümüne kaydırılıyor...');
  await smoothScroll(page, 1000, 3000);
  await page.waitForTimeout(1500);

  // Scroll down to Services
  console.log('💎 VIP Hizmetler bölümü...');
  await smoothScroll(page, 1200, 3000);
  await page.waitForTimeout(1000);
  
  // Scroll to Experience section
  console.log('✨ Deneyim (Sticky Scroll) bölümü...');
  await smoothScroll(page, 1500, 4000);
  await page.waitForTimeout(4000);

  // Scroll to Footer
  await smoothScroll(page, 1000, 3000);
  await page.waitForTimeout(1000);

  console.log('✅ Kayıt tamamlandı. Video kaydediliyor...');
  await context.close();
  await browser.close();

  console.log('📁 Video demo_videos/ klasörüne kaydedildi!');
})();
