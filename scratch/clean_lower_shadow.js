const sharp = require('sharp');
const path = require('path');

async function cleanLowerShadow() {
  const p = path.join(process.cwd(), 'public', 'images', 'botanical', 'flower-full.png');
  const { data, info } = await sharp(p).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  let cleared = 0;
  for (let y = 850; y < height; y++) {
    for (let x = 450; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
      if (a > 0) {
        // Shadow is gray / whitish: |r-g| < 18, |g-b| < 18, r > 180
        if (Math.abs(r - g) < 18 && Math.abs(g - b) < 18 && r > 180) {
          data[idx+3] = 0;
          cleared++;
        }
      }
    }
  }

  await sharp(data, { raw: { width, height, channels: 4 } }).png().toFile(p);
  console.log(`Cleared ${cleared} more bottom shadow pixels.`);
}

cleanLowerShadow().catch(console.error);
