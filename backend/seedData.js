const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    // Create Users
    const defaultPassword = process.env.DEFAULT_PASSWORD || 'changeme123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);
    
    const users = await User.create([
      {
        name: 'Admin User',
        email: process.env.ADMIN_EMAIL || 'admin@bijoukart.com',
        password: hashedPassword,
        role: 'admin',
        phone: '+1-555-0101',
        addresses: [{
          type: 'work',
          street: '123 Business Ave',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
          isDefault: true
        }]
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        password: hashedPassword,
        role: 'customer',
        phone: '+1-555-0102',
        addresses: [{
          type: 'home',
          street: '456 Oak Street',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA',
          isDefault: true
        }]
      },
      {
        name: 'Michael Chen',
        email: 'michael@example.com',
        password: hashedPassword,
        role: 'customer',
        phone: '+1-555-0103',
        addresses: [{
          type: 'home',
          street: '789 Pine Road',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA',
          isDefault: true
        }]
      }
    ]);

    // Create Jewelry Products
    const products = await Product.create([
      {
        title: 'Diamond Solitaire Engagement Ring',
        description: 'Stunning 1-carat diamond solitaire ring in 14k white gold. Perfect for proposals and special occasions.',
        price: 2499.99,
        salePrice: 2199.99,
        category: 'Rings',
        subcategory: 'Engagement Rings',
        brand: 'Luxury Jewels',
        images: ['diamond-ring-1.jpg', 'diamond-ring-2.jpg'],
        variants: [
          { type: 'size', value: '5', stock: 3 },
          { type: 'size', value: '6', stock: 5 },
          { type: 'size', value: '7', stock: 4 },
          { type: 'size', value: '8', stock: 2 }
        ],
        stock: 14,
        rating: 4.8,
        featured: true,
        reviews: [{
          user: users[1]._id,
          rating: 5,
          comment: 'Absolutely beautiful ring! My fiancé loves it.',
          date: new Date('2024-01-15')
        }]
      },
      {
        title: 'Pearl Drop Earrings',
        description: 'Elegant freshwater pearl drop earrings in sterling silver. Classic and timeless design.',
        price: 149.99,
        category: 'Earrings',
        subcategory: 'Drop Earrings',
        brand: 'Pearl Paradise',
        images: ['pearl-earrings-1.jpg', 'pearl-earrings-2.jpg'],
        variants: [
          { type: 'color', value: 'White', stock: 8 },
          { type: 'color', value: 'Pink', stock: 5 },
          { type: 'color', value: 'Black', stock: 3 }
        ],
        stock: 16,
        rating: 4.6,
        featured: true
      },
      {
        title: 'Gold Tennis Bracelet',
        description: '18k yellow gold tennis bracelet with brilliant cut diamonds. Perfect for special occasions.',
        price: 1899.99,
        category: 'Bracelets',
        subcategory: 'Tennis Bracelets',
        brand: 'Golden Elegance',
        images: ['gold-bracelet-1.jpg', 'gold-bracelet-2.jpg'],
        variants: [
          { type: 'size', value: '6.5 inches', stock: 2 },
          { type: 'size', value: '7 inches', stock: 4 },
          { type: 'size', value: '7.5 inches', stock: 3 }
        ],
        stock: 9,
        rating: 4.9,
        featured: true
      },
      {
        title: 'Sapphire Pendant Necklace',
        description: 'Beautiful blue sapphire pendant on 18k white gold chain. Elegant and sophisticated.',
        price: 899.99,
        category: 'Necklaces',
        subcategory: 'Pendants',
        brand: 'Gemstone Gallery',
        images: ['sapphire-necklace-1.jpg', 'sapphire-necklace-2.jpg'],
        variants: [
          { type: 'size', value: '16 inches', stock: 4 },
          { type: 'size', value: '18 inches', stock: 6 },
          { type: 'size', value: '20 inches', stock: 3 }
        ],
        stock: 13,
        rating: 4.7
      },
      {
        title: 'Rose Gold Wedding Band',
        description: 'Classic 14k rose gold wedding band with brushed finish. Comfortable fit for everyday wear.',
        price: 399.99,
        category: 'Rings',
        subcategory: 'Wedding Bands',
        brand: 'Eternal Bands',
        images: ['rose-gold-band-1.jpg', 'rose-gold-band-2.jpg'],
        variants: [
          { type: 'size', value: '5', stock: 2 },
          { type: 'size', value: '6', stock: 4 },
          { type: 'size', value: '7', stock: 5 },
          { type: 'size', value: '8', stock: 3 },
          { type: 'size', value: '9', stock: 2 }
        ],
        stock: 16,
        rating: 4.5
      },
      {
        title: 'Emerald Stud Earrings',
        description: 'Genuine emerald stud earrings in 14k yellow gold settings. Perfect for everyday elegance.',
        price: 599.99,
        category: 'Earrings',
        subcategory: 'Stud Earrings',
        brand: 'Precious Gems',
        images: ['emerald-studs-1.jpg', 'emerald-studs-2.jpg'],
        stock: 12,
        rating: 4.4,
        featured: true
      },
      {
        title: 'Silver Charm Bracelet',
        description: 'Sterling silver charm bracelet with heart charm. Add your own charms to personalize.',
        price: 79.99,
        category: 'Bracelets',
        subcategory: 'Charm Bracelets',
        brand: 'Silver Dreams',
        images: ['charm-bracelet-1.jpg', 'charm-bracelet-2.jpg'],
        variants: [
          { type: 'size', value: '6.5 inches', stock: 8 },
          { type: 'size', value: '7 inches', stock: 10 },
          { type: 'size', value: '7.5 inches', stock: 6 }
        ],
        stock: 24,
        rating: 4.3
      },
      {
        title: 'Diamond Hoop Earrings',
        description: 'Sparkling diamond hoop earrings in 14k white gold. Perfect size for everyday wear.',
        price: 799.99,
        category: 'Earrings',
        subcategory: 'Hoop Earrings',
        brand: 'Diamond Delights',
        images: ['diamond-hoops-1.jpg', 'diamond-hoops-2.jpg'],
        stock: 8,
        rating: 4.7,
        featured: true
      }
    ]);

    // Create Sample Orders
    await Order.create([
      {
        user: users[1]._id,
        items: [
          {
            product: products[0]._id,
            quantity: 1,
            price: 2199.99,
            variant: 'Size: 6'
          }
        ],
        shippingAddress: users[1].addresses[0],
        paymentMethod: 'Credit Card',
        paymentStatus: 'paid',
        orderStatus: 'delivered',
        subtotal: 2199.99,
        tax: 175.99,
        shipping: 0,
        discount: 0,
        total: 2375.98,
        trackingNumber: 'JW123456789'
      },
      {
        user: users[2]._id,
        items: [
          {
            product: products[1]._id,
            quantity: 1,
            price: 149.99,
            variant: 'Color: White'
          },
          {
            product: products[6]._id,
            quantity: 1,
            price: 79.99,
            variant: 'Size: 7 inches'
          }
        ],
        shippingAddress: users[2].addresses[0],
        paymentMethod: 'Credit Card',
        paymentStatus: 'paid',
        orderStatus: 'shipped',
        subtotal: 229.98,
        tax: 18.40,
        shipping: 9.99,
        discount: 0,
        total: 258.37,
        trackingNumber: 'JW987654321'
      }
    ]);

    console.log('✅ Sample jewelry store data created successfully!');
    console.log('👤 Users created: 3 (1 admin, 2 customers)');
    console.log('💎 Products created: 8 jewelry items');
    console.log('📦 Orders created: 2 sample orders');
    console.log('\n📧 Login credentials:');
    console.log('Admin:', process.env.ADMIN_EMAIL || 'admin@bijoukart.com', '/ [HIDDEN]');
    console.log('Customer: sarah@example.com / [HIDDEN]');
    console.log('Customer: michael@example.com / [HIDDEN]');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();