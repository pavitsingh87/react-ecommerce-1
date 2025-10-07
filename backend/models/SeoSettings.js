const mongoose = require('mongoose');

const seoSettingsSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  keywords: {
    type: String,
    default: ''
  },
  ogTitle: {
    type: String,
    default: ''
  },
  ogDescription: {
    type: String,
    default: ''
  },
  ogImage: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SeoSettings', seoSettingsSchema);