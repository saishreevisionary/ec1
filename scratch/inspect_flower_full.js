const sharp = require('sharp');
const path = require('path');

async function inspectFlowerFull() {
  const p = path.join(process.cwd(), 'public', 'images', 'botanical', 'flower-full.png');
  const { data, info } = await sharp(p).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  console.log(`Analyzing flower-full.png (${width}x${height}):`);

  // Center of flower is approximately (512, 530)
  // Let's find pixels at bottom right (x > 600, y > 750)
  let suspiciousPixels = [];
  for (let y = 750; y < height; y++) {
    for (let x = 600; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
      // Check if pixel is gray/whiteish or semi-transparent smudge
      if (a > 0 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && r > 180) {
        suspiciousPixels.push({ x, y, r, g, b, a });
      }
    }
  }

  console.log(`Found ${suspiciousPixels.length} suspicious light gray/white smudge pixels at bottom right.`);
  if (suspiciousPixels.length > 0) {
    console.log('Sample:', suspiciousPixels.slice(0, 5));
  }
}

inspectFlowerFull().catch(console.error);
