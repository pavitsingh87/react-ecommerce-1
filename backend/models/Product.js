const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: Number,
  category: { type: String, required: true },
  subcategory: String,
  brand: String,
  images: [String],
  variants: [{
    type: { type: String, enum: ['size', 'color', 'material'] },
    value: String,
    price: Number,
    stock: { type: Number, default: 0 }
  }],
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  isActive: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  seoKeywords: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);