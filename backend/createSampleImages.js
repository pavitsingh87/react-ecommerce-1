const fs = require('fs');
const path = require('path');

// Create placeholder images for jewelry products
const createPlaceholderImage = (filename, text) => {
  const svgContent = `
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#f8f9fa"/>
  <rect x="50" y="150" width="300" height="100" fill="#e9ecef" rx="10"/>
  <text x="200" y="190" text-anchor="middle" font-family="Arial" font-size="14" fill="#6c757d">JEWELRY</text>
  <text x="200" y="210" text-anchor="middle" font-family="Arial" font-size="12" fill="#6c757d">${text}</text>
  <circle cx="200" cy="250" r="30" fill="#ffd700" stroke="#ffed4e" stroke-width="2"/>
  <circle cx="200" cy="250" r="15" fill="#fff" opacity="0.8"/>
</svg>`;
  
  fs.writeFileSync(path.join(__dirname, 'uploads', filename), svgContent);
};

// Create sample jewelry images
const jewelryImages = [
  { filename: 'diamond-ring-1.jpg', text: 'Diamond Ring' },
  { filename: 'diamond-ring-2.jpg', text: 'Diamond Ring Detail' },
  { filename: 'pearl-earrings-1.jpg', text: 'Pearl Earrings' },
  { filename: 'pearl-earrings-2.jpg', text: 'Pearl Earrings Detail' },
  { filename: 'gold-bracelet-1.jpg', text: 'Gold Bracelet' },
  { filename: 'gold-bracelet-2.jpg', text: 'Gold Bracelet Detail' },
  { filename: 'sapphire-necklace-1.jpg', text: 'Sapphire Necklace' },
  { filename: 'sapphire-necklace-2.jpg', text: 'Sapphire Detail' },
  { filename: 'rose-gold-band-1.jpg', text: 'Rose Gold Band' },
  { filename: 'rose-gold-band-2.jpg', text: 'Band Detail' },
  { filename: 'emerald-studs-1.jpg', text: 'Emerald Studs' },
  { filename: 'emerald-studs-2.jpg', text: 'Emerald Detail' },
  { filename: 'charm-bracelet-1.jpg', text: 'Charm Bracelet' },
  { filename: 'charm-bracelet-2.jpg', text: 'Charm Detail' },
  { filename: 'diamond-hoops-1.jpg', text: 'Diamond Hoops' },
  { filename: 'diamond-hoops-2.jpg', text: 'Hoop Detail' }
];

console.log('Creating sample jewelry images...');

jewelryImages.forEach(({ filename, text }) => {
  createPlaceholderImage(filename, text);
  console.log(`✅ Created: ${filename}`);
});

console.log('\n🎨 Sample jewelry images created successfully!');
console.log('📁 Location: backend/uploads/');
console.log('💡 Replace these SVG files with real jewelry photos for production');