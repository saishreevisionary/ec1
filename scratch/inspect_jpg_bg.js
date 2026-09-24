const sharp = require('sharp');
const path = require('path');

async function inspectJpg(name) {
  const p = path.join('C:\\Users\\Sai Sachidhanandam\\.gemini\\antigravity-ide\\brain\\7f2485ab-3ebe-4bb1-a372-aa9284c5292d', name);
  const { data, info } = await sharp(p).raw().toBuffer({ resolveWithObject: true });
  console.log(`\n=== ${name} (${info.width}x${info.height}, channels=${info.channels}) ===`);

  // Sample corners
  const sample = (x, y) => {
    const idx = (y * info.width + x) * info.channels;
    return [data[idx], data[idx+1], data[idx+2]];
  };

  console.log('Corner TL:', sample(10, 10));
  console.log('Corner TR:', sample(info.width - 11, 10));
  console.log('Corner BL:', sample(10, info.height - 11));
  console.log('Corner BR:', sample(info.width - 11, info.height - 11));

  // Check how many pixels are nearly pure white (r > 240, g > 240, b > 240)
  let nearWhite = 0;
  let total = info.width * info.height;
  for (let i = 0; i < total; i++) {
    const r = data[i * info.channels];
    const g = data[i * info.channels + 1];
    const b = data[i * info.channels + 2];
    if (r > 245 && g > 245 && b > 245) nearWhite++;
  }
  console.log(`Near-white pixels: ${nearWhite}/${total} (${((nearWhite/total)*100).toFixed(1)}%)`);
}

async function run() {
  await inspectJpg('botanical_flower_isolated_1789529914854.jpg');
  await inspectJpg('botanical_rose_bud_1789529934272.jpg');
  await inspectJpg('botanical_branch_leaves_1789529952932.jpg');
  await inspectJpg('botanical_petals_set_1789529974096.jpg');
}

run().catch(console.error);
