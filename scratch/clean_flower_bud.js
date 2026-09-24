const sharp = require('sharp');
const path = require('path');

async function cleanFlowerBud() {
  const p = path.join(process.cwd(), 'public', 'images', 'botanical', 'flower-bud.png');
  const { data, info } = await sharp(p).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  let cleared = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];

      if (a > 0) {
        // Clear near-white background pixels
        if (r > 220 && g > 220 && b > 220 && Math.abs(r - g) < 18 && Math.abs(g - b) < 18) {
          data[idx+3] = 0;
          cleared++;
        }
        // Smoothly taper the bottom of the stem (y > 960 to 1024)
        if (y > 960) {
          const progress = (y - 960) / (1024 - 960); // 0 to 1
          // Fade alpha gradually to 0
          data[idx+3] = Math.floor(data[idx+3] * (1 - progress));
        }
      }
    }
  }

  // Ensure 20px transparent border all around
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x < 20 || x > width - 21 || y < 20 || y > height - 21) {
        data[(y * width + x) * 4 + 3] = 0;
      }
    }
  }

  await sharp(data, { raw: { width, height, channels: 4 } }).png().toFile(p);
  console.log(`Cleaned flower-bud.png: cleared ${cleared} near-white pixels.`);
}

cleanFlowerBud().catch(console.error);
