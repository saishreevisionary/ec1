const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function inspectAll() {
  const dir = path.join(process.cwd(), 'public', 'images', 'botanical');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.jpg'));

  console.log('Inspecting ' + files.length + ' images in ' + dir + '...\n');

  for (const file of files) {
    const filePath = path.join(dir, file);
    const meta = await sharp(filePath).metadata();
    
    // Get raw pixel buffer
    const { data, info } = await sharp(filePath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;
    const channels = info.channels; // 4 (RGBA)

    // Check corner pixels (alpha)
    const tl = data[3];
    const tr = data[(width - 1) * 4 + 3];
    const bl = data[((height - 1) * width) * 4 + 3];
    const br = data[((height - 1) * width + (width - 1)) * 4 + 3];

    // Check border pixels: top row, bottom row, left col, right col
    let borderNonZero = 0;
    let borderMaxAlpha = 0;
    let borderAlphaSum = 0;
    let borderPixelsCount = (width * 2) + ((height - 2) * 2);

    // Top & bottom rows
    for (let x = 0; x < width; x++) {
      const topAlpha = data[x * 4 + 3];
      const botAlpha = data[((height - 1) * width + x) * 4 + 3];
      if (topAlpha > 0) {
        borderNonZero++;
        borderMaxAlpha = Math.max(borderMaxAlpha, topAlpha);
        borderAlphaSum += topAlpha;
      }
      if (botAlpha > 0) {
        borderNonZero++;
        borderMaxAlpha = Math.max(borderMaxAlpha, botAlpha);
        borderAlphaSum += botAlpha;
      }
    }

    // Left & right cols (excluding corners already counted)
    for (let y = 1; y < height - 1; y++) {
      const leftAlpha = data[(y * width) * 4 + 3];
      const rightAlpha = data[(y * width + (width - 1)) * 4 + 3];
      if (leftAlpha > 0) {
        borderNonZero++;
        borderMaxAlpha = Math.max(borderMaxAlpha, leftAlpha);
        borderAlphaSum += leftAlpha;
      }
      if (rightAlpha > 0) {
        borderNonZero++;
        borderMaxAlpha = Math.max(borderMaxAlpha, rightAlpha);
        borderAlphaSum += rightAlpha;
      }
    }

    console.log(`[${file}] ${width}x${height}, channels:${meta.channels}, format:${meta.format}`);
    console.log(`   Corners (TL, TR, BL, BR): [${tl}, ${tr}, ${bl}, ${br}]`);
    console.log(`   Border: nonZero=${borderNonZero}/${borderPixelsCount} (${((borderNonZero/borderPixelsCount)*100).toFixed(1)}%), maxAlpha=${borderMaxAlpha}, avgAlpha=${(borderAlphaSum/borderPixelsCount).toFixed(2)}`);
  }
}

inspectAll().catch(console.error);
