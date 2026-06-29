import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../Context';
import { Package } from 'lucide-react';
import OrderCard from '../components/OrderCard';

const Orders = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.token) {
        setLoading(false);
        return;
      }
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/orders/myorders', config);
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return <div className="container mt-8 text-center">Please login to view your orders.</div>;
  if (loading) return <div className="container mt-8 text-center">Loading orders...</div>;
  if (error) return <div className="container mt-8 text-center text-error">{error}</div>;

  return (
    <div className="container mt-8">
      <h2 className="mb-8" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Package size={28} /> Your Orders
      </h2>
      
      {orders.length === 0 ? (
        <p className="text-muted">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
