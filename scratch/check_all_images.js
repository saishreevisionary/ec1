const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function checkAllImages() {
  const dirs = [
    path.join(process.cwd(), 'public', 'images', 'botanical'),
    path.join(process.cwd(), 'public', 'images'),
    path.join(process.cwd(), 'scratch')
  ];

  for (const d of dirs) {
    if (!fs.existsSync(d)) continue;
    const files = fs.readdirSync(d).filter(f => f.match(/\.(png|webp|jpg|jpeg)$/i));
    for (const f of files) {
      const full = path.join(d, f);
      const meta = await sharp(full).metadata();
      console.log(`${f}: ${meta.width}x${meta.height}, channels=${meta.channels}, hasAlpha=${meta.hasAlpha}, format=${meta.format}`);
    }
  }
}

checkAllImages().catch(console.error);
