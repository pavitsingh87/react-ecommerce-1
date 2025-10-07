#!/bin/bash

# BijouxKart Deployment Script for AWS EC2
echo "🚀 Starting BijouxKart deployment..."

# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# Create bijoukart directory
sudo mkdir -p /var/www/bijoukart
sudo chown -R $USER:$USER /var/www/bijoukart

# Copy application files
cp -r . /var/www/bijoukart/

# Navigate to project directory
cd /var/www/bijoukart

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies and build
cd ../frontend
npm install
npm run build

# Copy build files to backend public directory
cp -r build/* ../backend/public/

# Navigate back to backend
cd ../backend

# Create uploads directory
mkdir -p uploads

# Set proper permissions
sudo chown -R $USER:$USER /var/www/bijoukart
sudo chmod -R 755 /var/www/bijoukart

echo "✅ BijouxKart deployment completed!"
echo "📝 Next steps:"
echo "1. Configure your .env file in /var/www/bijoukart/backend/"
echo "2. Start the application with: pm2 start ecosystem.config.js"
echo "3. Configure Nginx reverse proxy"