import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAppContext } from '../Context';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { user, wishlist, products, loading } = useAppContext();

  // The backend might return just IDs, so we map them to the full product objects
  // that are already loaded in our global `products` context state.
  const wishlistedProducts = useMemo(() => {
    if (!wishlist || wishlist.length === 0 || !products || products.length === 0) return [];
    
    return wishlist.map(wishlistItem => {
      const id = typeof wishlistItem === 'object' ? wishlistItem._id : wishlistItem;
      return products.find(p => p._id === id);
    }).filter(p => p !== undefined);
  }, [wishlist, products]);

  if (!user) return <div className="container mt-8 text-center"><Link to="/login" className="btn btn-primary">Login to view wishlist</Link></div>;
  if (loading) return <div className="container mt-8 text-center">Loading wishlist...</div>;

  return (
    <div className="container mt-8">
      <h2 className="mb-8" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Heart size={28} fill="currentColor" color="var(--error)" /> Your Wishlist
      </h2>
      
      {wishlistedProducts.length === 0 ? (
        <div className="glass-card animate-fade-in text-center" style={{ padding: '3rem' }}>
          <p className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Your wishlist is empty.</p>
          <Link to="/" className="btn btn-primary" style={{ display: 'inline-block' }}>Explore Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-4">
          {wishlistedProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
