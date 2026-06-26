import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useAppContext } from '../Context';

const ProductCard = ({ product }) => {
  const { addToCart } = useAppContext();
  
  return (
    <div className="glass-card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ height: '200px', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Package size={48} color="var(--text-secondary)" />
          )}
        </div>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{product.name}</h3>
        <p style={{ color: 'var(--text-secondary)', flexGrow: 1, marginBottom: '1rem' }}>{product.description}</p>
      </Link>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>${product.price}</span>
        <button className="btn btn-primary" onClick={(e) => {
          e.preventDefault();
          addToCart(product._id, product.name, 1);
        }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
