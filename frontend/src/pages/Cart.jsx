import { Link } from 'react-router-dom';
import { useAppContext } from '../Context';

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

export default Cart;
