const OrderCard = ({ order }) => {
  return (
    <div className="glass-card animate-fade-in" style={{ marginBottom: '1rem' }}>
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
  );
};

export default OrderCard;
