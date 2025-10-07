#!/bin/bash

# BijouxKart EC2 Setup Script
echo "🏗️  Setting up BijouxKart on AWS EC2..."

# Create log directory
sudo mkdir -p /var/log/bijoukart
sudo chown -R $USER:$USER /var/log/bijoukart

# Install Apache2
sudo apt install -y apache2

# Enable Apache2 modules
sudo a2enmod rewrite
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod ssl
sudo a2enmod headers

# Copy Apache2 configuration
sudo cp bijoukart.conf /etc/apache2/sites-available/
sudo a2ensite bijoukart
sudo a2dissite 000-default

# Test Apache2 configuration
sudo apache2ctl configtest

# Start and enable Apache2
sudo systemctl start apache2
sudo systemctl enable apache2

# Configure firewall
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Start BijouxKart application
cd /var/www/bijoukart/backend
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "🎉 BijouxKart setup completed!"
echo "📋 Summary:"
echo "   - Application: /var/www/bijoukart"
echo "   - Logs: /var/log/bijoukart"
echo "   - Apache2 config: /etc/apache2/sites-available/bijoukart.conf"
echo "   - PM2 status: pm2 status"
echo ""
echo "🔧 Next steps:"
echo "1. Update domain in bijoukart.conf"
echo "2. Configure SSL certificates with certbot"
echo "3. Update .env with production values"
echo "4. Test your application at http://your-server-ip"