const sharp = require('sharp');
const path = require('path');

async function compositeRightCanopy() {
  const dir = path.join(process.cwd(), 'public', 'images', 'botanical');
  const W = 500;
  const H = 600;

  // Background color like Venus website
  const base = sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: { r: 245, g: 242, b: 233, alpha: 1 }
    }
  });

  // Branch foliage (w=380, h=480)
  const branchBuf = await sharp(path.join(dir, 'branch-foliage.png'))
    .resize(380, 480, { fit: 'contain' })
    .flop() // scaleX(-1)
    .rotate(12, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Flower full (w=150, h=150)
  const roseFullBuf = await sharp(path.join(dir, 'flower-full.png'))
    .resize(150, 150, { fit: 'contain' })
    .toBuffer();

  // Flower bud (w=195, h=195)
  const budBuf = await sharp(path.join(dir, 'flower-bud.png'))
    .resize(195, 195, { fit: 'contain' })
    .toBuffer();

  // Composite them
  const result = await base
    .composite([
      { input: branchBuf, top: 0, left: 50 },
      { input: budBuf, top: 175, left: 250 },
      { input: roseFullBuf, top: 320, left: 230 }
    ])
    .png()
    .toFile(path.join(process.cwd(), 'scratch', 'test_render_canopy.png'));

  console.log('Saved test_render_canopy.png:', result);
}

compositeRightCanopy().catch(console.error);
