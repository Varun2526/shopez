import { Link } from 'react-router-dom';
import WishlistBtn from './WishlistBtn';
import { Package } from 'lucide-react';
import { useAppContext } from '../Context';

const ProductCard = ({ product }) => {
  const { addToCart } = useAppContext();
  
  return (
    <div className="glass-card product-card animate-fade-in" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', height: '100%' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10, background: 'var(--bg-glass)', borderRadius: '50%', padding: '0.25rem', backdropFilter: 'blur(5px)' }}>
        <WishlistBtn productId={product._id} />
      </div>
      
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ height: '200px', backgroundColor: 'var(--bg-color)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Package size={48} color="var(--text-secondary)" />
          )}
        </div>
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{product.name}</h3>
          <p style={{ color: 'var(--text-secondary)', flexGrow: 1, marginBottom: '1rem' }}>{product.description}</p>
        </div>
      </Link>
      
      <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
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
