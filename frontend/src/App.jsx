import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Package, LogOut, LayoutDashboard } from 'lucide-react';
import { AppProvider, useAppContext } from './Context';

// --- COMPONENTS ---

const Navbar = () => {
  const { user, cart, logout } = useAppContext();
  const cartItemCount = cart?.products?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <nav style={{ padding: '1rem 2rem', background: 'var(--bg-glass)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>ShopEZ</Link>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingCart size={20} /> Cart ({cartItemCount})
        </Link>
        {user ? (
          <>
            <Link to="/orders" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={20} /> Orders
            </Link>
            {user.isAdmin && (
              <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LayoutDashboard size={20} /> Admin
              </Link>
            )}
            <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}>
            <User size={16} /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

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

// --- PAGES ---

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

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { login, register } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success;
    if (isLogin) {
      success = await login(formData.email, formData.password);
    } else {
      success = await register(formData.username, formData.email, formData.password);
    }
    if (success) navigate('/');
  };

  return (
    <div className="container mt-8" style={{ maxWidth: '400px' }}>
      <div className="glass-card animate-fade-in">
        <h2 className="text-center mb-4">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Username</label>
              <input type="text" className="form-input" required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-muted">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '0.875rem' }}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cart, user } = useAppContext();

  if (!user) return <div className="container mt-8 text-center"><Link to="/login" className="btn btn-primary">Login to view cart</Link></div>;
  if (!cart.products || cart.products.length === 0) return <div className="container mt-8 text-center">Your cart is empty. <Link to="/" className="text-accent-primary">Shop now</Link></div>;

  return (
    <div className="container mt-8">
      <h2>Your Cart</h2>
      <div className="glass-card animate-fade-in mt-4">
        {cart.products.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h4 style={{ margin: 0 }}>{item.name || `Product ID: ${item.productId}`}</h4>
              <p className="text-muted">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
        <div className="mt-4" style={{ textAlign: 'right' }}>
          <button className="btn btn-primary">Proceed to Checkout (Mock)</button>
        </div>
      </div>
    </div>
  );
};

// --- APP ROOT ---

const AppContent = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<div className="container mt-8 text-center">Orders History (Coming Soon)</div>} />
        <Route path="/admin" element={<div className="container mt-8 text-center">Admin Dashboard (Coming Soon)</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
