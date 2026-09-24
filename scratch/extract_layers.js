const sharp = require('sharp');
const path = require('path');

async function extractLayers() {
  const flowerPath = path.join(process.cwd(), 'public', 'images', 'botanical', 'flower-full.png');
  const dir = path.join(process.cwd(), 'public', 'images', 'botanical');
  
  const { data: flowerData, info } = await sharp(flowerPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const cx = 512, cy = 525;

  const createLayer = async (filename, maskFn) => {
    const outBuf = Buffer.alloc(width * height * 4);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const srcAlpha = flowerData[idx + 3];
        if (srcAlpha > 0 && maskFn(x, y, cx, cy)) {
          outBuf[idx] = flowerData[idx];
          outBuf[idx + 1] = flowerData[idx + 1];
          outBuf[idx + 2] = flowerData[idx + 2];
          // Calculate feathered alpha near mask boundary
          outBuf[idx + 3] = srcAlpha;
        }
      }
    }
    await sharp(outBuf, { raw: { width, height, channels: 4 } }).png().toFile(path.join(dir, filename));
    console.log(`Generated layer: ${filename}`);
  };

  // 1. Golden Stamen (Center core r < 125)
  await createLayer('bloom-layer-stamen.png', (x, y, cx, cy) => {
    const d = Math.hypot(x - cx, y - cy);
    return d < 125;
  });

  // 2. Inner Petals (Ring 110 < r < 230)
  await createLayer('bloom-layer-inner.png', (x, y, cx, cy) => {
    const d = Math.hypot(x - cx, y - cy);
    return d < 230;
  });

  // 3. Mid Petals (Ring r < 340)
  await createLayer('bloom-layer-mid.png', (x, y, cx, cy) => {
    const d = Math.hypot(x - cx, y - cy);
    return d < 340;
  });

  // 4. Outer Top Petal
  await createLayer('bloom-layer-outer-top.png', (x, y, cx, cy) => {
    const angle = Math.atan2(y - cy, x - cx) * 180 / Math.PI; // -180 to 180
    const d = Math.hypot(x - cx, y - cy);
    return d >= 220 && angle >= -135 && angle <= -45;
  });

  // 5. Outer Top-Right Petal
  await createLayer('bloom-layer-outer-topright.png', (x, y, cx, cy) => {
    const angle = Math.atan2(y - cy, x - cx) * 180 / Math.PI;
    const d = Math.hypot(x - cx, y - cy);
    return d >= 220 && angle >= -55 && angle <= 20;
  });

  // 6. Outer Bottom-Right Petal
  await createLayer('bloom-layer-outer-botright.png', (x, y, cx, cy) => {
    const angle = Math.atan2(y - cy, x - cx) * 180 / Math.PI;
    const d = Math.hypot(x - cx, y - cy);
    return d >= 220 && angle >= 15 && angle <= 85;
  });

  // 7. Outer Bottom-Left Petal
  await createLayer('bloom-layer-outer-botleft.png', (x, y, cx, cy) => {
    const angle = Math.atan2(y - cy, x - cx) * 180 / Math.PI;
    const d = Math.hypot(x - cx, y - cy);
    return d >= 220 && angle >= 80 && angle <= 165;
  });

  // 8. Outer Left Petal
  await createLayer('bloom-layer-outer-left.png', (x, y, cx, cy) => {
    const angle = Math.atan2(y - cy, x - cx) * 180 / Math.PI;
    const d = Math.hypot(x - cx, y - cy);
    return d >= 220 && (angle >= 160 || angle <= -130);
  });
}

extractLayers().catch(console.error);
