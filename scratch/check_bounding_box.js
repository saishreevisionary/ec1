const sharp = require('sharp');
const path = require('path');

async function checkImageAlpha(filename) {
  const filePath = path.join(process.cwd(), 'public', 'images', 'botanical', filename);
  const { data, info } = await sharp(filePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  console.log(`\nAnalyzing ${filename} (${width}x${height}):`);

  // Let's sample a grid of alpha values or check bounding box of non-zero alpha
  let minX = width, maxX = 0, minY = height, maxY = 0;
  let semiTransparentPixels = 0;
  let almostOpaqueBg = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = data[(y * width + x) * 4 + 3];
      if (a > 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        if (a > 0 && a < 250) semiTransparentPixels++;
      }
    }
  }

  console.log(`  Alpha bounding box: X: [${minX}, ${maxX}] (${maxX - minX + 1}px), Y: [${minY}, ${maxY}] (${maxY - minY + 1}px)`);
  console.log(`  Semi-transparent pixels: ${semiTransparentPixels}`);

  // Check if near the bounding box edges it looks like a straight line (rectangle)
  // For minX, maxX, minY, maxY: how many pixels on those lines are non-zero?
  let topEdgeCount = 0, botEdgeCount = 0, leftEdgeCount = 0, rightEdgeCount = 0;
  for (let x = minX; x <= maxX; x++) {
    if (data[(minY * width + x) * 4 + 3] > 0) topEdgeCount++;
    if (data[(maxY * width + x) * 4 + 3] > 0) botEdgeCount++;
  }
  for (let y = minY; y <= maxY; y++) {
    if (data[(y * width + minX) * 4 + 3] > 0) leftEdgeCount++;
    if (data[(y * width + maxX) * 4 + 3] > 0) rightEdgeCount++;
  }
  console.log(`  Bounding box edges non-zero count: Top: ${topEdgeCount}/${maxX-minX+1}, Bot: ${botEdgeCount}/${maxX-minX+1}, Left: ${leftEdgeCount}/${maxY-minY+1}, Right: ${rightEdgeCount}/${maxY-minY+1}`);
}

async function run() {
  await checkImageAlpha('flower-bud.png');
  await checkImageAlpha('flower-full.png');
  await checkImageAlpha('branch-foliage.png');
  await checkImageAlpha('bloom-layer-outer-top.png');
}

run().catch(console.error);
