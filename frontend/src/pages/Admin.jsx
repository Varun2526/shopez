import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../Context';
import { LayoutDashboard } from 'lucide-react';
import AdminProducts from '../components/AdminProducts';
import AdminOrders from '../components/AdminOrders';

const Admin = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



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
        <AdminProducts products={products} setProducts={setProducts} user={user} />

        {/* View Orders Section */}
        <AdminOrders orders={orders} />
      </div>
    </div>
  );
};

export default Admin;
