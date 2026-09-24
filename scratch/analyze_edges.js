const sharp = require('sharp');
const path = require('path');

async function analyzeEdges(filename) {
  const filePath = path.join(process.cwd(), 'public', 'images', 'botanical', filename);
  const { data, info } = await sharp(filePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  console.log(`\n=== Detailed Edge Analysis for ${filename} (${width}x${height}) ===`);

  // Check rows y=0..10 and y=height-11..height-1
  // and cols x=0..10 and x=width-11..width-1
  let topNonZero = [];
  for (let y = 0; y < 15; y++) {
    let count = 0;
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 0) count++;
    }
    if (count > 0) topNonZero.push(`y=${y}: ${count}px`);
  }
  console.log('Top rows non-zero:', topNonZero.slice(0, 5).join(', '));

  let botNonZero = [];
  for (let y = height - 15; y < height; y++) {
    let count = 0;
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 0) count++;
    }
    if (count > 0) botNonZero.push(`y=${y}: ${count}px`);
  }
  console.log('Bottom rows non-zero:', botNonZero.slice(-5).join(', '));

  let rightNonZero = [];
  for (let x = width - 15; x < width; x++) {
    let count = 0;
    for (let y = 0; y < height; y++) {
      if (data[(y * width + x) * 4 + 3] > 0) count++;
    }
    if (count > 0) rightNonZero.push(`x=${x}: ${count}px`);
  }
  console.log('Right cols non-zero:', rightNonZero.slice(-5).join(', '));

  let leftNonZero = [];
  for (let x = 0; x < 15; x++) {
    let count = 0;
    for (let y = 0; y < height; y++) {
      if (data[(y * width + x) * 4 + 3] > 0) count++;
    }
    if (count > 0) leftNonZero.push(`x=${x}: ${count}px`);
  }
  console.log('Left cols non-zero:', leftNonZero.slice(0, 5).join(', '));
}

async function run() {
  await analyzeEdges('branch-foliage.png');
  await analyzeEdges('flower-bud.png');
  await analyzeEdges('flower-full.png');
}

run().catch(console.error);
