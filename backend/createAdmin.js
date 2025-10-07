const mongoose = require('mongoose');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@bijoukart.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123';
    
    // Delete existing admin
    await User.deleteOne({ email: adminEmail });
    
    // Create new admin
    const admin = new User({
      name: 'Admin User',
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });
    
    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('Email:', adminEmail);
    console.log('Password: [HIDDEN]');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createAdmin();