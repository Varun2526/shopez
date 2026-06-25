import { Link } from 'react-router-dom';
import { ShoppingCart, User, Package, LogOut, LayoutDashboard } from 'lucide-react';
import { useAppContext } from '../Context';

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

export default Navbar;
