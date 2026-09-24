const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function renderFinalCanopy() {
  const dir = path.join(process.cwd(), 'public', 'images', 'botanical');
  const W = 450;
  const H = 600;

  // Background like website
  const base = sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: { r: 245, g: 242, b: 233, alpha: 1 }
    }
  });

  // 1. Stem SVG rendered to buffer
  const stemSvg = `
  <svg width="380" height="520" viewBox="0 0 380 520" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="roseStemNetworkGrad" x1="90%" y1="0%" x2="20%" y2="100%">
        <stop offset="0%" stop-color="#1B422B" />
        <stop offset="35%" stop-color="#2E5E3E" />
        <stop offset="70%" stop-color="#3E7750" />
        <stop offset="100%" stop-color="#558C67" />
      </linearGradient>
      <linearGradient id="sepalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4A845C" />
        <stop offset="100%" stop-color="#224C34" />
      </linearGradient>
    </defs>
    <path d="M 350 -10 C 335 45, 290 95, 220 160 C 180 200, 160 250, 195 315 C 220 355, 225 390, 185 460 C 170 485, 155 505, 140 520" stroke="url(#roseStemNetworkGrad)" stroke-width="4.5" stroke-linecap="round"/>
    <g transform="translate(220, 160)">
      <ellipse cx="0" cy="8" rx="8" ry="6" fill="#2A593A" />
      <path d="M -6 6 C -18 10, -28 3, -34 -12 C -24 -6, -12 -1, -4 4 Z" fill="url(#sepalGrad)" />
      <path d="M 6 6 C 18 10, 28 3, 34 -12 C 24 -6, 12 -1, 4 4 Z" fill="url(#sepalGrad)" />
      <path d="M -2 9 C -10 24, -18 32, -30 38 C -22 28, -12 20, 0 10 Z" fill="url(#sepalGrad)" />
      <path d="M 2 9 C 10 24, 18 32, 30 38 C 22 28, 12 20, 0 10 Z" fill="url(#sepalGrad)" />
      <path d="M 0 10 C 0 28, 4 42, 6 52 C 2 40, -1 26, 0 10 Z" fill="#3D754F" />
    </g>
    <g transform="translate(210, 360)">
      <ellipse cx="0" cy="6" rx="7" ry="5" fill="#2A593A" />
      <path d="M -5 5 C -15 8, -24 2, -28 -10 C -20 -4, -10 0, -3 3 Z" fill="url(#sepalGrad)" />
      <path d="M 5 5 C 15 8, 24 2, 28 -10 C 20 -4, 10 0, 3 3 Z" fill="url(#sepalGrad)" />
      <path d="M -2 7 C -8 20, -15 26, -24 30 C -18 22, -10 16, 0 8 Z" fill="url(#sepalGrad)" />
    </g>
    <path d="M 310 35 L 320 38 L 314 42 Z" fill="#1B422B" />
    <path d="M 268 95 L 278 100 L 271 104 Z" fill="#244E33" />
    <path d="M 175 220 L 165 224 L 172 228 Z" fill="#2E5E3E" />
    <path d="M 180 270 L 170 275 L 178 279 Z" fill="#2E5E3E" />
    <path d="M 205 410 L 214 415 L 208 418 Z" fill="#3A704B" />
  </svg>
  `;
  const stemBuf = await sharp(Buffer.from(stemSvg)).png().toBuffer();

  // 2. Leaf foliage
  const leafTopBuf = await sharp(path.join(dir, 'branch-foliage.png'))
    .resize(190, 190, { fit: 'contain' })
    .flop()
    .rotate(25, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const leafMidBuf = await sharp(path.join(dir, 'branch-foliage.png'))
    .resize(200, 200, { fit: 'contain' })
    .rotate(-40, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const leafBotBuf = await sharp(path.join(dir, 'branch-foliage.png'))
    .resize(180, 180, { fit: 'contain' })
    .flop()
    .rotate(10, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // 3. Flower bud (closed stage)
  const budBuf = await sharp(path.join(dir, 'flower-bud.png'))
    .resize(180, 180, { fit: 'contain' })
    .toBuffer();

  // 4. Secondary full rose
  const secRoseBuf = await sharp(path.join(dir, 'flower-full.png'))
    .resize(155, 155, { fit: 'contain' })
    .toBuffer();

  // 5. Composite Stage A: Closed Bud
  await base
    .composite([
      { input: stemBuf, top: 0, left: 30 },
      { input: leafTopBuf, top: 15, left: 160 },
      { input: leafMidBuf, top: 165, left: 60 },
      { input: leafBotBuf, top: 345, left: 80 },
      { input: budBuf, top: 50, left: 140 },
      { input: secRoseBuf, top: 285, left: 130 }
    ])
    .png()
    .toFile(path.join(process.cwd(), 'scratch', 'final_canopy_bud.png'));

  // 6. Composite Stage B: Full Bloom
  const fullRoseTopBuf = await sharp(path.join(dir, 'flower-full.png'))
    .resize(190, 190, { fit: 'contain' })
    .toBuffer();

  const baseB = sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: { r: 245, g: 242, b: 233, alpha: 1 }
    }
  });

  await baseB
    .composite([
      { input: stemBuf, top: 0, left: 30 },
      { input: leafTopBuf, top: 15, left: 160 },
      { input: leafMidBuf, top: 165, left: 60 },
      { input: leafBotBuf, top: 345, left: 80 },
      { input: fullRoseTopBuf, top: 55, left: 135 },
      { input: secRoseBuf, top: 285, left: 130 }
    ])
    .png()
    .toFile(path.join(process.cwd(), 'scratch', 'final_canopy_bloom.png'));

  console.log('Saved final_canopy_bud.png and final_canopy_bloom.png');
}

renderFinalCanopy().catch(console.error);
