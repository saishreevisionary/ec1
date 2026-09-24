const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'images', 'botanical');
const fallingPetal = path.join(dir, 'falling-petal.png');

const targets = [
  'petal-outer-1.png',
  'petal-outer-2.png',
  'petal-outer-3.png',
  'petal-outer-4.png',
  'petal-center-unfold.png'
];

for (const t of targets) {
  fs.copyFileSync(fallingPetal, path.join(dir, t));
  console.log('Replaced with clean transparent petal:', t);
}
