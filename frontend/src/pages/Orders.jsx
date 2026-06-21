import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../Context';
import { Package } from 'lucide-react';

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
            <div key={order._id} className="glass-card animate-fade-in" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Order ID: {order._id}</h4>
                  <p className="text-muted" style={{ margin: 0 }}>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: order.status === 'Delivered' ? 'var(--success)' : 'var(--bg-color-light)', color: order.status === 'Delivered' ? '#fff' : 'var(--text-primary)', fontSize: '0.875rem' }}>
                    {order.status || 'Pending'}
                  </span>
                  <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                    Total: ${order.totalAmount?.toFixed(2) || '0.00'}
                  </div>
                </div>
              </div>
              
              <div>
                <h5 style={{ marginBottom: '0.5rem' }}>Items</h5>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {order.products?.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', color: 'var(--text-secondary)' }}>
                      <span>{item.name || `Product ID: ${item.productId}`}</span>
                      <span>Qty: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
