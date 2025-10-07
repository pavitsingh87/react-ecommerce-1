import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import SEOHead from '../components/SEOHead';

interface Product {
  _id: string;
  title: string;
  price: number;
  salePrice?: number;
  images: string[];
  rating: number;
}

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get('/products/featured/list');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      <SEOHead 
        title="BijouxKart – French Elegance, Timeless Beauty | Fine Jewelry Collection"
        description="Discover BijouxKart's exquisite collection of fine French jewelry. Premium gold rings, necklaces, earrings, and bracelets. French elegance, timeless beauty."
        keywords="bijoukart, bijoux, french jewelry, fine jewelry, gold jewelry, diamond rings, luxury necklaces, gold earrings, bracelets, french elegance"
      />
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>BijouxKart – French Elegance, Timeless Beauty</h1>
          <p>Découvrez notre collection exquise de bijoux fins, alliant l'élégance française à la beauté intemporelle. Chaque pièce incarne la qualité et le raffinement.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary">
              Shop Collection
            </Link>
            <Link to="/products?category=Rings" className="btn-outline">
              Engagement Rings
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Collection</h2>
            <p>Handpicked pieces that showcase the finest craftsmanship and timeless beauty</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product._id} className="product-card hover-lift">
                <div className="relative">
                  <img
                    src={`http://localhost:8000/uploads/${product.images[0]}`}
                    alt={product.title}
                    className="w-full h-72 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2Yzc1N2QiPkpld2VscnkgSW1hZ2U8L3RleHQ+PC9zdmc+';
                    }}
                  />
                  {product.salePrice && (
                    <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 text-sm font-medium rounded">
                      SALE
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2 text-dark">{product.title}</h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-semibold text-purple-600">
                        ${(product.salePrice || product.price).toLocaleString()}
                      </span>
                      {product.salePrice && (
                        <span className="text-sm text-gray line-through ml-2">
                          ${product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-purple-600">
                        {'★'.repeat(Math.floor(product.rating))}
                      </div>
                      <span className="text-sm text-gray ml-1">({product.rating})</span>
                    </div>
                  </div>
                  
                  <Link to={`/product/${product._id}`} className="btn-primary w-full block text-center">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Shop by Category</h2>
            <p>Explore our diverse range of jewelry collections</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Engagement Rings', category: 'Rings', icon: 'https://img.icons8.com/?size=48&id=17382&format=png' },
              { name: 'Necklaces', category: 'Necklaces', icon: 'https://img.icons8.com/ios/48/000000/necklace.png' },
              { name: 'Earrings', category: 'Earrings', icon: 'https://img.icons8.com/ios/48/000000/earrings.png' },
              { name: 'Bracelets', category: 'Bracelets', icon: 'https://img.icons8.com/?size=50&id=syxzke62JOJz&format=png' }
            ].map((cat, index) => (
              <Link
                key={index}
                to={`/products?category=${cat.category}`}
                className="block text-center p-8 bg-white hover-lift transition shadow rounded-lg"
              >
                <div className="text-4xl mb-4"><img src={cat.icon} alt={cat.name} className="w-12 h-12 mx-auto" /></div>
                <h3 className="text-xl font-medium text-dark mb-2">{cat.name}</h3>
                <p className="text-gray">Discover our collection</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-item">
              <div className="feature-icon"><img src="https://img.icons8.com/ios/48/ffffff/truck.png" alt="Shipping" /></div>
              <h3 className="text-xl font-medium mb-4">Free Worldwide Shipping</h3>
              <p className="text-gray">Complimentary shipping on all orders over $500.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><img src="https://img.icons8.com/ios/48/ffffff/shield.png" alt="Warranty" /></div>
              <h3 className="text-xl font-medium mb-4">Lifetime Warranty</h3>
              <p className="text-gray">Comprehensive lifetime warranty and free maintenance.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><img src="https://img.icons8.com/ios/48/ffffff/diamond.png" alt="Quality" /></div>
              <h3 className="text-xl font-medium mb-4">Certified Quality</h3>
              <p className="text-gray">All diamonds certified by leading institutes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;