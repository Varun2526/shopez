import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, User, Package, LogOut, LayoutDashboard } from 'lucide-react';
import { AppProvider, useAppContext } from './Context';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Orders from './pages/Orders';
import Admin from './pages/Admin';

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
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
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
