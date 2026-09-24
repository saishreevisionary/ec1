const sharp = require('sharp');
const path = require('path');

async function extractPristinePetal() {
  const srcPath = path.join('C:\\Users\\Sai Sachidhanandam\\.gemini\\antigravity-ide\\brain\\7f2485ab-3ebe-4bb1-a372-aa9284c5292d', 'botanical_petals_set_1789529974096.jpg');
  
  // In botanical_petals_set, let's extract the center petal:
  // Center petal is roughly at x: 380..630, y: 380..600
  const { data, info } = await sharp(srcPath)
    .extract({ left: 370, top: 370, width: 280, height: 260 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const outBuf = Buffer.alloc(width * height * 4);

  // Background in botanical_petals_set is around [249, 249, 249]
  // Let's do flood fill from the 4 corners to isolate the petal cleanly
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Seed with all boundary pixels
  for (let x = 0; x < width; x++) {
    queue.push(0 * width + x);
    queue.push((height - 1) * width + x);
    visited[0 * width + x] = 1;
    visited[(height - 1) * width + x] = 1;
  }
  for (let y = 1; y < height - 1; y++) {
    queue.push(y * width + 0);
    queue.push(y * width + (width - 1));
    visited[y * width + 0] = 1;
    visited[y * width + (width - 1)] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
    const x = idx % width;
    const y = Math.floor(idx / width);

    const r = data[idx * 3];
    const g = data[idx * 3 + 1];
    const b = data[idx * 3 + 2];

    const neighbors = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nidx = ny * width + nx;
        if (!visited[nidx]) {
          const nr = data[nidx * 3];
          const ng = data[nidx * 3 + 1];
          const nb = data[nidx * 3 + 2];
          // If neighbor is light background (r>232, g>232, b>232 and low saturation)
          const diffMax = Math.max(Math.abs(nr - ng), Math.abs(ng - nb), Math.abs(nr - nb));
          const brightness = (nr + ng + nb) / 3;
          if (brightness > 230 && diffMax < 18) {
            visited[nidx] = 1;
            queue.push(nidx);
          }
        }
      }
    }
  }

  // Now create RGBA output with smooth alpha anti-aliasing
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const oIdx = idx * 4;
      const r = data[idx * 3];
      const g = data[idx * 3 + 1];
      const b = data[idx * 3 + 2];

      if (visited[idx]) {
        // Pure background
        outBuf[oIdx] = 0;
        outBuf[oIdx + 1] = 0;
        outBuf[oIdx + 2] = 0;
        outBuf[oIdx + 3] = 0;
      } else {
        // Petal pixel. Check distance to background for anti-aliasing
        let minD = 999;
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              if (visited[ny * width + nx]) {
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < minD) minD = dist;
              }
            }
          }
        }

        let alpha = 255;
        if (minD <= 1.0) alpha = Math.floor(minD * 120);
        else if (minD <= 2.0) alpha = Math.floor(120 + (minD - 1.0) * 135);

        outBuf[oIdx] = r;
        outBuf[oIdx + 1] = g;
        outBuf[oIdx + 2] = b;
        outBuf[oIdx + 3] = alpha;
      }
    }
  }

  // Save falling-petal.png
  const dest = path.join(process.cwd(), 'public', 'images', 'botanical', 'falling-petal.png');
  await sharp(outBuf, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(dest);

  console.log('Saved pristine falling-petal.png');
}

extractPristinePetal().catch(console.error);
