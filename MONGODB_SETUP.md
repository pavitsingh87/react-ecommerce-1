# MongoDB Setup Guide

## Install MongoDB on macOS

### Option 1: Using Homebrew (Recommended)
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community

# Stop MongoDB service (when needed)
brew services stop mongodb/brew/mongodb-community
```

### Option 2: MongoDB Atlas (Cloud - Free Tier)
1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update backend/.env with your Atlas URI

## Verify Installation
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Connect to MongoDB shell
mongosh
```

## Default Connection
- Local MongoDB runs on: `mongodb://localhost:27017`
- Database name: `ecommerce`