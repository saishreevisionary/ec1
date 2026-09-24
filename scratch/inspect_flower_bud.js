const sharp = require('sharp');
const path = require('path');

async function inspectFlowerBud() {
  const p = path.join(process.cwd(), 'public', 'images', 'botanical', 'flower-bud.png');
  const { data, info } = await sharp(p).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  console.log(`Analyzing flower-bud.png (${width}x${height}):`);

  // Check how many non-zero alpha pixels exist that are near-white / gray
  let bgPixels = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
      if (a > 0 && r > 230 && g > 230 && b > 230) {
        bgPixels++;
      }
    }
  }

  console.log(`Found ${bgPixels} near-white pixels with alpha > 0 in flower-bud.png.`);
}

inspectFlowerBud().catch(console.error);
