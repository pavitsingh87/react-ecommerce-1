# 🚀 Quick Start Guide for Jewelry Store

## Step 1: Install MongoDB

### Option A: Local MongoDB (Recommended for beginners)
```bash
# Install MongoDB using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb/brew/mongodb-community
```

### Option B: MongoDB Atlas (Cloud - Free)
1. Go to https://www.mongodb.com/atlas
2. Create free account and cluster
3. Get connection string
4. Update `backend/.env` with your Atlas URI

## Step 2: Install Dependencies
```bash
cd /Users/pavitsingh/ecommerce_website
npm run install-deps
```

## Step 3: Setup Sample Data
```bash
cd backend
npm run setup
```
This will:
- Create sample jewelry product images
- Add 8 jewelry products (rings, earrings, necklaces, bracelets)
- Create 3 users (1 admin, 2 customers)
- Generate 2 sample orders

## Step 4: Start the Application
```bash
cd ..
npm run dev
```

## 🔑 Login Credentials
- **Admin**: admin@jewelry.com / password123
- **Customer**: sarah@example.com / password123
- **Customer**: michael@example.com / password123

## 🌐 Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:3000/admin (login as admin)

## 💎 Sample Products Created
1. Diamond Solitaire Engagement Ring - $2,199.99
2. Pearl Drop Earrings - $149.99
3. Gold Tennis Bracelet - $1,899.99
4. Sapphire Pendant Necklace - $899.99
5. Rose Gold Wedding Band - $399.99
6. Emerald Stud Earrings - $599.99
7. Silver Charm Bracelet - $79.99
8. Diamond Hoop Earrings - $799.99

## 🛠️ Troubleshooting
- If MongoDB connection fails, ensure MongoDB is running: `brew services list | grep mongodb`
- If port 3000/5000 is busy, kill the process: `lsof -ti:3000 | xargs kill -9`
- Check logs in terminal for any errors

## 📝 Next Steps
1. Replace sample images with real jewelry photos
2. Update product descriptions and prices
3. Configure Stripe payment keys in `.env`
4. Add your email settings for notifications