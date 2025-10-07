import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid md-grid-2 lg-grid-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="logo text-gold mb-6">BIJOUKART</h3>
            <p className="text-base mb-6" style={{ color: '#ccc' }}>
              French elegance meets timeless beauty. Each bijou tells a story of sophistication, 
              quality, and refined craftsmanship that transcends generations.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/bijoukart" className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition">
                <img src="https://img.icons8.com/ios/24/ffffff/facebook.png" alt="Facebook" />
              </a>
              <a href="https://instagram.com/bijoukart" className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition">
                <img src="https://img.icons8.com/ios/24/ffffff/instagram-new.png" alt="Instagram" />
              </a>
              <a href="https://twitter.com/bijoukart" className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition">
                <img src="https://img.icons8.com/ios/24/ffffff/twitter.png" alt="Twitter" />
              </a>
              <a href="https://youtube.com/@bijoukart" className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition">
                <img src="https://img.icons8.com/ios/24/ffffff/youtube-play.png" alt="YouTube" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4>Collections</h4>
            <ul>
              <li><Link to="/products?category=Rings">Engagement Rings</Link></li>
              <li><Link to="/products?category=Rings">Wedding Bands</Link></li>
              <li><Link to="/products?category=Necklaces">Diamond Necklaces</Link></li>
              <li><Link to="/products?category=Earrings">Luxury Earrings</Link></li>
              <li><Link to="/products?category=Bracelets">Tennis Bracelets</Link></li>
              <li><Link to="/products">All Jewelry</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4>Customer Care</h4>
            <ul>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">Jewelry Care</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Warranty</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Book Appointment</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4>Get in Touch</h4>
            <div className="mb-4">
              <p className="mb-2" style={{ color: '#ccc' }}>📍 123 Diamond District</p>
              <p style={{ color: '#ccc' }}>New York, NY 10001</p>
            </div>
            <div className="mb-4">
              <p className="mb-2" style={{ color: '#ccc' }}>📞 +1 (555) 123-4567</p>
              <p style={{ color: '#ccc' }}>✉️ info@bijoukart.com</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: '#ccc' }}>
                <strong>Store Hours:</strong><br />
                Mon-Sat: 10AM-8PM<br />
                Sunday: 12PM-6PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="flex justify-between items-center flex-col lg-flex-row gap-4">
            <div className="flex flex-col lg-flex-row items-center gap-4">
              <p>&copy; 2024 BijouxKart. All rights reserved.</p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-gold transition">Privacy Policy</a>
                <a href="#" className="hover:text-gold transition">Terms of Service</a>
                <a href="#" className="hover:text-gold transition">Cookie Policy</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm">Secure payments:</span>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-white rounded border flex items-center justify-center">
                  <img src="https://img.icons8.com/color/24/000000/visa.png" alt="Visa" className="h-4" />
                </div>
                <div className="w-10 h-6 bg-white rounded border flex items-center justify-center">
                  <img src="https://img.icons8.com/color/24/000000/mastercard.png" alt="Mastercard" className="h-4" />
                </div>
                <div className="w-10 h-6 bg-white rounded border flex items-center justify-center">
                  <img src="https://img.icons8.com/color/24/000000/amex.png" alt="American Express" className="h-4" />
                </div>
                <div className="w-10 h-6 bg-white rounded border flex items-center justify-center">
                  <img src="https://img.icons8.com/color/24/000000/paypal.png" alt="PayPal" className="h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;