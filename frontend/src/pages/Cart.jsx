import { Link } from 'react-router-dom';
import { useAppContext } from '../Context';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart, user } = useAppContext();

  if (!user) return <div className="container mt-8 text-center"><Link to="/login" className="btn btn-primary">Login to view cart</Link></div>;
  if (!cart.products || cart.products.length === 0) return <div className="container mt-8 text-center">Your cart is empty. <Link to="/" className="text-accent-primary">Shop now</Link></div>;

  return (
    <div className="container mt-8">
      <h2>Your Cart</h2>
      <div className="glass-card animate-fade-in mt-4">
        {cart.products.map((item, idx) => (
          <CartItem key={idx} item={item} />
        ))}
        <div className="mt-4" style={{ textAlign: 'right' }}>
          <Link to="/checkout" className="btn btn-primary" style={{ display: 'inline-block' }}>Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
