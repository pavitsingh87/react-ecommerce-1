# 🚀 UETSU Jewelry Store - AWS EC2 Deployment Guide

## 📋 Prerequisites
- AWS Account
- Domain name (optional)
- SSH key pair

## 🖥️ Step 1: Launch EC2 Instance

### Create EC2 Instance:
1. Go to AWS Console → EC2
2. Click "Launch Instance"
3. Choose **Ubuntu Server 22.04 LTS**
4. Instance type: **t3.small** (or t2.micro for free tier)
5. Create/select key pair
6. Security Group: Allow ports **22, 80, 443, 3000, 8000**
7. Storage: 20GB minimum
8. Launch instance

### Security Group Rules:
```
SSH (22) - Your IP
HTTP (80) - 0.0.0.0/0
HTTPS (443) - 0.0.0.0/0
Custom (3000) - 0.0.0.0/0  # Frontend
Custom (8000) - 0.0.0.0/0  # Backend
```

## 🔧 Step 2: Connect to EC2 Instance

```bash
# Connect via SSH
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# Update system
sudo apt update && sudo apt upgrade -y
```

## 📦 Step 3: Install Dependencies

```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 📁 Step 4: Upload Your Code

```bash
# On your local machine, create deployment package
cd /Users/pavitsingh/ecommerce_website
tar -czf uetsu-store.tar.gz --exclude=node_modules --exclude=.git .

# Upload to EC2
scp -i your-key.pem uetsu-store.tar.gz ubuntu@your-ec2-ip:~/

# On EC2, extract and setup
ssh -i your-key.pem ubuntu@your-ec2-ip
tar -xzf uetsu-store.tar.gz
mv ecommerce_website uetsu-store
cd uetsu-store
```

## 🔨 Step 5: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create production environment file
cat > .env << EOF
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-here
PORT=8000
EOF

# Create sample data
npm run setup

# Start backend with PM2
pm2 start server.js --name "uetsu-backend"
pm2 save
pm2 startup
```

## 🎨 Step 6: Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Update API URL for production
cat > .env << EOF
REACT_APP_API_URL=http://your-ec2-public-ip:8000/api
EOF

# Build for production
npm run build

# Start frontend with PM2
pm2 serve build 3000 --name "uetsu-frontend" --spa
pm2 save
```

## 🌐 Step 7: Configure Nginx (Optional - Recommended)

```bash
# Create Nginx configuration
sudo tee /etc/nginx/sites-available/uetsu << EOF
server {
    listen 80;
    server_name your-domain.com your-ec2-public-ip;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Static files (images)
    location /uploads {
        proxy_pass http://localhost:8000;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/uetsu /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 Step 8: SSL Certificate (Optional)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🎯 Step 9: Final Configuration

### Update Frontend API URL:
```bash
cd ~/uetsu-store/frontend

# For domain setup
echo "REACT_APP_API_URL=https://your-domain.com/api" > .env

# For IP setup
echo "REACT_APP_API_URL=http://your-ec2-ip/api" > .env

# Rebuild
npm run build
pm2 restart uetsu-frontend
```

### Firewall Setup:
```bash
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
```

## 📊 Step 10: Monitor & Manage

```bash
# Check PM2 processes
pm2 status
pm2 logs

# Check Nginx
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log

# Check MongoDB
sudo systemctl status mongod

# Restart services
pm2 restart all
sudo systemctl restart nginx
```

## 🌍 Access Your Live Store

- **With Domain**: https://your-domain.com
- **With IP**: http://your-ec2-public-ip

## 🔑 Admin Access
- **URL**: https://your-domain.com/admin
- **Email**: admin@jewelry.com
- **Password**: password123

## 🚨 Important Security Notes

1. **Change default passwords**
2. **Use environment variables for secrets**
3. **Enable firewall**
4. **Regular backups**
5. **Monitor logs**

## 💰 Estimated AWS Costs
- **t3.small**: ~$15/month
- **t2.micro** (free tier): $0 first year
- **Storage**: ~$2/month
- **Data transfer**: Varies

Your UETSU jewelry store is now live! 🎉💎✨