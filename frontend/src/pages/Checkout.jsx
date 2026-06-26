import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../Context';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const { cart, user } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const total = useMemo(() => {
    if (cart && cart.products) {
      return cart.products.reduce((acc, item) => acc + ((item.price || 19.99) * item.quantity), 0);
    }
    return 0;
  }, [cart]);

  const handlePlaceOrder = async () => {
    if (!user) return navigate('/login');
    if (!cart.products || cart.products.length === 0) return;

    setLoading(true);
    setError(null);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const orderData = {
        products: cart.products,
        totalAmount: total
      };
      await axios.post('/api/orders', orderData, config);
      // In a full implementation, you'd also call a backend endpoint to clear the cart here.
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="container mt-8 text-center">Please <Link to="/login" className="text-accent-primary">login</Link> to checkout.</div>;

  return (
    <div className="container mt-8" style={{ maxWidth: '600px' }}>
      <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={20} /> Back to Cart
      </Link>
      
      <div className="glass-card animate-fade-in">
        <h2 className="mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingBag size={24} /> Checkout
        </h2>
        
        {error && <div className="text-error mb-4">{error}</div>}

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Order Summary</h3>
          {cart?.products?.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {cart.products.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', color: 'var(--text-secondary)' }}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>${((item.price || 19.99) * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Your cart is empty.</p>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '1.25rem', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span style={{ color: 'var(--accent-primary)' }}>${total.toFixed(2)}</span>
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
          onClick={handlePlaceOrder}
          disabled={loading || !cart?.products?.length}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
