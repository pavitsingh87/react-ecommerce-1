#!/bin/bash

echo "🚀 Deploying BijouxKart on EC2 Free Tier..."

# Update system
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create swap file for additional memory
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Set up application
mkdir -p ~/bijoukart
cd ~/bijoukart

# Copy environment template
cp .env.docker .env

echo "✅ Setup complete!"
echo "📝 Next steps:"
echo "1. Edit .env file with your credentials"
echo "2. Run: docker-compose -f docker-compose.freetier.yml up -d"
echo "3. Access your site at http://your-ec2-ip"