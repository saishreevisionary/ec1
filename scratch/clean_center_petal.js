const sharp = require('sharp');
const path = require('path');

async function cleanOnlyCenterPetal() {
  const p = path.join(process.cwd(), 'public', 'images', 'botanical', 'falling-petal.png');
  const { data, info } = await sharp(p).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // The center petal contains pixel (width/2, height/2) which is roughly (140, 130)
  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);

  // BFS from center to find all connected pixels of the center petal
  const visited = new Uint8Array(width * height);
  const queue = [cy * width + cx];
  visited[cy * width + cx] = 1;

  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
    const x = idx % width;
    const y = Math.floor(idx / width);

    const neighbors = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1],
      [x + 1, y + 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nidx = ny * width + nx;
        if (!visited[nidx] && data[nidx * 4 + 3] > 0) {
          visited[nidx] = 1;
          queue.push(nidx);
        }
      }
    }
  }

  // Any pixel not part of the center petal gets alpha = 0
  for (let i = 0; i < width * height; i++) {
    if (!visited[i]) {
      data[i * 4 + 3] = 0;
    }
  }

  // Also pad with 30px transparent margin
  const out = await sharp(data, { raw: { width, height, channels: 4 } })
    .extend({ top: 30, bottom: 30, left: 30, right: 30, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(p);

  console.log('Cleaned center petal only:', out);
}

cleanOnlyCenterPetal().catch(console.error);
