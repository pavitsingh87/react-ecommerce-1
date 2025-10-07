# BijouxKart AWS EC2 Deployment Guide

## Prerequisites
- AWS EC2 instance (Ubuntu 20.04 LTS recommended)
- Domain name pointed to your EC2 instance
- SSH access to your EC2 instance

## Deployment Steps

### 1. Connect to EC2 Instance
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 2. Upload Application Files
```bash
# From your local machine
scp -i your-key.pem -r ecommerce_website ubuntu@your-ec2-ip:~/
```

### 3. Run Deployment Script
```bash
# On EC2 instance
cd ~/ecommerce_website
chmod +x deploy.sh setup-ec2.sh
./deploy.sh
```

### 4. Configure Environment Variables
```bash
cd /var/www/bijoukart/backend
cp .env.production .env
nano .env
# Update with your actual values
```

### 5. Setup Server Configuration
```bash
cd ~/ecommerce_website
./setup-ec2.sh
```

### 6. Configure Domain and SSL
```bash
# Update Apache2 configuration
sudo nano /etc/apache2/sites-available/bijoukart.conf
# Replace 'your-domain.com' with your actual domain

# Install SSL certificate (Let's Encrypt)
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d your-domain.com -d www.your-domain.com
```

### 7. Restart Services
```bash
sudo systemctl reload apache2
pm2 restart all
```

## Application Management

### PM2 Commands
```bash
pm2 status              # Check application status
pm2 logs bijoukart-backend  # View logs
pm2 restart bijoukart-backend  # Restart application
pm2 stop bijoukart-backend     # Stop application
```

### Apache2 Commands
```bash
sudo systemctl status apache2     # Check Apache2 status
sudo systemctl reload apache2     # Reload configuration
sudo apache2ctl configtest       # Test configuration
sudo a2ensite bijoukart          # Enable site
sudo a2dissite bijoukart         # Disable site
```

### MongoDB Commands
```bash
sudo systemctl status mongod   # Check MongoDB status
sudo systemctl restart mongod  # Restart MongoDB
mongo                          # Connect to MongoDB shell
```

## File Structure on EC2
```
/var/www/bijoukart/
├── backend/
│   ├── server.js
│   ├── .env
│   ├── uploads/
│   └── public/ (built frontend)
├── frontend/ (source code)
└── deploy.sh
```

## Security Checklist
- [ ] Update default passwords
- [ ] Configure firewall (UFW)
- [ ] Install SSL certificates
- [ ] Set up regular backups
- [ ] Configure MongoDB authentication
- [ ] Update system packages regularly

## Monitoring
- Application logs: `/var/log/bijoukart/`
- Apache2 logs: `/var/log/apache2/`
- MongoDB logs: `/var/log/mongodb/`

## Backup Strategy
```bash
# Database backup
mongodump --db bijoukart --out /backup/mongodb/$(date +%Y%m%d)

# Application backup
tar -czf /backup/bijoukart-$(date +%Y%m%d).tar.gz /var/www/bijoukart
```

## Troubleshooting
1. **Application not starting**: Check PM2 logs
2. **502 Bad Gateway**: Verify backend is running on port 5000
3. **SSL issues**: Check certificate configuration
4. **Database connection**: Verify MongoDB is running

## Support
For deployment issues, check:
- PM2 logs: `pm2 logs`
- Apache2 error logs: `sudo tail -f /var/log/apache2/bijoukart_error.log`
- System logs: `sudo journalctl -f`