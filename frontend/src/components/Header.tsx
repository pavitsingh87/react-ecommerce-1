import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="text-gray-600">BijouxKart – French Elegance, Timeless Beauty</div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <span>Hi, {user.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg py-2 w-48 border">
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsUserMenuOpen(false)}>My Profile</Link>
                      <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsUserMenuOpen(false)}>My Orders</Link>
                      {user.role === 'admin' && (
                        <>
                          <hr className="my-1" />
                          <Link to="/admin" className="block px-4 py-2 text-purple-600 hover:bg-gray-100" onClick={() => setIsUserMenuOpen(false)}>Admin Dashboard</Link>
                          <Link to="/admin/products" className="block px-4 py-2 text-purple-600 hover:bg-gray-100" onClick={() => setIsUserMenuOpen(false)}>Manage Products</Link>
                        </>
                      )}
                      <hr className="my-1" />
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-gray-700 hover:text-purple-600 transition-colors">Login</Link>
                  <Link to="/register" className="text-gray-700 hover:text-purple-600 transition-colors">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
            BIJOUKART
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="nav-link">Home</Link>
            <div className="relative group">
              <Link to="/products" className="nav-link flex items-center">
                Collections
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/products?category=Rings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Rings</Link>
                <Link to="/products?category=Necklaces" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Necklaces</Link>
                <Link to="/products?category=Earrings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Earrings</Link>
                <Link to="/products?category=Bracelets" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Bracelets</Link>
              </div>
            </div>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            <Link to="/cart" className="text-xl hover:text-purple-600 transition-colors">
              <img src="https://img.icons8.com/ios/24/000000/shopping-bag.png" alt="Cart" className="w-6 h-6" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-purple-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>Collections</Link>
              <Link to="/products?category=Rings" className="nav-link pl-4" onClick={() => setIsMenuOpen(false)}>Rings</Link>
              <Link to="/products?category=Necklaces" className="nav-link pl-4" onClick={() => setIsMenuOpen(false)}>Necklaces</Link>
              <Link to="/products?category=Earrings" className="nav-link pl-4" onClick={() => setIsMenuOpen(false)}>Earrings</Link>
              <Link to="/products?category=Bracelets" className="nav-link pl-4" onClick={() => setIsMenuOpen(false)}>Bracelets</Link>
              
              <form onSubmit={handleSearch} className="px-4">
                <input
                  type="text"
                  placeholder="Search jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </form>

              {user ? (
                <>
                  <Link to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                  <Link to="/orders" className="nav-link" onClick={() => setIsMenuOpen(false)}>Orders</Link>
                  {user.role === 'admin' && (
                    <>
                      <Link to="/admin" className="nav-link text-purple-600" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
                      <Link to="/admin/products" className="nav-link text-purple-600" onClick={() => setIsMenuOpen(false)}>Manage Products</Link>
                    </>
                  )}
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="nav-link text-red-600 text-left">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="nav-link" onClick={() => setIsMenuOpen(false)}>Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;