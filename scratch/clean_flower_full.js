const sharp = require('sharp');
const path = require('path');

async function cleanFlowerFull() {
  const p = path.join(process.cwd(), 'public', 'images', 'botanical', 'flower-full.png');
  const { data, info } = await sharp(p).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // The center of the flower is at (512, 530)
  // Let's clear any pixel with high brightness / low saturation (the studio cast shadow on the white background)
  // that is outside the pink petal boundary
  let cleared = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      const a = data[idx+3];

      if (a > 0) {
        // Check if this is background gray shadow
        // Shadows have low saturation: |r-g| < 15, |g-b| < 15, |r-b| < 15, and r > 160
        const isGray = (Math.abs(r - g) < 14 && Math.abs(g - b) < 14 && Math.abs(r - b) < 14 && r > 160);
        // Or if it's near the bottom right corner:
        if (isGray && (x > 580 && y > 720)) {
          data[idx+3] = 0;
          cleared++;
        }
      }
    }
  }

  // Now ensure a clean 20px transparent border around the entire 1024x1024 canvas
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x < 25 || x > width - 26 || y < 25 || y > height - 26) {
        data[(y * width + x) * 4 + 3] = 0;
      }
    }
  }

  const out = await sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(p);

  console.log(`Cleaned flower-full.png: cleared ${cleared} shadow pixels.`);
}

cleanFlowerFull().catch(console.error);
