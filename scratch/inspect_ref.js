const sharp = require('sharp');
const path = require('path');

async function inspectRef() {
  const p = path.join(process.cwd(), 'public', 'images', 'botanical', 'ref-right-roses.webp');
  const meta = await sharp(p).metadata();
  console.log('ref-right-roses.webp:', meta);
}
inspectRef();
