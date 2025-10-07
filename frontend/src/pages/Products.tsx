import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchProducts } from '../store/productSlice';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  });

  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const params = {
      search: searchParams.get('search') || '',
      ...filters
    };
    dispatch(fetchProducts(params));
  }, [dispatch, searchParams, filters]);

  return (
    <div className="py-20">
      <div className="container">
        <div className="section-title">
          <h1>Jewelry Collections</h1>
          <p>Discover our exquisite range of handcrafted jewelry</p>
        </div>
        
        {/* Filters */}
        <div className="mb-12 p-6 bg-light">
          <div className="grid md-grid-4 gap-4">
            <select 
              value={filters.category} 
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="form-input"
            >
              <option value="">All Categories</option>
              <option value="Rings">Rings</option>
              <option value="Earrings">Earrings</option>
              <option value="Necklaces">Necklaces</option>
              <option value="Bracelets">Bracelets</option>
            </select>
            
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              className="form-input"
            />
            
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              className="form-input"
            />
            
            <select 
              value={filters.sort} 
              onChange={(e) => setFilters({...filters, sort: e.target.value})}
              className="form-input"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="grid md-grid-2 lg-grid-4">
            {products.map((product) => (
              <div key={product._id} className="product-card hover-lift transition">
                <div className="relative">
                  <img
                    src={`http://localhost:8000/uploads/${product.images[0]}`}
                    alt={product.title}
                    onError={(e) => {
                      console.log('Image failed to load:', `http://localhost:8000/uploads/${product.images[0]}`);
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2Yzc1N2QiPkpld2VscnkgSW1hZ2U8L3RleHQ+PC9zdmc+';
                    }}
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2 text-dark">{product.title}</h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-semibold text-gold">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-gold">
                        {'★'.repeat(Math.floor(product.rating))}
                      </div>
                      <span className="text-sm text-gray ml-1">({product.rating})</span>
                    </div>
                  </div>
                  
                  <Link to={`/product/${product._id}`} className="btn-primary w-full">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;