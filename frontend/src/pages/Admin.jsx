import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../Context';
import { LayoutDashboard, Plus, Trash2 } from 'lucide-react';

const Admin = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state for new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: ''
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!user || !user.token || !user.isAdmin) {
        setLoading(false);
        return;
      }
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        
        // Fetch all orders
        const ordersRes = await axios.get('/api/admin/orders', config);
        setOrders(ordersRes.data);

        // Fetch all products (re-fetch to ensure we have latest)
        const productsRes = await axios.get('/api/products');
        setProducts(productsRes.data);

      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to fetch admin data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [user]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('/api/admin/products', newProduct, config);
      setProducts([...products, data]);
      setNewProduct({ name: '', description: '', price: '', imageUrl: '', category: '', stock: '' });
      alert('Product added successfully!');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product.');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`/api/admin/products/${id}`, config);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product.');
    }
  };

  if (!user || !user.isAdmin) return <div className="container mt-8 text-center text-error">Access Denied. Admins only.</div>;
  if (loading) return <div className="container mt-8 text-center">Loading admin dashboard...</div>;
  if (error) return <div className="container mt-8 text-center text-error">{error}</div>;

  return (
    <div className="container mt-8">
      <h2 className="mb-8" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <LayoutDashboard size={28} /> Admin Dashboard
      </h2>

      <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
        {/* Manage Products Section */}
        <div className="glass-card animate-fade-in">
          <h3>Add New Product</h3>
          <form onSubmit={handleAddProduct} style={{ marginBottom: '2rem' }}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-input" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" required rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Price ($)</label>
                <input type="number" step="0.01" className="form-input" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Stock</label>
                <input type="number" className="form-input" required value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input type="text" className="form-input" required value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input type="text" className="form-input" required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              <Plus size={16} /> Add Product
            </button>
          </form>

          <h3>Existing Products</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {products.map(product => (
              <li key={product._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <span>{product.name} - ${product.price}</span>
                <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* View Orders Section */}
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
      </div>
    </div>
  );
};

export default Admin;
