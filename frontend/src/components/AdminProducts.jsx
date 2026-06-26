import { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';

const AdminProducts = ({ products, setProducts, user }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: ''
  });

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

  return (
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
  );
};

export default AdminProducts;
