const sharp = require('sharp');
const path = require('path');

async function cleanBranchFoliage() {
  const p = path.join(process.cwd(), 'public', 'images', 'botanical', 'branch-foliage.png');
  const srcPath = path.join('C:\\Users\\Sai Sachidhanandam\\.gemini\\antigravity-ide\\brain\\7f2485ab-3ebe-4bb1-a372-aa9284c5292d', 'botanical_branch_leaves_1789529952932.jpg');
  
  // Let's re-isolate branch-foliage from the original high-res JPG with strict color isolation and feathering
  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const outBuf = Buffer.alloc(width * height * 4);

  // Background in botanical_branch_leaves is near-white [250, 250, 248]
  // BFS flood fill from all 4 borders
  const visited = new Uint8Array(width * height);
  const queue = [];

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
    visited[(y * width + (width - 1))] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
    const x = idx % width;
    const y = Math.floor(idx / width);

    const neighbors = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nidx = ny * width + nx;
        if (!visited[nidx]) {
          const r = data[nidx * 3];
          const g = data[nidx * 3 + 1];
          const b = data[nidx * 3 + 2];
          // Near white check:
          const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
          const brightness = (r + g + b) / 3;
          if (brightness > 222 && diff < 22) {
            visited[nidx] = 1;
            queue.push(nidx);
          }
        }
      }
    }
  }

  // Also clear any isolated near-white pockets inside the leaves
  for (let i = 0; i < width * height; i++) {
    if (!visited[i]) {
      const r = data[i * 3];
      const g = data[i * 3 + 1];
      const b = data[i * 3 + 2];
      const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
      const brightness = (r + g + b) / 3;
      if (brightness > 230 && diff < 16) {
        visited[i] = 1;
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const oIdx = idx * 4;
      const r = data[idx * 3];
      const g = data[idx * 3 + 1];
      const b = data[idx * 3 + 2];

      if (visited[idx]) {
        outBuf[oIdx] = 0;
        outBuf[oIdx + 1] = 0;
        outBuf[oIdx + 2] = 0;
        outBuf[oIdx + 3] = 0;
      } else {
        // Check distance to boundary for soft anti-aliasing
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
        if (minD <= 1.0) alpha = Math.floor(minD * 110);
        else if (minD <= 2.0) alpha = Math.floor(110 + (minD - 1.0) * 145);

        // Soft organic fade on the cut-off boundary edges (so leaves don't have hard straight lines)
        let edgeDist = Math.min(x, width - 1 - x, y, height - 1 - y);
        if (edgeDist < 35) {
          const edgeFade = edgeDist / 35;
          alpha = Math.floor(alpha * edgeFade);
        }

        outBuf[oIdx] = r;
        outBuf[oIdx + 1] = g;
        outBuf[oIdx + 2] = b;
        outBuf[oIdx + 3] = alpha;
      }
    }
  }

  // Add 40px transparent margin
  await sharp(outBuf, { raw: { width, height, channels: 4 } })
    .extend({ top: 40, bottom: 40, left: 40, right: 40, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(p);

  console.log('Cleaned and saved branch-foliage.png with soft edge fade and transparent padding.');
}

cleanBranchFoliage().catch(console.error);
