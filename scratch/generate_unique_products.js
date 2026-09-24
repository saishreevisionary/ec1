// Script to verify unique botanical product generation
const CATEGORIES = [
  { id: 1, name: 'Essential Oils', slug: 'essential-oils' },
  { id: 2, name: 'Spice Oils', slug: 'spice-oils' },
  { id: 3, name: 'Spice Oleoresins', slug: 'spice-oleoresins' },
  { id: 4, name: 'Floral Concretes', slug: 'floral-concretes' },
  { id: 5, name: 'Floral Absolutes', slug: 'floral-absolutes' },
  { id: 6, name: 'Spice Powders', slug: 'spice-powders' }
];

console.log("Validating categories count:", CATEGORIES.length);
