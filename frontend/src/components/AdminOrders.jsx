const AdminOrders = ({ orders }) => {
  return (
    <div className="glass-card animate-fade-in">
      <h3>All Global Orders</h3>
      {orders.length === 0 ? (
        <p className="text-muted">No orders found across the platform.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {orders.map(order => (
            <li key={order._id} style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>Order ID: {order._id}</strong>
                <span style={{ color: 'var(--accent-primary)' }}>${order.totalAmount?.toFixed(2) || '0.00'}</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <p>User: {order.userId?.username || order.userId || 'Unknown'}</p>
                <p>Status: {order.status || 'Pending'}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminOrders;
