import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import api from '../services/api';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  variants: Array<{ type: string; value: string; stock: number }>;
  stock: number;
  rating: number;
  reviews: Array<{ user: { name: string }; rating: number; comment: string; date: string }>;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product._id,
        title: product.title,
        price: product.salePrice || product.price,
        quantity,
        image: product.images[0],
        variant: selectedVariant
      }));
    }
  };

  if (!product) return <div className="container py-20">Loading...</div>;

  return (
    <div className="container py-20">
      <div className="grid md-grid-2 gap-12">
        {/* Images */}
        <div>
          <img
            src={`http://localhost:8000/uploads/${product.images[0]}`}
            alt={product.title}
            className="w-full"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2Yzc1N2QiPkpld2VscnkgSW1hZ2U8L3RleHQ+PC9zdmc+';
            }}
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-gold">
              ${product.salePrice || product.price}
            </span>
            {product.salePrice && (
              <span className="ml-4 text-xl text-gray line-through">${product.price}</span>
            )}
          </div>
          
          <div className="flex items-center mb-6">
            <div className="flex text-gold">
              {'★'.repeat(Math.floor(product.rating))}
            </div>
            <span className="ml-2">({product.reviews.length} reviews)</span>
          </div>

          <p className="text-gray mb-8">{product.description}</p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {product.variants[0].type.charAt(0).toUpperCase() + product.variants[0].type.slice(1)}:
              </label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="form-input"
              >
                <option value="">Select {product.variants[0].type}</option>
                {product.variants.map((variant, index) => (
                  <option key={index} value={variant.value}>
                    {variant.value} {variant.stock > 0 ? `(${variant.stock} available)` : '(Out of stock)'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity:</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="form-input w-20"
            />
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn-primary w-full mb-4"
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {/* Stock Info */}
          <p className="text-sm text-gray">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
        {product.reviews.map((review, index) => (
          <div key={index} className="border-b pb-6 mb-6">
            <div className="flex items-center mb-2">
              <span className="font-semibold">{review.user.name}</span>
              <div className="ml-4 flex text-gold">
                {'★'.repeat(review.rating)}
              </div>
            </div>
            <p className="text-gray">{review.comment}</p>
            <p className="text-sm text-gray mt-2">{new Date(review.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;