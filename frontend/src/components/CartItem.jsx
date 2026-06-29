const CartItem = ({ item }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
      <div>
        <h4 style={{ margin: 0 }}>{item.name || `Product ID: ${item.productId}`}</h4>
        <p className="text-muted">Quantity: {item.quantity}</p>
      </div>
    </div>
  );
};

export default CartItem;
