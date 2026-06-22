import { useAppContext } from '../Context';
import { Package } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useAppContext();
  
  return (
    <div className="glass-card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ height: '200px', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <Package size={48} color="var(--text-secondary)" />
        )}
      </div>
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{product.name}</h3>
      <p style={{ color: 'var(--text-secondary)', flexGrow: 1, marginBottom: '1rem' }}>{product.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>${product.price}</span>
        <button className="btn btn-primary" onClick={() => addToCart(product._id, product.name, 1)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const { products, loading } = useAppContext();

  if (loading) return <div className="container mt-8 text-center">Loading products...</div>;

  return (
    <div className="container mt-8">
      <h1 className="text-center mb-8">Discover Amazing Products</h1>
      <div className="grid grid-cols-4">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {products.length === 0 && <p className="text-center text-muted">No products found. Please add some via the admin dashboard.</p>}
    </div>
  );
};

export default Home;
