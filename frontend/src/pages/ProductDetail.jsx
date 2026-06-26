import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Package, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../Context';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useAppContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="container mt-8 text-center">Loading product details...</div>;
  if (error || !product) return <div className="container mt-8 text-center text-error">{error || 'Product not found'}</div>;

  return (
    <div className="container mt-8">
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={20} /> Back to Products
      </Link>
      
      <div className="glass-card animate-fade-in grid grid-cols-2" style={{ padding: '2rem' }}>
        <div style={{ backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Package size={96} color="var(--text-secondary)" />
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 2rem' }}>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '1px' }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>{product.name}</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>
            {product.description}
          </p>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            ${product.price}
          </div>
          <div style={{ marginTop: 'auto' }}>
            <p style={{ marginBottom: '1rem', color: product.stock > 0 ? 'var(--success)' : 'var(--error)' }}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', fontSize: '1.25rem' }}
              disabled={product.stock <= 0}
              onClick={() => addToCart(product._id, product.name, 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
